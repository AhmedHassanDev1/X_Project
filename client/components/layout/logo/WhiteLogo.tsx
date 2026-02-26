"use client"
import Image from "next/image"
function WhiteLogo() {
  return (
    <div  className="relative w-7 h-7 " >
        <Image src={"/icons8-x-30.png"} alt="logo" fill />
    </div>
  )
}

export default WhiteLogo