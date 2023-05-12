import React from 'react';
import { openModal } from '../../Redux/ShowData';
import { useDispatch } from 'react-redux';

export default function SeatComponent(props) {
    
    const dispatch=useDispatch();
    let seatID=props.seatID;
    let noOfTickets=props.noOfTickets;
    let Tickets=noOfTickets;
    let userSeatSelection=[];
    let Letters=['A','B',"C",'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    // Onclicking the checkbox selecting the seats
    const selectingSeats=(e)=>
    {
               
              if(e.target.checked)
                {
                    userSeatSelection.push(e.target.value); 
                    noOfTickets--;
                }
                else
                {
                    noOfTickets++;
                    let index = userSeatSelection.indexOf(e.target.value);
                    userSeatSelection.splice(index, 1);
                }
                if(noOfTickets===0)
                {
                    dispatch(openModal())
                    BlockAllSeats();
                    return;
                }
            
    }

    // Blocking all seats
    const BlockAllSeats=()=>
    {
    
        const seats=document.getElementsByClassName('Seat-checkbox');
        for(let i=0 ;i<seats.length ;i++)
        {
            seats[i].disabled=true;
        }
    }

    // Unblocking all Seats
    const unBlockAllSeats=()=>
    {
        const seats=document.getElementsByClassName('Seat-checkbox');
        for(let i=0 ;i<seats.length ;i++)
        {
            seats[i].disabled=false;
            let flag=1;
            for(let j=0;j<props.blockedSeats.length ;j++)
            {
                if(seats[i].value===props.blockedSeats[j])
                {
                    seats[i].disabled=true;
                    flag=0;
                    break
                }
            }
           if(flag)
           {
            seats[i].checked=false;
           }
            
        }
        noOfTickets=props.noOfTickets;
        userSeatSelection=[];
    }

    // Freezing the Seats..
    const submitSeatsData=()=>
    {   
        if(noOfTickets)
        {

            for(let i=0;i<userSeatSelection.length;i++)
            {
                let seat=document.getElementById(userSeatSelection[i]);
                seat.checked=false;
            }
            if(Tickets===noOfTickets)
            {
                props.setFreezeState({msg :`Please Select the Seats`,class:"color-red"});
                return
            }
            props.setFreezeState({msg :`Missed selecting ${noOfTickets} ticket out of ${Tickets}`,class:"color-red"});


        }
        else 
        {
            props.setFreezeState({msg :"Seats are freezed ",class:"color-green"})
            props.setUserSeatSelection(userSeatSelection);
            BlockAllSeats();
        }
        
    }

  return (
    <div>
        <div className='Seats'>
            {
                props.freezeState.msg==='Seats are freezed '?   <></>   :
                <>
                    <button className='change-btn' onClick={unBlockAllSeats}>Change Seats</button>&nbsp;&nbsp;
                     <h2 data-testid="ticket">Tickets :{noOfTickets}</h2> 
                    <button className='freeze-btn' onClick={submitSeatsData}>Freeze Now</button> 
                    <br/>
                    <br/>
                </>
            }
           
        {
            !seatID
            ?
                <><div> Theatre seats are not avialable  </div></>
            :
            seatID.map((item,index)=>(
                (index+1)% props.noOfRows===0 
                ? 
                <span key={index}>

                    {
                        item.Blocked ?
                        <>
                            <input type="checkbox"  placeholder='enabled seats' onClick={(e)=>selectingSeats(e,item.seatPrice)}   className='Seat-checkbox'  key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                            <span>{Letters[((index+1)/props.noOfRows)-1]} </span><br/>
                        </>
                        :
                        <>
                            <input type="checkbox" placeholder='Blocked seats' onClick={(e)=>selectingSeats(e,item.seatPrice)}   disabled className='Seat-checkbox blocked' key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                            <>{Letters[((index+1)/props.noOfRows)-1]} </><br/>
                        </>
                    }
                    
                </span>
                
                :
                <span key={index}>
                  {
                        item.Blocked ?
                        <>
                            <input type="checkbox" placeholder='enabled seats' onClick={(e)=>selectingSeats(e,item.seatPrice)}   className='Seat-checkbox'  key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                        </>
                        :
                        <>
                            <input type="checkbox"  placeholder='Blocked seats' onClick={(e)=>selectingSeats(e,item.seatPrice)}   disabled className='Seat-checkbox blocked' key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                        </>
                    }
                </span>
            ))
        }
        <p>Balacony</p>
        </div>

        
    </div>
  )
}




