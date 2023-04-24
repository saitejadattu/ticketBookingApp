import React from 'react'
import Logo from '../Assests/footerlogo.jpg'
export default function Footer() {
  return (
    <footer>
            <img src={Logo} className='footer-logo' alt='Footer Logo'/>
            <p>&copy;2023</p>
    </footer>
  )
}
