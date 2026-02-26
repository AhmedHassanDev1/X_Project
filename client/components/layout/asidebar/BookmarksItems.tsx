"use client"

import { BookmarksRoute } from "@/constants/router"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { PiBookmarkSimpleLight } from "react-icons/pi";
function BookmarksItems() {
  const pathName = usePathname()
  const is_active = pathName === BookmarksRoute
  return (
    <Link href={BookmarksRoute} className="navigation-bar-items">
      {is_active ? <PiBookmarkSimpleFill size={25} /> : <PiBookmarkSimpleLight size={25} />}
    </Link>
  )
}

export default BookmarksItems