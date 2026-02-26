"use client"
import { MediaQueryType } from "@/types/post"
import { formatDuration } from "@/utils/formater/date";
import Image from "next/image";
import { useEffect, useState } from "react";

function ThumbnailVideo({ video }: { video: MediaQueryType }) {
    const [duration, setDuration] = useState<number>(0);
    const onLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const video = e.currentTarget as HTMLVideoElement;
        setDuration(video.duration);
    }
    useEffect(() => {
        const vid = document.createElement("vidoe") as HTMLVideoElement
        vid.preload = "metadata";
        vid.src = video.url;
        vid.addEventListener("loadedmetadata", (e) => {
            onLoadedMetadata(e)
        })

    }, [])

    return (
        <div className="relative w-full h-full ">
            {video.thumbnail && <Image 
            src={video.thumbnail} 
            alt="video.thumbnail"
            width={256}
            height={256}
            className="w-full h-full object-cover"
             />}
            <span className=" absolute bottom-2 left-2 bg-[#2f2f2f82] p-0.5 ">{formatDuration(duration)}</span>
        </div>
    )
}

export default ThumbnailVideo