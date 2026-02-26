import axios, { AxiosRequestConfig } from "axios";
import api from ".";

const uploadApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLOUD_URL,
});

export async function uploadFile(
  file: File,
  onProgress: (progress: number) => void,
  options?: AxiosRequestConfig
) {

  const { data } = await api.get("/interactions/cloudinary-signature");

  const { api_key, cloud_name, signature, timestamp } = data;


  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);



  return uploadApi.post(
    `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
    formData,
    {
      onUploadProgress: (e) => {
        const progress = Math.round(
          (e.loaded * 100) / (e.total || 1)
        );
        onProgress(progress);
      },
      ...options
    }
  );
}