import { MediaQueryType } from "@/types/post"
import Image from "next/image"
import ThumbnailVideo from "./PostCard/ThumbnailVideo";


function MediaContainer({ media }: { media:{media: MediaQueryType[]}[] | undefined }) {
  if (!media || media.length === 0)   return null
  const mediaFlatten = media.flatMap(m => m.media);
  
  
  return (
    <div className="p-1 grid grid-cols-3  gap-1">
      {mediaFlatten.map((m) => (
        <div key={m._id} className=" relative overflow-hidden h-36  bg-zinc-800">
          {m.type === "image" ? (
            <Image
              src={m.url}
              width={m.width}
              height={m.height}
              alt="Media"
              className="w-full h-full object-cover " />
          ) : (
            <ThumbnailVideo video={m} />
          )}
        </div>
      ))}
    </div>
  )
}

export default MediaContainer