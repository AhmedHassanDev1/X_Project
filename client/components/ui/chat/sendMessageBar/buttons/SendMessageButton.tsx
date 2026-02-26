"use client"
import { useContext } from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import { MessageContext } from "../SendMessageBar";
import { useAuth } from "@/hooks/useAuth";
function SendMessageButton() {
  const { chatId, inputValue, sendMassage, type, reset } = useContext(MessageContext)
  const { user } = useAuth()

  const handleClick = () => {
    if (!chatId || !user?._id) return;

   sendMassage({
      chat_id: chatId,
      sender_id: user?._id,
      text: inputValue || null,
      type: type || null,
      createdAt: new Date().toISOString(),
      _id: crypto.randomUUID(),
      status: "pending"
    })
    reset()

  }
  return (
    <button onClick={handleClick} className="p-2 bg-sky-500 rounded-full w-fit h-fit">
      <IoArrowUpOutline size={20} />
    </button>
  )
}

export default SendMessageButton