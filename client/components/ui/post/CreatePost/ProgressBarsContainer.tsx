"use client"
import { useContext } from "react"
import { CreatePostContext } from "."



function ProgressBarsContainer() {
  const { progressBars } = useContext(CreatePostContext)

  return (
    <div className=" space-y-2">
      {progressBars.map(progress => {
        return <div
          key={progress.media_id}
          className="rounded-lg bg-blue-950 p-2 font-bold">
          <span>{progress.fileName}</span>
          {progress.progress == 100 ? "uploaded" : "uploading"}
          <span>({progress.progress}%)</span>
        </div>
      })}
    </div>
  )
}

export default ProgressBarsContainer