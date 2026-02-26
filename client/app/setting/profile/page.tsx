
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        router.push("/694c11c8255366f24634ccc3?view=modal", { scroll: false })
       
    }, [])
    return (
        <div className=''>
            <header className="header">

            </header>
        </div>
    )
}

export default page