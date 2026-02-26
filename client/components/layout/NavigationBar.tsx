"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
;

type NavigationBarItemsProps = {
    title: string;
    link: string;

}


function NavigationBar({ items }: { items: NavigationBarItemsProps[] }) {
    const PathName = usePathname()

    const ActiveItem = items.find((item) => PathName.endsWith(item.link))?.title || "posts"
    const [active, setActive] = useState<string>(ActiveItem)

    return (
        <div className="w-full grid grid-flow-col auto-cols-fr border-b-solid border-zinc-700 border-b-[1px]  ">{
            items?.map((item: NavigationBarItemsProps, index: number) => (
                <Link
                    key={index}
                    href={item.link}
                    className="">
                    <div
                        onClick={() => setActive(item.title)}
                        className="relative flex justify-center  hover:bg-[#ffffff27] duration-150">
                        <div className="w-min py-4 block relative">
                            {item.title}
                            {active == item.title && <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-500 rounded-full"></div>}
                        </div>
                    </div>
                </Link>
            ))
        }</div>
    )
}

export default NavigationBar