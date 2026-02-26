"use client"

function TextInput({ ...props }) {
  return (
    <div className="wrapper-input ">
      <input
        id={props.name}
        className="custom-input peer"
        type="text" {...props} 
        required
        />
      <label
        htmlFor={props.name}
        className="label peer-focus:top-1/4 peer-focus:text-sm peer-valid:text-sm peer-focus:text-sky-500 duration-150 peer-valid:top-1/4" >{props.name}</label>

    </div>
  )
}

export default TextInput