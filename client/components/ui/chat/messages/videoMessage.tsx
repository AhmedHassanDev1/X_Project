import { MessageType } from "@/types/chat"
import VideoPlayer from "../../post/PostCard/VideoPlayer"



function videoMessage({ message }: { message: MessageType }) {

    return <VideoPlayer video={message.media} />
}

export default videoMessage