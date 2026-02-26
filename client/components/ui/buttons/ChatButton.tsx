"use client"
import { ChatRoute } from "@/constants/router"
import { useAuth } from "@/hooks/useAuth"
import { createOrFindChat } from "@/lib/api/rest/chat"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { MdOutlineLocalPostOffice } from "react-icons/md"
import { useRouter } from "next/navigation"

function ChatButton({ userId }: { userId: string | undefined }) {
  const router=useRouter()
  const { user } = useAuth()
  const participants: string[] = [userId || "", user?._id || ""]
  const { mutate, isPending ,isSuccess } = useMutation({
    mutationFn: () => createOrFindChat(participants, "dm"),
    mutationKey: ["chat", userId, user?._id],
    onSuccess:(data)=>{
      const chat_id=data?.data._id
        router.push(`${ChatRoute}/${chat_id}`)
      
    }
  })
 
   
  return (
    <button
      onClick={()=>mutate()}
      disabled={isPending||isSuccess}
      className={`rounded-full scendry-btn`}
    >
      <MdOutlineLocalPostOffice />
    </button>
  )
}

export default ChatButton