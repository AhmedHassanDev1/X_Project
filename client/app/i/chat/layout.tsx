
import "./chat.css"

import AsideBar from "@/components/layout/asidebar/asideBar";
import ConversationContainer from "@/components/ui/chat/ConversationContainer";


function layout({
    children,
}: Readonly<{
    children: React.ReactNode;

}>) {
    return (
        <div className="w-screen  max-w-5xl h-screen grid grid-cols-[1fr_1.7fr] md:grid-cols-[min-content_1fr_1.7fr] divide-x-[1px] divide-zinc-700  ">
            {/* aside bar*/}
            <AsideBar />
            <ConversationContainer />
            {children}
            <div className=""></div>
        </div>
    )
}

export default layout