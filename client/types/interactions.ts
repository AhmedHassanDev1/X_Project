import { MediaResource } from "./post"

export type UploadSignatureType={
      cloud_name:string
      signature:string
      api_key:string
      timestamp:number
}

export type MediaType={
     width:number
     height:number
     size:number
     url:string
     public_id:string
     format:string
     thumbnail?:string
     type:string
} 

export type CreatePostType={
     text?:string
     media?:MediaType[] | MediaResource[]
}