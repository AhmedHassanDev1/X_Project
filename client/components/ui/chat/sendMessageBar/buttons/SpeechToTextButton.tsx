"use client"

import { LuAudioLines } from "react-icons/lu";

function SpeechToTextButton() {
  return (
    <button className="p-2 bg-sky-500 rounded-full w-fit h-fit ">
      <LuAudioLines size={20} />
      </button>
  )
}

export default SpeechToTextButton