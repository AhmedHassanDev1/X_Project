"use client"
import { uploadFileType } from "@/types/post"
import Image from "next/image"
import { useContext, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CreatePostContext } from ".";
import { uploadFile } from "@/lib/api/rest/upload";
import axios from "axios";

function PreviewMediaItem({ data }: { data: uploadFileType }) {
  const { setMedia, media, progressBars, setProgressBars, setMediaResources,mediaResources } = useContext(CreatePostContext)
  const controllerRef = useRef<AbortController | null>(null);
  const type = data.type

  const cancelUpload = () => {
    controllerRef.current?.abort();
  };
  const onDiscard = () => {
    setMedia(media.filter(el => el._id !== data._id))
    setProgressBars(prev => prev?.filter(el => el.media_id !== data._id) ?? null)
    if (type == "video") cancelUpload()
  }

  useEffect(() => {
    if (type == "image") return;
    const file = data.file
    controllerRef.current = new AbortController()
    uploadFile(file,
      (progress) => {
        setProgressBars(prev => {
          if (!prev) return [{
            media_id: data._id,
            fileName: data.fileName,
            progress,
            completed: false
          }];
          const ProgressBarExists = prev.find(el => el.media_id === data._id);
          if (ProgressBarExists) {
            return prev.map(el => el.media_id === data._id ? { ...el, progress } : el);
          } else {
            return [...prev, {
              media_id: data._id,
              fileName: data.fileName,
              progress,
              completed: false
            }];
          }
        });
      }
      ,
      {
        signal: controllerRef.current.signal
      }
    ).then(res => {
      const { public_id, secure_url: url, width, height, format, resource_type: type, bytes: size } = res.data;
      const resources = { public_id, url, width, height, type, format, size }
      setProgressBars(prev => {
        if (!prev) return []
        return prev?.map(el => el.media_id == data._id ? { ...el, completed: true } : el)

      })
      setMediaResources([...(mediaResources||[]),resources]);
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.log("Upload cancelled");
      } else if (err.name === "CanceledError") {
        console.log("Upload aborted via signal");
      } else {
        console.error("Upload error:", err);
      }
    })

  }, [])



  return (
    <div className="w-full max-h-[600px]  relative  rounded-xl cursor-pointer overflow-hidden">
      <div
        onClick={onDiscard}
        className="absolute top-2 right-2 p-2 rounded-full backdrop:bg-[#ffffff80] z-10">
        <IoCloseSharp size={20} />
      </div>
      {type == "image" ?
        <Image
          src={data.url}
          alt="preview media"
          width={data.width}
          height={data.height}
          className="w-full h-full object-cover"
        /> :
        <video
          poster={data.thumbnail || ""}
          src={data.url}
          className="w-full h-full object-center object-cover"
          muted
          loop
          autoPlay
        />}
    </div>
  )
}

export default PreviewMediaItem