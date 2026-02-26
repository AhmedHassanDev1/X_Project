"use client"
import { BiRepost } from "react-icons/bi";
import { Tooltip } from "@mui/material"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { compressedNumber } from "@/utils/formater/number";

type RepostButtonProps = {
    post_id: string
    repost_count?: number
    isRepost?: boolean
    reposts_count: number
}

function RepostButton({ post_id, reposts_count = 0 }: RepostButtonProps) {
    return (
        <Tooltip title="repost">
            <div className="flex  items-center">
                <button className="p-2 rounded-full text-zinc-500  hover:bg-[#00ff7729]">
                    <BiRepost size={22} />
                </button>
                <span className="text-zinc-500 text-xs">{compressedNumber(reposts_count)}</span>

            </div>
        </Tooltip>
    )
}

export default RepostButton