import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TicketLeftPart from './TicketLeftPart';
import TicketRightPart from './TicketRightPart';
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { setBarClass } from '../../Redux/ShowData';

export default function Ticket() {
    // const ShowDetailsData = useSelector((state) => state.ShowDetails.value);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    
    const todayDate=new Date().getDate() + ''+ (new Date().getMonth()+1) + ''+new Date().getFullYear();
    let date = new Date().toLocaleDateString();
    const TodayTime=new Date().getHours() + ''+new Date().getMinutes()+''+new Date().getSeconds() ;
    const current=new Date();
    const todayTime=current.toLocaleTimeString();
    const selectedSeatsStore= useSelector((state) => state.ShowDetails.selectedSeats);
    const showDetailsData = useSelector((state) => state.ShowDetails.show).showDetails;
    const ticketId= 'D'+todayDate+'T'+TodayTime;
    function writeUserData() {
      const db = getDatabase();

      set(ref(db, 'Tickets'+ticketId ), {
            ticketId:ticketId,
            Date:date,
            Time:todayTime,
            movie:showDetailsData.movie,
            theatre:showDetailsData.theatre  
      });
      set(ref(db, 'BS' ), {
        Seats:selectedSeatsStore
  });
  navigate('/Success')
    }

    useEffect(()=>
    {
      dispatch(setBarClass({bar1:"bar ",bar2:"bar ",bar3:"bar bar-color"}));
    },[]);
    
  return (
    <div className='Ticket-page'>
      <h3 className='animate-charcter'>Ticket</h3> <br/>
     
      {/* <button >Confirm</button> */}
      <button className='glowing-btn' onClick={writeUserData}><span className='glowing-txt'>BOOK <span > NOW</span> <span className='faulty-letter'>...</span></span></button>
      <div className='Ticket'>
        
            <TicketLeftPart ticketId={ticketId} selectedSeatsStore={selectedSeatsStore}  />

            <TicketRightPart  selectedSeatsStore={selectedSeatsStore} TodayDate={date} TodayTime={todayTime}  />
            
      </div>
      <div className='Mobile-Ticket'>
          Mobile Ticket
      </div>
     

    </div>
  )
}
