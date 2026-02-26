
"use client"

import { useRouter } from "next/navigation"


function ProfileEditeButton() {
  const router = useRouter()

  return (
    <div className="cursor-pointer font-bold  rounded-full scendry-btn float-right"
      onClick={() => router.push("/setting/profile?view=modal", { scroll: false })}
    >
      edite profiler
    </div>
  )
}

export default ProfileEditeButton