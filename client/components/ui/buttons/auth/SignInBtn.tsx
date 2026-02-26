import { SignInRoute } from "@/constants/router"
import Link from "next/link"


function SignInBtn() {
  return (
    <div>
          <Link href={SignInRoute} className=" block p-2 text-center rounded-full border-[1px] border-solid dark:border-gray-300  border-black text-lg font-bold">
                Sign in
            </Link>

    </div>
  )
}

export default SignInBtn