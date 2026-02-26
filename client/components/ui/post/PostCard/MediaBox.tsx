import { MediaQueryType } from "@/types/post"
import ImageBox from "./ImageBox";
import VideoPlayer from "./VideoPlayer";

function MediaBox({media}:{media:MediaQueryType[]}) {
  if(media.length===0||!media) return null;

 
  
  return (
    <div className="post-media-box" onClick={(e:React.MouseEvent<HTMLDivElement>)=>e.stopPropagation()}>
      {media.map((m,i)=>(
        m.type==='image' ? <ImageBox key={i} image={m} /> : <VideoPlayer key={i} video={m} />
      ))}
    </div>
  )
}

export default MediaBox