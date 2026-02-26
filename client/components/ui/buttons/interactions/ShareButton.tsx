"use client"
import { RiShare2Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import { FiFeather } from "react-icons/fi";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useState } from "react";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { PostType } from "@/types/post";
import { writeTextInClipboard } from "@/utils/clipboard";
import { errorToast, successToast } from "@/utils/messages";

function ShareButton({ post }: { post: PostType }) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCopyLink = async () => {
        try {
            handleClose()
            await writeTextInClipboard("http://localhost:3000/" + post._id)
            successToast("Copied to clipboard")
        } catch (error) {
            errorToast("Copy failed")
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Tooltip title="share">
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
             
                        <RiShare2Line size={20} />
                   
                </Button>
            </Tooltip>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#000",
                        color: "#fff",
                        borderRadius: 2,
                        minWidth: 180,
                    },
                }}
            >
                <MenuItem
                    onClick={onCopyLink}   >
                    <IoMdLink size={20} className="mr-2" />
                    copy link
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <RiShare2Line size={20} className="mr-2" />
                    share post via...
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <MdOutlineLocalPostOffice size={20} className="mr-2" />
                    send via chat
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ShareButton