"use client"

import { followHandle } from "@/lib/api/rest/interactions"
import { UserType } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"



function FollowButton({ userId, isFollow }: { userId: string | undefined, isFollow: boolean | undefined }) {
  const queryClient = useQueryClient()

  const { mutate: toggleFollow } = useMutation({
    mutationFn: followHandle,
    onSuccess: () => {
      const QueryKey = ['user-profile', userId]
      const data: UserType | undefined = queryClient.getQueryData(QueryKey)
      if (data) {

        queryClient.setQueryData(QueryKey, { ...data, isFollow: !isFollow })
      }
    },
    onError: () => {

    }
  })

  const [textContent, setTextContent] = useState<string>(isFollow ? "following" : "follow")

  return (
    <div
      className={`${isFollow ? "scendry-btn" : "primary-btn"} ${isFollow ? "hover:text-red-700 hover:border-red-700 hover:bg-[#ff000027]" : "hover:opacity-85"} duration-150 `}
      onClick={() => toggleFollow(userId || " ")}
      onMouseEnter={() => setTextContent(isFollow ? "unfollow" : "follow")}
      onMouseLeave={() => setTextContent(isFollow ? "following" : "follow")}
    >
      {textContent}
    </div>
  )
}

export default FollowButton