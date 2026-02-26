"use client"

import { useAuth } from "@/hooks/useAuth"
import { apiAuth } from "@/lib/api/rest"
import { getCurrentUser, setAccessToken } from "@/store/slices/authSlice"
import store, { useAppDispatch } from "@/store/store"
import Image from "next/image"
import { useEffect } from "react"





function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  const { isAuthenticated, token } = useAuth()

  useEffect(() => {
    apiAuth.put("/auth/token-refresh")
      .then(response => {
        store.dispatch(setAccessToken(response.data?.access_token || null));
      });
  }, [])
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser())
    }
  }, [token])


  return (
    <>  {isAuthenticated ?
      children :
      <html>
        <body className="body min-h-screen justify-center">
          <div className="w-screen h-screen grid place-content-center">
            <Image
              src={"/white-logo.png"}
              alt="loading app"
              width={70}
              height={70}
              className="opacity-80"
            />
          </div>
        </body>
      </html>
    }</>
  )
}

export default AuthProvider