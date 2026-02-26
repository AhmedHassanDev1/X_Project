"use client"

import { InputHTMLAttributes } from "react"
import { CiSearch } from "react-icons/ci";

type SearchBarProps =  InputHTMLAttributes<HTMLInputElement>



function SearchBar( props : SearchBarProps) {

    return (
        <div className='search-bar has-focus:border-sky-500'>
            <label className="text-inherit text-lg" htmlFor="search-bookmarks">
                <CiSearch />
            </label>
            <input type="search" {...props} />
        </div>
    )
}

export default SearchBar