import React from "react";
import { cn } from "@/lib/utils";
import useConversation from "@/statemanage/useConversation";

const User = ({
  user,
  onClick,
  className,
  online = false,
}) => {
  const { selectedConversation, setselectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user?._id;

  return (
    <div
      className={cn(
        "flex cursor-pointer w-full items-center gap-3 rounded-xl p-3",
        isSelected ? "bg-[#577eff]" : "bg-white hover:bg-[#e6ecff]",
        className
      )}
      onClick={() => setselectedConversation(user)}
    >
      <div className={cn("avatar", online ? "avatar-online" : "avatar-offline")}>
        <div className="w-12 rounded-full">
          <img
            src={
              user.profilePic ||
              "https://i.pinimg.com/736x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"
            }
            alt={user.fullname || user.name}
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-bold", isSelected ? "text-[#ffffff]" : "text-gray-700")}>
          {user.fullname || user.name}
        </p>
        <p className={cn("truncate text-xs", isSelected ? "text-[#ffffff]" : "text-gray-700")}>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default User;
