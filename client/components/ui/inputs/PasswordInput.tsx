"use client"

import { useState } from "react"

function PasswordInput({ ...props }) {
  const [show,setShow]=useState(false)
  return (
    <div className="wrapper-input text-gray-500">
      <input
        id={props.name}
        className="custom-input peer"
        type={show?"text":"password"}
        {...props} 
        required
        />
      <label
        htmlFor={props.name}
        className="label peer-focus:top-1/4 peer-focus:text-sm peer-valid:text-sm peer-focus:text-sky-500 duration-150 peer-valid:top-1/4" >{props.name}</label>

    </div>
  )
}

export default PasswordInput