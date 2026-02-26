"use client"

import { useEffect, useRef } from "react"
import Hls from "hls.js"
import { useInView } from "react-intersection-observer"
function VideoPlayer({ video }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref } = useInView({
    threshold:1, 
    onChange:(inView)=>{
        if (inView&&videoRef.current) return
        else videoRef.current?.pause()
     }
  })
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const src = video.url;

    if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = src;
    } else if (Hls.isSupported() && src.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoEl);
    } else {

      videoEl.src = video.url;
    }
  }, [video]);

  return (
    <div ref={ref} className="">
      <video
        ref={videoRef}
        poster={video.thumbnail||""}
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default VideoPlayer