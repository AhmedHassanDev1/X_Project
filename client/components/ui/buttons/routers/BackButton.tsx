"use client"

import { useRouter } from "next/navigation";

function BackButton({children}: {children: React.ReactNode}) {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>
        {children}
      </button>
    </div>
  )
}

export default BackButton