
"use client"

import { useAuth } from "@/hooks/useAuth"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { CiCamera } from "react-icons/ci"
type ImageUploaderProps = {
    setImage: Dispatch<SetStateAction<File | null>>;
};
function UserImageUploader({ setImage }: ImageUploaderProps) {
    const { user } = useAuth()
    const [url, setUrl] = useState(user?.image || '/default-profile.jpg')
    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUrl(e.target?.result as string);
                setImage(file)
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="user-image-container ">
            <label htmlFor="user-image-input">
                <CiCamera
                    className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer text-white  rounded-full  z-100"
                    size={25} />
            </label>
            <input
                id="user-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
            />

            <Image
                width={200}
                height={200}
                src={url}
                alt="Profile"
                className="w-full h-full object-center object-cover" /> :


        </div>
    )
}

export default UserImageUploader