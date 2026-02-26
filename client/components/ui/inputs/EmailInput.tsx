"use client"

function EmailInput({...props}) {
  return (
     <div className="wrapper-input ">
       <input  className="custom-input peer" type="email" {...props} />
    <label
        htmlFor={props.name}
        className={`label peer-focus:top-1/4 peer-focus:text-sm  peer-focus:text-sky-500 duration-150 ${!props.error?.message&&"top-1/4 text-sm"}`} >email</label>
     </div>
  )
}

export default EmailInput