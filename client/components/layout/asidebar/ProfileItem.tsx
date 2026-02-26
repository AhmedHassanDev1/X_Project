"use client"

import { useAuth } from "@/hooks/useAuth"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
function ProfileItem() {
  const { userId } = useAuth()
  const pathname = usePathname()
  const isActive = pathname.startsWith(`/${userId}`);
  return (
    <Link href={`/${userId}`} className="navigation-bar-items">
      {isActive ? <FaUser size={25}/> : <FaRegUser size={25} />}
    </Link>
  )
}

export default ProfileItem