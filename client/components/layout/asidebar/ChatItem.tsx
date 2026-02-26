"use client"


import { ChatRoute } from "@/constants/router"
import useSocket from "@/hooks/useSocket"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdLocalPostOffice, MdOutlineLocalPostOffice } from "react-icons/md"

import {  useState } from "react"
import { compressedNumber } from "@/utils/formater/number"



function ChatItem() {
    const pathName = usePathname()
    const [notificationCount, setNotificationCount] = useState(0)
    const is_active = pathName.startsWith(ChatRoute)
  





    return (
        <Link href={ChatRoute} className="navigation-bar-items">
            {is_active ?
                <MdLocalPostOffice size={25} /> :
                <MdOutlineLocalPostOffice size={25} />}
            {notificationCount > 0 && <span className="absolute w-4 h-4 text-center right-2 top-0 -translate-y-0.5 bg-sky-500 text-xs rounded-full">
                {compressedNumber(notificationCount)}
            </span>}
        </Link>
    )
}

export default ChatItem