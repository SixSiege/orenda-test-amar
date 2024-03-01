import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ViewCustomer from '../pages/customer/ViewCustomer'
import CustomerForm from '../pages/customer/CustomerForm'
import CustomerDetails from '../pages/customer/CustomerDetails'

function AppRoutes() {
  return (
    <Routes>                
        <Route path='/' element={<ViewCustomer />} />
        <Route path='/add-customer' element={<CustomerForm act="add" />} />
        
        <Route path='/edit-customer/' element={<CustomerForm act="update" />} />                              
        <Route path='/customer-details/' element={<CustomerDetails />} />
    </Routes>
  )
}

export default AppRoutes
