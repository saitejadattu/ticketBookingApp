import React, { useEffect } from 'react'
import ShowDetailsForm from '../../Forms/ShowDetailsForm'
import { setBarClass } from '../../Redux/ShowData';
import { useDispatch } from 'react-redux';
export default function PickShow() {
  const dispatch=useDispatch(); 
  useEffect(()=>
  {
    dispatch(setBarClass({bar1:"bar bar-color",bar2:"bar",bar3:"bar"}));
    window.scrollTo(0,0);
  },[]);
  return (
    <div className='Show-picking-page'>   
    <h3 className='animate-charcter'>Pick Your Show</h3>
      <div className='Show-Deatils-Form'>
          <ShowDetailsForm/>
      </div>
    {/* <div>
      <button onClick={NextPage}>Prev</button>
      <button onClick={NextPage}>Next</button>
    </div> */}
    </div>
  )
}
