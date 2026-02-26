
"use client"
import { memo, useContext } from "react"
import { CreatePostContext } from "."
import PreviewMediaItem from "./PreviewMediaItem"


function PreViewMedia() {
  const { media } = useContext(CreatePostContext)

  return (
    <div className={`grid gap-2 ${media.length === 1
        ? "grid-cols-1"
        : media.length === 2
          ? "grid-cols-2"
          : media.length === 3
            ? "grid-cols-2 grid-rows-2"
            : "grid-cols-2 md:grid-cols-2"
      }`}>
      {media.map(m => <PreviewMediaItem key={m._id} data={m} />)}
    </div>
  )
}

export default memo(PreViewMedia)