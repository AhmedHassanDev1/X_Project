"use client"
import { ExploreRoute } from "@/constants/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
function ExplorButton() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathName = usePathname()
    const is_active = pathName === ExploreRoute
    return (
        <Link href={ExploreRoute} className="navigation-bar-items">
            {is_active ? <IoSearchSharp size={25} /> : <IoSearchOutline size={25} />}
        </Link>
    )
}

export default ExplorButton