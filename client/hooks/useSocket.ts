"use client"

import { ChatSocketContext } from "@/components/provider/ChatSocketProvider";
import { useContext } from "react";


export default function useSocket(nameSpace: string = "")  {
    const ChatSocket = () => useContext(ChatSocketContext);
    
      
    switch (nameSpace) {
        case "chat":
            return ChatSocket()
        default:
            return null;
    }
}