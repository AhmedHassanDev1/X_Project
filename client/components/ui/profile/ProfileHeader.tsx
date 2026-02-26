"use client"

import { getProfileInfo, getProfileStat } from "@/lib/api/rest/user"
import { ProfileStat, UserType } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { FaArrowLeftLong } from "react-icons/fa6";
import BackButton from "../buttons/routers/BackButton";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ChangeSubTitle = (page: string, stat: ProfileStat): string => {
    switch (page) {
        case "media":
            return ` ${stat.images_count + stat.videos_count} photos & videos `;
        case "likes":
            return `${stat.likes_count || 0} likes`;
        default:
            return `${stat.posts_count || 0} posts`;
    }
}

function ProfileHeader({ id }: { id: string }) {
    const { data: user } = useQuery<UserType>({
        queryKey: ["user-profile-info", id],
        queryFn: async () => getProfileInfo(id),
    })

    const { data: stat } = useQuery<ProfileStat>({
        queryKey: ["user-profile-stat", id],
        queryFn: async () => getProfileStat(id),
    })

    const page = usePathname().split("/")[2]
    
      console.log(page);
      
   

    return (
        <header className="header flex items-center gap-5">
            <BackButton>
                <FaArrowLeftLong size={18} />
            </BackButton>
            <div className="">
                <h1 className="text-lg font-bold">{user?.name}</h1>
                {stat && <span className=" text-zinc-500 text-sm">{ChangeSubTitle(page, stat)}</span>}
            </div>
        </header>
    )
}

export default ProfileHeader