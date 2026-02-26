"use client"
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

import { Tooltip } from "@mui/material"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { bookmarkHandle } from "@/lib/api/rest/interactions";
import { successToast } from "@/utils/messages";


function BookmarkButton({ post_id, isActive }: { post_id: string, isActive: boolean }) {
    const [isBookmark, setBookmark] = useState(isActive)
    const [isTouch, setTouch] = useState(false)
    const { mutate: toggleBookmark } = useMutation({
        mutationFn: () => bookmarkHandle(post_id),
        mutationKey: ["toggle-bookmark", post_id],
        onSuccess: () => {
            setTouch(true)
            !isBookmark && successToast("Keep it up! The more posts you bookmark, the better your timeline will be.")
            setBookmark(!isBookmark)
        },
        onError: () => {
            setBookmark(!isBookmark)
        },

    })
    return (
        <Tooltip title="bookmark">
            <button className="p-2 rounded-full text-sky-500 hover:bg-[#009dff44]"
                onClick={() => toggleBookmark()}
            >
                {isBookmark ?
                    <FaBookmark size={18} />
                    : <FaRegBookmark size={18} />}
            </button>
        </Tooltip>
    )
}

export default BookmarkButton