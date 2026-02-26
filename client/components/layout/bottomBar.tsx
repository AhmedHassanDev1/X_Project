import ChatItem from "./asidebar/ChatItem"
import HomeItems from "./asidebar/Homeitems"


function bottomBar() {
  return (
    <nav className="w-full fixed bottom-0 p-3 md:hidden flex justify-between items-center bg-black">
        <HomeItems/>
        <ChatItem/>
    </nav>
  )
}

export default bottomBar