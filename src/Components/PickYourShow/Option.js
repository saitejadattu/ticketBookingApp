import React from 'react'

export default function Option(props) {
  return (
    <>
      <option disabled selected hidden value="None">None</option>
      {
        props.Data?.map((item, index) =>
        (
          <> 
          {
            props.type ==='city' && item === props.selectedHomecity 
            ? 
              <option  value={item} selected key={index}>{item}</option>
            :
            <option  value={item} key={index}>{item}</option>
          }
          </>
        ))

      }
    </>
  )
}
