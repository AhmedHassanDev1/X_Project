
import { clearTokens, getCurrentUser, setAccessToken } from "@/store/slices/authSlice";
import store from "@/store/store";
import axios from "axios"

const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.access_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)


  }
);

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/token-refresh")
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await apiAuth.put("/auth/token-refresh");

        store.dispatch(setAccessToken(data.access_token));

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch {


        store.dispatch(clearTokens());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


export { apiAuth };
export default api