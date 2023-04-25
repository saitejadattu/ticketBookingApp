import React from 'react'

export default function Option(props) {
  return (
    <>
      <option value="None">None</option>
      {
        props.Data?.map((item, index) =>
        (

          // <option value={item}>{item}</option>
          <option value={item} key={index}>{item}</option>
        ))

      }
    </>
  )
}
