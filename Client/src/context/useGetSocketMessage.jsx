import { useEffect, useRef } from "react";
import { useSocket } from "./SocketContext.jsx";
import useConversation from "@/statemanage/useConversation.js";

const BOT_ID = "660c1e4e4e4e4e4e4e4e4e4e";

// Map bot message content → NemoEyes emotion
const detectEmotion = (text = "") => {
  const t = text.toLowerCase();

  // Check love FIRST before aw/sad patterns (bot often says "aw... pyaar ki baat")
  if (/love|pyaar|dil|❤|💕|💖/.test(t)) return "love";
  if (/hehe|haha|wohoo|mast|khush|amazing|great|bahut accha|shukriya|thank/.test(t)) return "happy";
  if (/namaste|hello|hi |hii|hey |welcome|aa gaye/.test(t)) return "glee";
  if (/dukhi|rona|kharab|bahut bura|rough tha|heavy|takleef/.test(t)) return "sad";
  if (/\baw\b/.test(t)) return "sad";
  if (/gussa|angry|frustrated|heat level|pareshaan/.test(t)) return "worried";
  if (/processing|soch|dekh|samajh|let me|try karte|solve/.test(t)) return "focused";
  if (/confused|samajh nahi|kya matlab|mujhe nahi pata/.test(t)) return "confused";
  if (/quiet mode|low energy|thaka|rest|neend/.test(t)) return "sleepy";
  if (/wow|waah|sach mein|really/.test(t)) return "surprised";
  if (/careful|dhyan|suspicious|sure hai/.test(t)) return "suspicious";
  return "neutral";
};

const useGetSocketMessage = () => {
  const { socket } = useSocket();
  const {
    messages, setMessages,
    selectedConversation,
    notifications, setNotifications,
    allUsers,
    setBotEmotion,
  } = useConversation();

  const emotionResetRef = useRef(null);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // Condition check: Kya sender wahi hai jisse main abhi baat kar raha hoon?
      if (selectedConversation && selectedConversation._id === newMessage.senderId) {
        // Option A: Haan, chat open hai. Toh message screen par add karo.
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // If message is from Nemo bot → detect emotion and animate eyes
        if (newMessage.senderId === BOT_ID) {
          const emotion = detectEmotion(newMessage.message);
          clearTimeout(emotionResetRef.current);
          setBotEmotion(emotion);
          emotionResetRef.current = setTimeout(() => setBotEmotion("neutral"), 3000);
        }
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
  }, [socket, selectedConversation, allUsers, setMessages, setNotifications, setBotEmotion]);

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

