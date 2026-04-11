import useSendMessage from "@/context/useSendMessage";
import { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useSocket } from "@/context/SocketContext";
import useConversation from "@/statemanage/useConversation";
import { useAuth } from "@/context/AuthProvider";

const Type = () => {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const { selectedConversation } = useConversation();
  const { authUser } = useAuth();
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (socket && selectedConversation && authUser) {
      // Emit typing event
      socket.emit("typing", {
        senderId: authUser.user._id,
        receiverId: selectedConversation._id,
      });

      // Clear existing timeout
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      // Set timeout to emit stopTyping
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", {
          senderId: authUser.user._id,
          receiverId: selectedConversation._id,
        });
      }, 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    if (socket && selectedConversation && authUser) {
      socket.emit("stopTyping", {
        senderId: authUser.user._id,
        receiverId: selectedConversation._id,
      });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }

    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-linear-to-r from-[#6f87ec] to-[#7c93ef] p-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              placeholder="Type here"
              className="w-full rounded-xl border border-white/25 bg-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/75 outline-none ring-0 focus:border-white/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-white/20 p-3 text-white hover:bg-white/30 disabled:opacity-50"
              aria-label="Send message"
            >
              <IoSend className="text-base" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Type;
