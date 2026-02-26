"use client"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { useContext, useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CreatePostContext } from ".";

function EmojiButton( ) {
    const [showPicker, setShowPicker] = useState(false);
    const { setTextContent, textContent, handleSelectEmoji} = useContext(CreatePostContext)


    return (
        <div onClick={() => setShowPicker(!showPicker)} className="relative cursor-pointer">
            <MdOutlineEmojiEmotions size={22} className="text-sky-600" />
            {showPicker && (
                <div className="absolute top-7 -translate-x-1/2 left-1/2">
                    <EmojiPicker theme="dark" width={300} onEmojiClick={handleSelectEmoji} />
                </div>
            )}
        </div>
    )
}

export default EmojiButton