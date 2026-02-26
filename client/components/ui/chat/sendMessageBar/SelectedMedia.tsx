"use client"

import { useContext, useEffect, useState } from "react"
import { MessageContext } from "./SendMessageBar"
import { extractThumbnail } from "@/utils/media/video"
import Loading from "../../loading/loading"
import { IoCloseSharp } from "react-icons/io5";
function SelectedMedia() {
    const { media, setMedia, setType, type } = useContext(MessageContext)
    const [loading, setLoading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!media) return;




        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        if (type === "image") {
            const url = URL.createObjectURL(media)
            setPreviewUrl(url)
            setLoading(false)
        } else if (type === "video") {
            const url = URL.createObjectURL(media)
            extractThumbnail(url).then(thumbnailBlob => {
                const thumbnailUrl = URL.createObjectURL(thumbnailBlob)
                setPreviewUrl(thumbnailUrl)
                setLoading(false)

            })

        } else {
            setLoading(false)
            setMedia(null)
        }

    }, [media])

    if (!media) return null

    return (
        <div className="w-full border-b-[1px] border-zinc-700 p-4">
            {loading && <div className="w-10 h-10 bg-zinc-700  p-1 ">
                <Loading />
            </div>}

            {previewUrl && <div className="relative w-fit ">
                <div
                    onClick={() => {
                        setMedia(null)
                        setType(null)
                    }}
                    className="absolute top-2 right-2">
                    <IoCloseSharp className=" cursor-pointer" size={20} />
                </div>
                {!loading && type === "image" &&

                    <img
                        src={previewUrl}
                        alt="Selected media preview"
                        className="max-h-48 rounded-lg object-cover"

                    />}
                {!loading && type === "video" && <div className="relative">
                    <div
                        onClick={() => {
                            setMedia(null)
                            setType(null)
                        }}
                        className="absolute top-2 right-2">
                        <IoCloseSharp className=" cursor-pointer" size={20} />
                    </div>
                    <img
                        src={previewUrl}
                        alt="Selected media preview"
                        className="max-h-48 rounded-lg object-cover" />

                </div>}

            </div>}
        </div>
    )
}

export default SelectedMedia