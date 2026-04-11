import React from "react";
import { cn } from "@/lib/utils";
import useConversation from "@/statemanage/useConversation";
import { useSocket } from "@/context/SocketContext";

const User = ({ user, onClick, className, setSearch }) => {
  // 1. notifications aur setNotifications ko nikalo
  const { selectedConversation, setselectedConversation, notifications, setNotifications } = useConversation();
  const isSelected = selectedConversation?._id === user?._id;

  const { onlineUsers, typingUsers } = useSocket();
  const isOnline = onlineUsers.includes(user._id);
  const isTyping = typingUsers?.[user._id];

  // 2. Iss specific user ke notifications count karo
  const unreadMessages = notifications.filter(n => n.senderId === user._id);
  const unreadCount = unreadMessages.length;

  const handleSelectUser = () => {
    setselectedConversation(user);
    // 3. Jab user par click ho, toh uske notifications clear kar do
    const remainingNotifications = notifications.filter(n => n.senderId !== user._id);
    setNotifications(remainingNotifications);
    document.title = "Saathi Ai";
    setSearch?.(""); // Clear search bar
    onClick?.();
  };

  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors",
        isSelected ? "bg-[#577eff]" : "bg-white hover:bg-[#e6ecff]",
        className,
      )}
      onClick={handleSelectUser}
    >
      <div className={cn("avatar", isOnline ? "avatar-online" : "avatar-offline")}>
        <div className="w-12 rounded-full relative">
          <img
            src={user.profilePic || "https://i.pinimg.com/736x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"}
            alt={user.fullname || user.name}
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-bold", isSelected ? "text-white" : "text-gray-800")}>
          {user.fullname || user.name}
        </p>

        <p className={cn("truncate text-xs font-medium", isTyping ? (isSelected ? "text-green-100" : "text-green-600") : isSelected ? "text-white/80" : isOnline ? "text-green-600" : "text-gray-500")}>
          {isTyping ? "Typing..." : isOnline ? "Online" : user.email}
        </p>
      </div>

      {/* 4. Notification Badge UI */}
      {unreadCount > 0 && !isSelected && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-lg ring-2 ring-white">
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default User;
