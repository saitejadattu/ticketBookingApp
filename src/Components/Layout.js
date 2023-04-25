import React from 'react'
import { Outlet } from 'react-router-dom';
import '../Style.scss';
import Header from './Header';
import Footer from './Footer';
export default function Layout() {

  return (
    <div className='main'>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
