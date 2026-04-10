import { useEffect } from "react";
import { useSocket } from "./SocketContext.jsx";
import useConversation from "@/statemanage/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useGetSocketMessage;
