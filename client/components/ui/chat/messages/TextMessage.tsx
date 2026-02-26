"use client"

import { MessageType } from "@/types/chat"
import { useAuth } from "@/hooks/useAuth"
import { useContext, useEffect } from "react"
import { MessageContext } from "../sendMessageBar/SendMessageBar"


function TextMessage({ message }: { message: MessageType }) {

    const { sendMassage } = useContext(MessageContext)

    const { user } = useAuth()
    
 

    return (
        <div className="message-wrapper">
            <div className={`message ${user?._id === message?.sender_id ? "sendered-message" : "received-message"}`}>
                {message?.text}
            </div>
        </div>
    )
}

export default TextMessage