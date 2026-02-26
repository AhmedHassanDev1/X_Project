"use client"

import { ChangeEvent, useContext, MouseEvent } from "react"

import SendMessageButton from "./buttons/SendMessageButton"
import SpeechToTextButton from "./buttons/SpeechToTextButton"
import { MessageContext } from "./SendMessageBar"
import VoiceRecordingButton from "./buttons/VoiceRecordingButton"
import SelectedMedia from "./SelectedMedia"
import { useAuth } from "@/hooks/useAuth"

function TextInputMessage() {
    const { chatId, type, media, inputValue, setInputValue, reset, sendMassage } = useContext(MessageContext)
    const { user } = useAuth()

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && chatId) {
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
    };
    return (
        <div className=" bg-zinc-800 rounded-3xl  ">
            <SelectedMedia />
            <div className="flex items-center p-2">
                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyUp={onEnterPress}
                    type="text"
                    value={inputValue || ""}
                    className="flex-1 bg-transparent outline-none text-white"
                    placeholder="Type your message here..." />
                {/* Speech to text Button */}
                {(media || inputValue) ?
                    <SendMessageButton /> :
                    <div className="flex gap-2">
                        <SpeechToTextButton />
                        <VoiceRecordingButton />
                    </div>}
            </div>
        </div>
    )
}

export default TextInputMessage