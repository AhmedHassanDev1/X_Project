"use client"
import { RootState, useAppSelector } from "@/store/store";
import { AuthType } from "@/types/auth";


// Authentication hook 
export function useAuth() {
    const Auth = useAppSelector((state: RootState) => state.auth as AuthType | null);
    return {
        user: Auth?.user,
        token: Auth?.access_token,
        userId: Auth?.user?._id,
        isAuthenticated: !!Auth?.access_token,
    };
}