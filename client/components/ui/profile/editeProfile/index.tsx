
"use client"
import BackButton from "@/components/ui/buttons/routers/BackButton";
import TextArea from "@/components/ui/inputs/TextArea";
import TextInput from "@/components/ui/inputs/TextInput";
import ProfileImageUploader from "@/components/ui/profile/editeProfile/ProfileImageUploader";
import UserImageUploader from "@/components/ui/profile/editeProfile/UserImageUploader";
import { useAuth } from "@/hooks/useAuth";
import { getProfileInfo, ProfileEdite } from "@/lib/api/rest/user";
import { getCurrentUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { ProfileEditType } from "@/types/user";
import { errorToast } from "@/utils/messages";
import { Button, Dialog, DialogActions, DialogContent, } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";;

function ProfileEditContainer() {

    const router = useRouter();

    const pathname = usePathname();

    const searchParams = useSearchParams();

    const { user } = useAuth()

    const [image, setImage] = useState<File | null>(null)

    const [profileImage, setProfileImage] = useState<File | null>(null)

    const [isOpen, setOpen] = useState(false)
    const { control, handleSubmit, reset, formState: { isDirty } } = useForm<ProfileEditType>({
        defaultValues: {
            name: user?.name || "",
            bio: user?.bio || "",
            location: user?.location || "",
        },
    });
    const dispatch = useAppDispatch()
    const { refetch } = useQuery({ queryFn: () => getProfileInfo(user?._id || ""), queryKey: ["user-profile", user?._id] })
    const { mutate: update, isPending } = useMutation({
        mutationKey: ["profile-edit", user?._id],
        mutationFn: ProfileEdite,
        onSuccess: () => {
            dispatch(getCurrentUser())
            refetch()
            handleClose()
        },
        onError: () => errorToast("has error pleace try agian.")
    })
    const hasUpdate = (image || profileImage || isDirty || !isPending)

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        router.back();
        return () => {
            router.replace(
                params.toString()
                    ? `${pathname}?${params.toString()}`
                    : pathname,
                { scroll: false }
            );
            params.delete("view");

        }
    };
    const onSubmit = async (data: ProfileEditType) => {
        const formData = new FormData()
        const { name, bio, location } = data
        if (image) formData.append("userImage", image)
        if (profileImage) formData.append("profileImage", profileImage)
        formData.append("name", name)
        formData.append("bio", bio)
        formData.append("location", location)
        update(formData)

    }

    useEffect(() => {
        if (user) {
            reset({
                name: user.name ?? "",
                bio: user.bio ?? "",
                location: user.location ?? "",
            });
        }
    }, [user, reset]);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-12/11 max-w-xl min-w-xl dark:bg-black bg-white rounded-2xl p-1 overflow-y-auto max-h-[90vh] ">
                <header className="header flex justify-between">
                    <div className="flex items-center gap-2">
                        <IoCloseSharp
                            onClick={() => setOpen(true)}
                            className="cursor-pointer"
                            size={24}
                        />
                        <h3 className="font-bold text-lg dark:text-white text-black">Edit Profile</h3>
                    </div>
                    <button
                        className="primary-btn flex items-center gap-2"
                        type="submit"
                        disabled={!hasUpdate}
                    >
                        {isPending && <AiOutlineLoading3Quarters className="animate-spin " />}
                        Save
                    </button>

                </header>
                <div className="">
                    {/* edite profile image */}
                    <div className="">
                        <ProfileImageUploader setProfileImage={setProfileImage} />
                        <div className="relative h-14">
                            <UserImageUploader setImage={setImage} />
                        </div>
                    </div>

                    {/* Edit profile content goes here */}
                    <div className="flex flex-col gap-4 p-1">

                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <TextInput {...field} name="name" />
                                    {fieldState.error && (
                                        <p className="form-error" >{fieldState.error.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            name="bio"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <TextArea {...field} name="bio" />

                                </div>
                            )}
                        />

                        <Controller
                            name="location"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <TextInput {...field} name="location" />

                                </div>
                            )}
                        />
                    </div>
                </div>
            </form>
            <Dialog
                open={isOpen}
            // onClose={handleClose}
            >

                <DialogContent className="dark:bg-black bg-white text-white">

                    <h1 className="">
                        Discard changes?
                    </h1>

                    <p className="">This can’t be undone and you’ll lose your changes.</p>

                    <DialogActions>
                        <Button onClick={() => setOpen(false)} >Cancel</Button>

                        <Button
                            color="error"
                            variant="contained" onClick={handleClose}>
                            Discard
                        </Button>
                    </DialogActions>
                </DialogContent>


            </Dialog>
        </>
    )
}

export default ProfileEditContainer