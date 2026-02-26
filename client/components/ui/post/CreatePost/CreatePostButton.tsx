"use client"
import { HTMLAttributes, useContext } from "react"
import { CreatePostContext } from "."
import { useMutation } from "@tanstack/react-query"
import { createPost } from "@/lib/api/rest/interactions"
import { uploadFile } from "@/lib/api/rest/upload"
import { MediaResource, uploadFileType } from "@/types/post"



type CreatePostButtonPropstype = {
    props?: HTMLAttributes<HTMLButtonElement>
    original?: string
    type?: string
}

function CreatePostButton({ original, type, ...props }: CreatePostButtonPropstype) {
    const { rest, postState, textContent, media, setPostState, mediaResources  } = useContext(CreatePostContext)
    const isDisabled = !(postState || postState == "pending")
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["create-post"],
        mutationFn: createPost,
        onSuccess: ()=>rest(),
        onError: (err) =>rest()

    })

    const handleClick = async () => {
        setPostState("pending")
        const uploadedResources:MediaResource[] = [];
        for (const m of media) {
            if (m.type == "image") {
                const { public_id, secure_url: url, width, height, format, resource_type: type, bytes: size } = (await uploadFile(m?.file, () => null)).data;
                const resources = { public_id, url, width, height, format, type, size }
                uploadedResources.push({
                    public_id,
                    url,
                    width,
                    height,
                    format,
                    type,
                    size
                });
            }
       
        const variables={
            text: textContent || "",
        }
        // if([...mediaResources,...uploadedResources].length) variables.media=[...mediaResources,...uploadedResources]
        mutate(variables);

    }
}
return (
    <button
        disabled={isDisabled}
        onClick={handleClick}
        className="primary-btn"
        {...props}>
        Post
    </button>
)
}


export default CreatePostButton