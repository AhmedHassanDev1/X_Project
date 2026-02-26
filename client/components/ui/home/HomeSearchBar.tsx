"use client"

import { useRouter } from "next/navigation"
import SearchBar from "../inputs/SearchBar"
import { ChangeEvent, useState } from "react"
import { SearchRoute } from "@/constants/router"
function HomeSearchBar() {
    const [searchValue, setSearchValue] = useState<string | null>(null)
    const router = useRouter()
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`${SearchRoute}?q=${searchValue}`)
        }
    };
    return (
        <div className=''>
            <SearchBar
                placeholder="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)}
                onKeyUp={onEnterPress}
            />
        </div>
    )
}

export default HomeSearchBar