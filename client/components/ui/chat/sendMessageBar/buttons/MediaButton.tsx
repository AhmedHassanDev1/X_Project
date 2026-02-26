"use client"

import { ChangeEvent, useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { MessageContext } from "../SendMessageBar";

function MediaButton() {
  const { setMedia } = useContext(MessageContext)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setMedia(e.target.files[0])
  }
  return (
    <div className="">
      <input
        type="file"
        id="upload-file"
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor="upload-file"
        className="hidden md:inline-block bg-zinc-800 rounded-full p-3 cursor-pointer ">
        <IoMdAdd />
      </label>
      
    </div>
  )
}

export default MediaButton