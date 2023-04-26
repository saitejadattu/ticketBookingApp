import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SeatComponent from './SeatComponent';
import InoxSeats from './JsonData/InoxSeats.json';
import { setSelectedSeats } from '../../Redux/ShowData'
import { useDispatch } from 'react-redux';
import { setBarClass } from '../../Redux/ShowData';
import { useAuth } from '../ContextApi/Auth';
import Modal from '../Modal';
export default function Seats() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();

  const [userSeatSelection, setUserSeatSelection] = useState([]);
  const theatre = useSelector((state) => state.ShowDetails.theatre);
  const [freezeState, setFreezeState] = useState({ msg: 'Select and Freeze the seats', class: "color-red" });

  const noOfSeats = theatre.seats;
  const noofRows = 10;
  const noOfTickets = theatre.NoOfTickets.tickets;
  let blockedSeats = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'C5', 'C8', 'C0', 'F0', 'F5', 'F3', 'F9'];
  let seatID = [];
  
  // For navigating to next page
  const nextPage = () => {

    if (freezeState.class === 'color-red') {
      setFreezeState({ msg: "Freeze the seats and proceed further", class: "color-red" })
      return
    }

    dispatch(setSelectedSeats(userSeatSelection));
    auth.ticketPageSetTrue('Ticket');
    navigate('/Ticket', { replace: true });
  }

  // Creating Seats from the given Data
  const seatDesign = () => {
    for (let i = 0; i < InoxSeats.length; i++) {
      let Blocked = 1;
      for (let j = 0; j < blockedSeats.length; j++) {
        // console.log(props.SeatswithId[i].seatId);
        if (InoxSeats[i].seatId === blockedSeats[j]) {
          Blocked = 0;
          break;
        }
      }
      seatID.push({ SeatNo: InoxSeats[i].seatId, Blocked: Blocked ,seatPrice:InoxSeats[i].PRICE})

    }

  }
  seatDesign();

  useEffect(() => {
    dispatch(setBarClass({ bar1: "bar ", bar2: "bar bar-color", bar3: "bar" }));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='Seats-page'>
  
      <h3 className='animate-charcter'>Select Seats</h3> <br />
      <Modal  title='Dear User,' body='Number of Tickets are over..'/>
      <div className={freezeState.class}>{freezeState.msg}  </div>
      <div className='seats'>
        <SeatComponent seatID={seatID} freezeState={freezeState} blockedSeats={blockedSeats} setUserSeatSelection={setUserSeatSelection} setFreezeState={setFreezeState} noOfSeats={noOfSeats} noOfTickets={noOfTickets} noOfRows={noofRows} />
      </div>
      <div className='Screen'>

      </div>

      {
        freezeState.class === 'color-red' ? <></> :
          <button onClick={nextPage} className='btn'>Next</button>
      }

    </div>
  )
}
