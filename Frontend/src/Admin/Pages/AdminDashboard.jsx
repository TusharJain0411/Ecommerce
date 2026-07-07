import React from 'react'
import Navbar from "../components/Navbar";
import "../CSS/adminCommon.css"

function AdminDashboard({children}) {
  return (
    <>
      <div className="AdminPage ">
        <Navbar />
        <div className=' content-box '>
          {children}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard
