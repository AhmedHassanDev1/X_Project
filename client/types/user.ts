
export type UserType = {
    _id: string | undefined
    name: string | undefined
    bio: string | undefined
    location: string | undefined
    birth_date: string | undefined
    createdAt: string | undefined
    image: string | undefined
    profile_image: string | undefined
    followers_count: number | undefined
    followings_count: number | undefined
    isFollow: boolean
}

export type ProfileEditType = {
    name: string
    bio: string
    location: string
}

export type ProfileStat = {
    images_count: number
    videos_count: number
    likes_count: number
    posts_count: number
}