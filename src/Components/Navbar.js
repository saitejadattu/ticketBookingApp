import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Logo from '../Assests/logo.jpg'
export default function Navbar() {

    const barClass=useSelector((state)=>state.ShowDetails.barClass);
   
  return (
    <>
      <div className='Headers'>
                <div>
                    <Link to='/'>
                        <img src={Logo} className='Site-Logo' alt='Logo' />
                    </Link>
                </div>
                <div className='pick-show-bar' >
                        <div>
                            <Link to='pick-show'  >Pick Your Show</Link>
                        </div>
                        <Link to='pick-show' >
                            <div className={barClass.bar1} >
                            </div>
                        </Link>
                </div>
                <div className='seats-bar'  >  
                        <div>
                           
                            <Link to='seats'> Select Seats</Link>
                        </div>
                        <Link to='seats' >
                            <div className={barClass.bar2}>

                            </div>
                        </Link>
                </div>
                <div className='Ticket' >
                        
                        <div>
                            <Link to='Ticket'>Ticket</Link>
                            
                        </div>

                        <Link to='Ticket'  >
                            <div className={barClass.bar3} >

                            </div>
                        </Link>
                </div>
            </div>
            <div className='Mobile-Menu'>

            </div>
    </>
  )
}
