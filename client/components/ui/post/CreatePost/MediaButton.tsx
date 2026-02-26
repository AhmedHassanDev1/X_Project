"use client"
import { AiOutlinePicture } from "react-icons/ai";
import { ChangeEvent, useContext } from "react"
import { CreatePostContext } from "."
import { successToast } from "@/utils/messages";
import { extractThumbnail } from "@/utils/media/video";
import { getMediaDimensions } from "@/utils/media";

function MediaButton() {
    const { setMedia, media } = useContext(CreatePostContext)
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const maxMediaLength = 5
        const files = e.target.files
        if (!files) return
        if ((files.length + media?.length) > maxMediaLength) return successToast("Please choose up to 4 photos, videos, or GIFs.")
        for (let i = 0; i < files.length; i++) {
            const _id = crypto.randomUUID()
            const file = files[i];
            const fileName=file.name
            const index=media.length
            const type = file.type.split("/")[0]
            const url = URL.createObjectURL(file)
            const thumbnail = type == "video" ? URL.createObjectURL(await extractThumbnail(url)) : null
            const { width, height } = await getMediaDimensions(file)
            const size=file.size
            const format=file.type.split("/")[1]
            const m = { _id,index, file, type, url, thumbnail, width, height,fileName,size,format }

            setMedia([...media, m])
        }
    }
    return (
        <button className="">
            <label
                htmlFor="upload-media-post"
                className="">
                <AiOutlinePicture size={22} className="text-sky-600" />
            </label>
            <input
                id="upload-media-post"
                className="hidden"
                type="file"
                accept="image/* , video/*"
                multiple
                onChange={handleChange}
            />
        </button>
    )
}

export default MediaButton