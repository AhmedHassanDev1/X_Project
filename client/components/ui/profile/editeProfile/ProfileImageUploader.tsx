"use client"
import { useAuth } from "@/hooks/useAuth";
import { Dispatch, SetStateAction, useState } from "react";
import { CiCamera } from "react-icons/ci";
type ProfileImageUploaderProps = {
    setProfileImage: Dispatch<SetStateAction<File | null>>;
};

function ProfileImageUploader({ setProfileImage }: ProfileImageUploaderProps) {
    const { user } = useAuth()
    const [url, setUrl] = useState(user?.profile_image || '')
    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUrl(e.target?.result as string);
                setProfileImage(file)
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="profile-image-container relative ">
            <label htmlFor="profile-image-input">
                <CiCamera
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white  rounded-full  z-100"
                    size={25} />
            </label>
            <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
            />
            {url ?
                <img src={url} alt="Profile" className="w-full h-full object-cover" /> :
                <div className="w-full h-full bg-gray-600"></div>
            }
        </div>
    )
}

export default ProfileImageUploader