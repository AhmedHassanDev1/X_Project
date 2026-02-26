import { CreatePostType } from "@/types/interactions";
import api from ".";


export async function getUploadSignature() {
     const res = await api.get("/interactions/cloudinary-signature")
     return res.data
}

export async function createPost(body: CreatePostType) {
     const res = await api.post("/interactions/create-post", body)
     return res.data
}

export async function likeHandle(post_id:string) {
     return await api.post("/interactions/"+post_id+"/like") 
}

export async function bookmarkHandle(post_id:string) {
     return await api.post("/interactions/"+post_id+"/bookmark") 
}

export async function followHandle(followingId:string) {
     return await api.post("/interactions/"+followingId+"/follow") 
}