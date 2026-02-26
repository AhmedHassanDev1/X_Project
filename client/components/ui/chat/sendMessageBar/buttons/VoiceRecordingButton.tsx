"use client"

import { useContext } from "react"
import { FaMicrophone } from "react-icons/fa"
import { MessageContext } from "../SendMessageBar"



function VoiceRecordingButton() {
  const { setRecording} = useContext(MessageContext)
  return (
    <button
    onClick={() => setRecording(true)}
     className="p-2 bg-sky-500 rounded-full w-fit h-fit">
      <FaMicrophone size={20} />
    </button>
  )
}

export default VoiceRecordingButton