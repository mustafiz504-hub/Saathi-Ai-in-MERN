import useConversation from "@/statemanage/useConversation";
import { useSocket } from "@/context/SocketContext";
import BotEyeAvatar from "../../components/BotEyeAvatar";

const Chatuser = () => {
  const { selectedConversation } = useConversation();
  console.log("Chatuser", selectedConversation);
   const { onlineUsers, typingUsers } = useSocket();
   const isOnline = onlineUsers.includes(selectedConversation?._id) || selectedConversation?.isBot;
   const isTyping = typingUsers?.[selectedConversation?._id];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-sm cursor-pointer transition-colors hover:bg-white text-black">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-10 rounded-full flex items-center justify-center">
            {selectedConversation?.isBot ? (
              <BotEyeAvatar 
                mood={isTyping ? "thinking" : "idle"} 
                size="w-10 h-10" 
              />
            ) : (
              <img
                src={
                  selectedConversation?.profilePic ||
                  "https://i.pinimg.com/736x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"
                }
                alt=""
              />
            )}
          </div>
        </div>

        <div>
          <h1 className="text-base font-bold text-gray-800">
            {selectedConversation?.fullname ||
              selectedConversation?.name ||
              " "}
          </h1>
          <p
            className={`text-xs font-medium ${isTyping ? "text-green-600 animate-pulse" : isOnline ? "text-green-500" : "text-gray-500"}`}
          >
            {isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatuser;
