"use client"
import { compressedNumber } from "@/utils/formater/number";
import { Tooltip } from "@mui/material";
import { FiMessageCircle } from "react-icons/fi";

function ReplayButton({ post_id, replies_count = 0 }: { post_id: string, replies_count: number }) {
    return (
        <Tooltip title="replay">
            <div className="flex  items-center">
                <button className="p-2 rounded-full text-zinc-500 hover:bg-[#00c3ff44]">
                    <FiMessageCircle size={20} />
                </button>
                <span className="text-zinc-500 text-xs">{compressedNumber(replies_count)}</span>

            </div>
        </Tooltip>
    )
}

export default ReplayButton