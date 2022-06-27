import React from "react"

export function Input(props){
  return(
    <input className='bg-gray-200 m-1 rounded' type={`${props.type}`}  name={`${props.name}`}  placeholder={`${props.name}`} value={props.value} onChange={props.handleChange} />
  )
}
