import React from "react";
import { cn } from "@/lib/utils";

const User = ({
  user,
  onClick,
  className,
  online = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex cursor-pointer w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-sm transition hover:bg-[#f3f6ff]",
        className,
      )}
    >
      <div className={cn("avatar", online ? "avatar-online" : "avatar-offline")}>
        <div className="w-12 rounded-full">
          <img src={user.profilePic || "https://i.pinimg.com/736x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"} alt={user.name} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#2e3f85]">{user.name}</p>
        <p className="truncate text-xs text-[#6d7fbc]">{user.email}</p>
      </div>
    </button>
  );
};

export default User;
