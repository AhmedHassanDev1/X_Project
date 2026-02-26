"use client"
import { IoHomeOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { usePathname  } from "next/navigation";
import { HomeRoute } from "@/constants/router";
import Link from "next/link";
function HomeItems() {
  const pathName=usePathname() 
  const is_active=pathName===HomeRoute 
  return (
    <Link href={HomeRoute} className="navigation-bar-items">
      {is_active?<IoHomeSharp size={25}/>:<IoHomeOutline size={25}/>}
    </Link>
  )
}

export default HomeItems