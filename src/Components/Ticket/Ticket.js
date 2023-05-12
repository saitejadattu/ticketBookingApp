/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TicketLeftPart from './TicketLeftPart';
import TicketRightPart from './TicketRightPart';
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { setBarClass } from '../../Redux/ShowData';
import TicketLogo from '../../Assests/TicketLogo.png';
export default function Ticket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const todayDate = new Date().getDate() + '' + (new Date().getMonth() + 1) + '' + new Date().getFullYear();
  let date = new Date().toLocaleDateString();
  const TodayTime = new Date().getHours() + '' + new Date().getMinutes() + '' + new Date().getSeconds();
  const current = new Date();
  const todayTime = current.toLocaleTimeString();
  const selectedSeatsStore = useSelector((state) => state.ShowDetails.selectedSeats);
  const showDetailsData = useSelector((state) => state.ShowDetails.show);
  const ticketId = 'D' + todayDate + 'T' + TodayTime;

  // To Update the Ticket Details into the Database..
  function writeUserData() {
    const db = getDatabase();

    set(ref(db, 'Tickets/' + ticketId), {
      ticketId: ticketId,
      Date: date,
      Time: todayTime,
      movie: showDetailsData.movie,
      theatre: showDetailsData.theatre
    });
    set(ref(db, 'Booked Seats/'+showDetailsData.city+'/'+showDetailsData.theatre+'/'+showDetailsData.movie+'/'+todayDate+'/'+todayTime), {
      ticketId:ticketId,
      Seats: selectedSeatsStore
    });
    navigate('/Success')
  }

  useEffect(() => {
    dispatch(setBarClass({ bar1: "bar ", bar2: "bar ", bar3: "bar bar-color" }));
    // window.scrollTo(0, 0);
  }, []);

  return (
    <div className='Ticket-page'>
      <h3 className='animate-charcter'>Ticket</h3> <br />

      <button onClick={writeUserData} className='btn'>Confirm Booking</button>
      <div className='Ticket'>

        <TicketLeftPart ticketId={ticketId} selectedSeatsStore={selectedSeatsStore} />

        <TicketRightPart selectedSeatsStore={selectedSeatsStore} TodayDate={date} TodayTime={todayTime} />

      </div>
      <div className='Mobile-Ticket'>
        <div className='MTicket'>
          <div className='Ticket-logo'>
            <img src={TicketLogo} alt='Ticket Logo' />
          </div>
          <div className='Ticket-Details'>
            <h4>Movie :{showDetailsData.movie}</h4>
            <h4>Theater :{showDetailsData.theatre}</h4>
            <p>{date}</p>
            <p>{todayTime}</p>
          </div>
          <div className='Ticket-Id'>
            <h4>{ticketId}</h4>
          </div>
        </div>
      </div>


    </div>
  )
}
