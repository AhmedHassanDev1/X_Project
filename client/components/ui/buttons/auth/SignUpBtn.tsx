import { SignUpRoute } from "@/constants/router"
import Link from "next/link"


function SignUpBtn() {
    return (
        <div className=" relative ">
            <Link href={SignUpRoute} className=" block p-2 text-center rounded-full dark:bg-white dark:text-black bg-black text-white text-lg font-bold">
                Create account
            </Link>

        </div>
    )
}

export default SignUpBtn