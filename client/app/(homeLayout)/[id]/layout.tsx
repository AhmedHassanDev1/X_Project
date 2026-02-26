
import NavigationBar from "@/components/layout/NavigationBar";
import "./profile.css"
import React from "react"

import ProfileHeader from "@/components/ui/profile/ProfileHeader";

async function layout({ children, profileInfo, params }: { children: React.ReactNode; profileInfo: React.ReactNode, params: { id: string } }) {
  const Param = await params
  const id = Param.id.split("/")[0]
  

  const profileNavigationBarItems = [
    { title: "posts", link: `/${id}/` },
    { title: "replaies", link: `/${id}/with_replies` },
    { title: "media", link: `/${id}/media` },
    { title: "likes", link: `/${id}/likes` },
  ]
  return (
    <div className="w-full">
      <ProfileHeader id={id} />
      {profileInfo}
      <NavigationBar items={profileNavigationBarItems} />
      {children}
    </div>
  )
}

export default layout