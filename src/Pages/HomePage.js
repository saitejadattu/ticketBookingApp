/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBarClass } from '../Redux/ShowData';
import Homepage from '../Assests/HomePage.jpg';
import popcorn from '../Assests/popcorn.jpg';
import theatre from '../Assests/theatre.jpg';
import cooldrinks from '../Assests/cooldrinks.jpg';
export default function HomePage() {
    const navigate=useNavigate();
    // const barClass=useSelector((state)=>state.ShowDetails.barClass);
    const dispatch=useDispatch();
    
    useEffect(()=>
    {
      dispatch(setBarClass({bar1:"bar",bar2:"bar",bar3:"bar"}));
    },[])
    const pickShow=()=>
    {  
      navigate('pick-show');
    }

    const getData=async()=>
    {
      const data=await fetch("https://ticket-booking-system-f2d92-default-rtdb.firebaseio.com/Cities.json")
      .then((resp)=>{
        console.log(resp);
        return resp.body;
      }).catch((err)=>
      {
        console.log("Error Occured :", err);
      });
      console.log(data);
    }
    getData();
  return (
    <div>
      
      {/* <button onClick={Pick_show}>Book Now</button> */}
        <h1 className='Main-title'/>
        <div className='workflow'>
            <div>
                <h3>Pick your show </h3>
                <img src={popcorn}  alt='info'/>
            </div>
            <div>
                <h3>Select the seats</h3>
                <img src={cooldrinks} alt='info' />
            </div>
            <div>
                <h3>Get your Ticket</h3>
                <img src={theatre}  alt='info'/>
            </div>
        </div>
      <img  onClick={pickShow} src={Homepage} className='Homepage-image' alt='Home Page ' />
      
    </div>
  )
}
