import React from 'react'
import barcode from '../../Assests/barcode.png';
import { useSelector } from 'react-redux';
export default function TicketLeftPart(props) {
    const showDetailsData = useSelector((state) => state.ShowDetails.show).showDetails;
    console.log(showDetailsData,"Ticket");
  return (
    <div className='Ticket-left-part'>
                <div className='left-QR'>
                    <img src={barcode} alt='BarCode of Ticket '/>
                </div>
                <div className='Ticket-Details'>
                    
                    <h2 className='Ticket-Background-color'><span class="material-symbols-outlined">theaters</span><span>Cinema Ticket </span><span class="material-symbols-outlined">theaters</span> </h2>
                    <div>
                        <p><b>THEATRE :</b>{showDetailsData.theatre} #{showDetailsData.city} </p>
                        <p><b>TIME :</b> {showDetailsData.timings}</p>
                        <p><b>PRICE :</b>{showDetailsData.tickets * 100}</p>
                    </div>
                    <h2  className='Ticket-color'>MOVIE 2D : {showDetailsData.movie.toUpperCase()}</h2>
                    <p> <b>NO : </b>#TN{props.ticketId }</p>
                </div>
            </div>
  )
}
