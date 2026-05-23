import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout;