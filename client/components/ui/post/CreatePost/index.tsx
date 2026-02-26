"use client"

import { CreatePostContextType, MediaQueryType } from "@/types/post"
import { createContext, ReactNode, useRef, useState, RefObject, useEffect } from "react"

import { EmojiClickData } from "emoji-picker-react"

export const CreatePostContext = createContext<CreatePostContextType>({
  postState: null,
  textContent: null,
  media: [],
  mediaResources: [],
  progressBars: [],
  setTextContent: () => null,
  setMedia: () => null,
  setMediaResources: () => null,
  setProgressBars: () => null,
  setPostState: () => null,
  rest: () => null,
  handleSelectEmoji: (emojiObject: EmojiClickData) => null,
  inputRef: null
})

function CreatePost({ children }: { children: (props: CreatePostContextType) => ReactNode }) {

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [textContent, setTextContent] = useState<string | null>("")
  const [media, setMedia] = useState([])
  const [mediaResources, setMediaResources] = useState([])
  const [progressBars, setProgressBars] = useState([])
  const [postState, setPostState] = useState<"ready" | "pending" | "success" | null>(null)
  const handleSelectEmoji = (emojiObject: EmojiClickData) => {
    const input = inputRef.current
    if (!input) return
    const emoji = emojiObject.emoji
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0
    const currentTextContent = input.value || ""
    const newText = currentTextContent.substring(0, start) + emoji + currentTextContent.substring(end)
    setTextContent(newText)
    setTimeout(() => {
      input.focus()
      input.selectionStart = input.selectionEnd = start + emoji.length
    }, 0)

  }
  const rest = () => {
    setMedia([])
    setTextContent(null)
    setPostState(null)
    setProgressBars([])
  }

  useEffect(() => {
    const allMediaReady = progressBars.length ? progressBars.every(el => el.completed) : true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPostState(prev => {
      if ((media.length || textContent?.trim().length) && allMediaReady && prev !== "ready") {
        return "ready";
      }
      if (!(media.length || textContent?.trim().length) || !allMediaReady) {
        return null;
      }
      return prev;
    });
  }, [media, textContent, progressBars]);

  const CreatePostContextValue = {
    textContent,
    media,
    mediaResources,
    postState,
    progressBars,
    inputRef,
    setTextContent,
    setMediaResources,
    setMedia,
    setProgressBars,
    handleSelectEmoji,
    setPostState,
    rest
  }
  return (
    <div className="">
      <CreatePostContext.Provider value={CreatePostContextValue}>
        <div className="relative">
          {children(CreatePostContextValue)}
          {postState === "pending" && <div className=" absolute inset-0 bg-[#0000006a] z-10"></div>}
        </div>
      </CreatePostContext.Provider>
    </div>
  )
}

export default CreatePost