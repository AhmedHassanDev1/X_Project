"use client"
import { Tooltip } from "@mui/material"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { likeHandle } from "@/lib/api/rest/interactions";
import { successToast } from "@/utils/messages";
import { compressedNumber } from "@/utils/formater/number";

function LikeButton({ post_id ,isActive,likes_count=0}: { post_id: string,isActive:boolean,likes_count:number }) {
  const [isLike, setLike] = useState(isActive)
  const [isTouch, setTouch] = useState(false)
  const { mutate: toggleLike } = useMutation({
    mutationFn: () => likeHandle(post_id),
    mutationKey: ["toggle-like", post_id],
    onSuccess: () => {
      setTouch(true)
      !isLike && successToast("Keep it up! The more posts you like, the better your timeline will be.")
      setLike(!isLike)
    },
    onError: () => {
      setLike(!isLike)
    },

  })
  // const onClick()
  return (
    <Tooltip title="like">
     <div className="flex items-center">
       <button
        onClick={() => toggleLike()}
        className={`${(isTouch && isLike) && "animate-pulse"} p-2 rounded-full text-rose-500 hover:bg-[#ff003744]`} >
        {isLike ?
          <FaHeart size={18} />
          : <FaRegHeart size={18} />}
      </button>
      <span className="text-zinc-500 text-xs">{compressedNumber(likes_count)}</span>
     </div>
    </Tooltip>
  )
}

export default LikeButton