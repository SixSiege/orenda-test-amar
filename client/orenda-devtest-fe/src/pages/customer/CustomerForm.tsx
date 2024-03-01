import React from 'react'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import FormInputCustomer from '../../components/FormInputCustomer'
import { Link } from 'react-router-dom';

const CustomerForm = props => {
    let isAdd = false;
    let isEdit = false;
    let secString = "";
    if (props.act == "add") {isAdd = true; secString = "Create New Customer";}
    if (props.act == "update") {isEdit = true; secString = "Edit Customer";}

  return (
    <>
    <Typography variant="h6">Customers Page</Typography>
      <Typography variant="caption"><Link to="/" style={{textDecorationLine: "none", color: "red", fontWeight: 500}}>Main Menu</Link> {"> " + secString}</Typography>

      <Card sx={{mt: 3, width: "100%", height:"80vh"}}>
        <FormInputCustomer act={props.act} />
      </Card>
    </>
  )
}

export default CustomerForm