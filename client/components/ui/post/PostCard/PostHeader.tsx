import { useAuth } from "@/hooks/useAuth";
import { PostType } from "@/types/post"
import { PostDateFormatter } from "@/utils/formater/date";
import Image from "next/image";
import Link from "next/link";
import { BiRepost } from "react-icons/bi";
import PostMenu from "./PostMenu";
import React from "react";



function PostHeader({ post, deep }: { post: PostType, deep?: number }) {
    const author = post.user;
    const isRepost = post.type === 'repost' && !post.text
    const { user } = useAuth()
    return (
        <div className=" ">

            {(isRepost && user?._id == author._id) ? (
                <div className=" flex items-center text-sm font-bold gap-2 px-5 text-gray-400">
                    <BiRepost />
                    <span>you reposted</span>
                </div>
            ) : (<div
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                className="grid grid-cols-[min(32px,10%)_1fr] gap-2">
                <Image
                    src={author.image || "/default-profile.jpg"}
                    alt={author.name}
                    width={56}
                    height={56}
                    className="w-full aspect-square object-cover round-frame"
                />
                <div className="flex justify-between items-center p-2">
                    <div className="text-sm">
                        <Link href={author._id}><span className=" hover:underline text-zinc-200">{author.name}</span></Link>
                        <Link href={`/${author._id}`} className="hover:underline text-zinc-500">@{author.name.replace(/\s+/g, '').toLowerCase()}</Link>
                        <span className=" text-zinc-500"> · </span>
                        <span className=" text-zinc-500">{PostDateFormatter(post.createdAt)}</span>
                    </div>
                    <PostMenu />
                </div>
            </div>)}
        </div>
    )
}

export default PostHeader