"use client"
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image"
import { useState } from "react";

function CurrentUserImg({ width = 56, height = 56 }: { width?: number, height?: number }) {
    const { user } = useAuth();
    const [loading,setLoading]=useState(true)
     
    return (
        <div style={{ width: width + "px", height: height + "px" }} 
        className={`${loading&&"skeleton-loading-animate"} bg-zinc-800 rounded-full cursor-pointer overflow-hidden`}>
            <Image
                src={user?.image || "/default-profile.jpg"}
                alt="avatar"
                width={width}
                height={height}
                onLoadingComplete={()=>setLoading(false)}
                className="w-full h-full rounded-full object-cover object-center" />
                
        </div>
    )
}

export default CurrentUserImg