import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Delete, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface Column {
  id: "name" | "phone" | "email" | "address" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Customer Name", minWidth: 170 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  {
    id: "email",
    label: "Email Address",
    minWidth: 170,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "right",
  },
];

const rows = [];

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState<any[]>([])
  const [data, setUnfilteredData] = React.useState<any[]>([])
  const [searched, setSearched] = React.useState<string>("");
  const [clickedRowId, setRowId] = React.useState<number>(null);

  React.useEffect(() => {
    axios.get("http://localhost:6969/customers").then((res) => {
      setRows(res.data)
      setUnfilteredData(res.data)
    });
  }, [])

  const requestSearch = (searchedVal: string) => {
    if (!searchedVal) {
      setRows(data)
    } else {
      const filteredRows = rows.filter((row) => {
        console.log(row.name.toLowerCase());
        return row.name.includes(searchedVal);
      });
      setRows(filteredRows);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setRowId(id)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteData = (id: any) => {
    setAnchorEl(null);
    axios.delete(`http://localhost:6969/customers/${id}`).then(() => {
      setRows(rows.filter(customer => customer.id_cust !== clickedRowId))
    })
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key={"action"}
                align={"right"}
                style={{ minWidth: 160 }}
              >
                Action
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField label="Search name" variant="outlined"
                onChange={(searchVal) => requestSearch(searchVal.target.value.toString().toLowerCase())}
                ></TextField>
              </TableCell>
              <TableCell>
                <TextField label="Filter" variant="outlined"></TextField>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right" key={"action"}>
                      <IconButton
                        aria-label="delete"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, row.id_cust)}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open && clickedRowId === row.id_cust}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => navigate(`/edit-customer/`, { state: { id: row.id_cust } })}>Edit</MenuItem>
                        <MenuItem onClick={() => deleteData(row.id_cust)}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}