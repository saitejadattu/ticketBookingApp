import React, { useRef } from 'react'
import { getDataFromDB } from '../../Database/Data'
import {SetSelectedSeats} from '../../Redux/ShowData'
import { useSelector } from 'react-redux';
export default function SeatComponent(props) {
   let seatID=props.seatID;
    let noOfTickets=props.noOfTickets;
    let userSeatSelection=[];
    // let data = getDataFromDB('Booked Seats');
    // let Data= getDataFromDB('BS');
    // console.log(typeof(Data))
    // let BlockedSeats=Object.keys(Data[0].value) ;
    // console.log(BlockedSeats);
    let Letters=['A','B',"C",'D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
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
                    // alert("You Cannot Book More..");
                    BlockAllSeats();
                    return;
                }
            
    }

    const BlockAllSeats=()=>
    {
    
        const seats=document.getElementsByClassName('Seat-checkbox');
        for(let i=0 ;i<seats.length ;i++)
        {
            seats[i].disabled=true;
        }
    }
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
    const submitSeatsData=()=>
    {   
        // BlockAllSeats();
        if(noOfTickets)
        {
        //   alert("No Seats are selected ");
          props.setFreezeState({msg :"No Seats are Selected ",class:"color-red"});
        }
        else 
        {
            props.setFreezeState({msg :"Seats are freezed ",class:"color-green"})
            props.setUserSeatSelection(userSeatSelection);
        }
        
    }
    console.log(props.freezeState.msg)
  return (
    <div>
        <div className='Seats'>
            {
                props.freezeState.msg==='Seats are freezed '?   <></>   :
                <>
                    <button className='change-btn' onClick={unBlockAllSeats}>Change Seats</button>&nbsp;&nbsp;
                    <button className='freeze-btn' onClick={submitSeatsData}>Freeze Now </button> 
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
                <>

                    {
                        item.Blocked ?
                        <>
                            <input type="checkbox" onClick={selectingSeats}   className='Seat-checkbox'  key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                            <span>{Letters[((index+1)/10)-1]} </span><br/>
                        </>
                        :
                        <>
                            <input type="checkbox" onClick={selectingSeats}  disabled className='Seat-checkbox blocked' key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                            <span>{Letters[((index+1)/10)-1]} </span><br/>
                        </>
                    }
                    
                </>
                
                :
                <>
                  {
                        item.Blocked ?
                        <>
                            <input type="checkbox" onClick={selectingSeats}  className='Seat-checkbox'  key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                        </>
                        :
                        <>
                            <input type="checkbox" onClick={selectingSeats}  disabled className='Seat-checkbox blocked' key={index} id={item.SeatNo} value={item.SeatNo} /> &nbsp; 
                        </>
                    }
                </>
            ))
        }
        <p>Balacony</p>
        </div>

        
    </div>
  )
}


// const seats=()=>
// {
//     let Blocked=1;
//     for(let i=0,j=1,k=0;i<props.NoOfSeats;i++)
//     {
//         if(j%10===0 )
//         {
//             j=1;
//             k++;
//             Blocked=1;
//             let SeatNo=Letters[k]+''+0;
//             for(let x=0;x<BlockedSeats.length;x++)
//             {
//                 if(SeatNo===BlockedSeats[x])
//                 {
//                     Blocked=0;
//                 }
//             }
//             SeatID.push({SeatNo :SeatNo,Blocked:Blocked});
           
//         }
//         else
//         {
//             let SeatNo=Letters[k]+''+j;
//             Blocked=1;
//             for(let x=0;x<BlockedSeats.length;x++)
//             {
//                 if(SeatNo===BlockedSeats[x])
//                 {
//                     Blocked=0;
//                 }
//             }
//             SeatID.push({SeatNo:SeatNo,Blocked:Blocked});
//             j++;
//         }
            
       
//     }
// }


