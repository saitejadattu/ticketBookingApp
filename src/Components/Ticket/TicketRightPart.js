import React from 'react'
import barcode from '../../Assests/barcode.png';
import { useSelector } from 'react-redux';
export default function TicketRightPart(props) {
    const TodayTime=props.TodayTime;
    const TodayDate=props.TodayDate;
    const selectedSeatsStore=props.selectedSeatsStore;
    const showDetailsData = useSelector((state) => state.ShowDetails.show).showDetails;
  return (
    <div className='Ticket-right-part'>
                    <div>
                        <p>STANDARD</p>
                        <p>2D</p>
                        <p>Theatre : {showDetailsData.theatre}</p>
                        <p>Seats :  &nbsp;
                            {
                                selectedSeatsStore.map((item,index)=>(
                                    <>
                                   <span key={index} >{item}</span> &nbsp;
                                    </>
                                ))
                            }
                        </p>
                    </div>
                    <div className='Right-OR'>
                        <img src={barcode} alt='Barcode of Ticket' width='300px'/>
                    </div>
                    <div>
                        <p>DATE : TIME</p>
                        <p>{TodayDate}</p>
                        <p>Time : {TodayTime} IST</p>
                        
                    </div>
            </div>
  )
}
