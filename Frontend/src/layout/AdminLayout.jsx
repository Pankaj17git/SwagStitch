import React from 'react';
import Sidebar from '../components/admin/sidebar/Sidebar'
import { Outlet } from 'react-router'
import './css/AdminLayout.css'
import Navbar from '../components/navbar/Navbar';

const AdminLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <Sidebar />
        <main className='admin'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout
