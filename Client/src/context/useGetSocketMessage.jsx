import { useEffect } from "react";
import { useSocket } from "./SocketContext.jsx";
import useConversation from "@/statemanage/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useSocket();
  const { messages, setMessages, selectedConversation, notifications, setNotifications, allUsers } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // Condition check: Kya sender wahi hai jisse main abhi baat kar raha hoon?
      if (selectedConversation && selectedConversation._id === newMessage.senderId) {
        // Option A: Haan, chat open hai. Toh message screen par add karo.
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        // Option B: Nahi, chat band hai. Toh notification mein daalo.
        setNotifications((prevNotifications) => [...prevNotifications, newMessage]);

        // Sender ka naam dhundo allUsers list mein se
        const sender = allUsers.find((u) => u._id === newMessage.senderId);
        const senderName = sender ? sender.fullname || sender.name : "New Message";

        // Browser notification popup (Isme OS ka default sound bajega)
        if (Notification.permission === "granted") {
          new Notification(senderName, {
            body: newMessage.message,
            icon: sender?.profilePic || "/Saathi logo .jpeg",
          });
        }

        // Tab title flash
        document.title = `New Message | Saathi Ai`;
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, selectedConversation, allUsers, setMessages, setNotifications]);

  useEffect(() => {
    // browser taskbar/icon badge update (Edge/Chrome support)
    const count = notifications.length;
    if (navigator.setAppBadge) {
      if (count > 0) {
        navigator.setAppBadge(count).catch((err) => console.log("Error setting badge:", err));
      } else {
        navigator.clearAppBadge().catch((err) => console.log("Error clearing badge:", err));
      }
    }
  }, [notifications]);
}

export default useGetSocketMessage;
