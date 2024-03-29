import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const FormInputCustomer = (props: any) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    customerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: ''
  });

  const { state } = useLocation();
  
  const submitText = () => {
    if (props.act == 'add') {
      return "Create New"
    } else if (props.act == 'update') {
      return "Update"
    }
  }
  
  React.useEffect(() => {
    if (state) {
      const { id } = state;
      axios.get(`http://localhost:6969/customers/${id}`)
        .then((res) => {
          setData(res.data)
      });
    }
  }, [state]);
  
  const handleInputData = () => {
    if(data.customerName && data.customerPhone && data.customerEmail && data.customerAddress) {
      if (props.act == 'add') {
        axios.post('http://localhost:6969/customers', data)
        navigate("/")
      }

      if (props.act == 'update') {
        axios.put(`http://localhost:6969/customers/${data.customerId}`, data)
        navigate("/")
      }
    } else {
      alert('Fill all the required fields')
    }
  }

  return (
    <>
      <Box
        p={4}
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Grid container>
          <Typography variant="h6">Customer Information</Typography>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      value={data.customerName}
                      required
                      onChange={(e) => setData({...data, customerName: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="phone"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      value={data.customerPhone}
                      required
                      onChange={(e) => setData({...data, customerPhone: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="email"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      value={data.customerEmail}
                      required
                      onChange={(e) => setData({...data, customerEmail: e.target.value})}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="address"
                  label="Address"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={data.customerAddress}
                  required
                  onChange={(e) => setData({...data, customerAddress: e.target.value})}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Stack>
            <Divider />
            <Stack spacing={2} direction="row-reverse" sx={{ p: 2 }}>
              <Button variant="contained" onClick={() => handleInputData()}>{submitText()}</Button>
              <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default FormInputCustomer;
