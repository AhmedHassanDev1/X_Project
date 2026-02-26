"use client"
import { useAppSelector } from "@/store/store";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type ChatSocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

export const ChatSocketContext = createContext<ChatSocketContextType>({
  socket: null,
  isConnected: false,
});

export const ChatSocketProvider = ({ children }: { children: ReactNode, }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?._id;

  useEffect(() => {
     
    if (!user) return;
    


    const s = io(`${process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL}/chat`, {
      query: { user_id: userId },
      auth: { user_id: userId }
    });

    s.on("connect", () => {
      setSocket(s);
      setIsConnected(true)
    });
    s.on("disconnect", () => setIsConnected(false));
    return () => {
      s.disconnect();
    };
  }, [user]);

  return (
    <ChatSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </ChatSocketContext.Provider>
  );
};

// Hook للاستخدام في أي component
