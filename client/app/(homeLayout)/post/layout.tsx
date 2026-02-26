import BackButton from "@/components/ui/buttons/routers/BackButton";
import { ReactNode } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
function layout({
    children,
    replies
}: {
    children: ReactNode
    replies: ReactNode
}) {
    return (
        <div className="">
            <header className="header flex gap-2 items-center">
                <BackButton>
                    <FaArrowLeftLong />
                </BackButton>
                <h3 className="text-lg font-bold">Post</h3>
            </header>
            {children}
            {replies}
        </div>
    )
}

export default layout