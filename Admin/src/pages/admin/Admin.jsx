import React from 'react'
import './Admin.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Route, Routes } from 'react-router'
import Addproduct from '../../components/addProducts/Addproduct'
import ListProduct from '../../components/listProduct/ListProduct'
const Admin = () => {
  return (
    <>
      <div className="admin">
        <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={<Addproduct/>}/>
          <Route path='/listproduct' element={<ListProduct/>}/>
        </Routes>
      </div>
    </>
  )
}

export default Admin
