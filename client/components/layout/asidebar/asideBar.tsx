"use client"

import CurrentUserImg from "@/components/ui/user/CurrentUserImg"
import WhiteLogo from "../logo/WhiteLogo"
import HomeItems from "./Homeitems"
import ProfileItem from "./ProfileItem"
import { Button, Popover } from "@mui/material"
import { useState } from "react"
import BookmarksItems from "./BookmarksItems"
import ExplorButton from "./explorButton"
import ChatItem from "./ChatItem"
function AsideBar() {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <aside className="md:flex hidden flex-col sticky top-0 justify-between h-screen py-5">
            <div className="space-y-3">
                <div className="navigation-bar-items">
                    <WhiteLogo />
                </div>
                <HomeItems />
                <ExplorButton />
                <ChatItem />
                <BookmarksItems />
                <ProfileItem />

            </div>
            <div className="bg-black">
                <Button aria-describedby={id}
                    sx={{
                        background: "black"
                    }}
                    onClick={handleClick}>
                    <CurrentUserImg width={40} height={40} />
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div className="p-4 max-w-xs text-black dark:text-white bg-white dark:bg-black shadow-2xl shadow-black dark:shadow-white ">
                        <div className="cursor-pointer">log out</div>
                    </div>
                </Popover>
            </div>
        </aside>
    )
}

export default AsideBar