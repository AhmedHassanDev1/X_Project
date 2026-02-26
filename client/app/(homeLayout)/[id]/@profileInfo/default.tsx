"use client"

import Loading from "@/components/ui/loading/loading"
import { getProfileInfo } from "@/lib/api/rest/user"
import { UserType } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation"
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiBalloon } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image"
import { birthDateFormatter, joinDateFormatter } from "@/utils/formater/date"
import Link from "next/link"
import { compressedNumber } from "@/utils/formater/number"
import ProfileEditeButton from "@/components/ui/buttons/ProfileEditeButton"
import { useEffect } from "react"
import { AxiosError } from "axios"
import { useAuth } from "@/hooks/useAuth"
import FollowButton from "@/components/ui/buttons/interactions/FollowButton"
import ChatButton from "@/components/ui/buttons/ChatButton"

function Default() {
  const params: { id: string } = useParams()
  const { id } = params
  const isModal = useSearchParams().get("view") === "modal";

  const router = useRouter();
  const { data, isPending, error } = useQuery<UserType>({
    queryKey: ['user-profile', id],
    queryFn: async () => getProfileInfo(id),
    enabled: !!id,

  })
  const { user: me } = useAuth()

  if (error instanceof AxiosError && error.response?.status === 400) {
    notFound()
  }
  useEffect(() => {
    if (isModal) {
      router.push("/setting/profile?view=modal", { scroll: false });
    }
  }, [])
  if (isPending) {
    return <div className="w-full aspect-[16/7]  grid place-content-center overflow-hidden"><Loading /></div>
  }

  return (
    <div className="">
      {/* profile image */}
      <div className="profile-image-container">
        {data?.profile_image ? <Image
          src={data?.profile_image}
          alt="Profile Image"
          width={400}
          height={400}
          className="profile-image-container"
        /> : (
          <div className="profile-image-container"></div>
        )}
      </div>
      <div className="w-full relative h-14 p-5 ">

        {/* user image (avatar) */}
        <div className="user-image-container">
          <Image
            src={data?.image || '/default-profile.jpg'}
            alt="user Image"
            width={250}
            height={250}
            className="user-image"
            
          />
        </div>
        {me?._id == data?._id ?
          <ProfileEditeButton /> :
          <div className="flex gap-2 items-center font-bold float-right">
            <ChatButton userId={data?._id} />
            <FollowButton userId={data?._id} isFollow={data?.isFollow} />
          </div>
        }
      </div>

      {/* user info */}
      <div className="px-5 py-2 mt-2">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
        <p className="mt-2">{data?.bio}</p>
        <div className="flex  gap-2 mt-4 text-zinc-500">
          {data?.location && <p className=" flex items-center gap-1"><IoLocationOutline />{data?.location}</p>}
          {data?.birth_date && <p className="  flex items-center gap-1"><PiBalloon /> Born {birthDateFormatter(data?.birth_date)}</p>}
          {data?.createdAt && <p className=" flex items-center gap-1"><FaRegCalendarAlt /> Joined {joinDateFormatter(data?.createdAt)}</p>}
        </div>
        <div className="flex gap-5 mt-2 text-sm">
          <Link href={`/${data?._id}/following`} className=" text-zinc-500 hover:underline flex gap-1">
            <span className="text-black dark:text-white">{compressedNumber(data?.followings_count)}</span>
            Following
          </Link>

          <Link href={`/${data?._id}/followers`} className=" text-zinc-500 hover:underline flex gap-1">
            <span className="text-black dark:text-white">{compressedNumber(data?.followers_count)}
            </span>
            Followers
          </Link>
        </div>
      </div>

    </div>

  )
}

export default Default