import { UserType } from "./user"

export type AuthType = {
    auth?: any
    access_token: string | undefined
    user: Partial<UserType> | undefined
    pending: boolean
    error: string | undefined

}  