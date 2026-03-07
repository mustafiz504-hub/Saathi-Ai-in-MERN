import React from "react";
import { cn } from "@/lib/utils";

const User = ({
  name = "Molly Clark",
  image = "https://img.daisyui.com/images/profile/demo/gordon@192.webp",
  email = "molly@example.com",
  online = true,
  onClick,
  className,
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
          <img src={image} alt={name} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#2e3f85]">{name}</p>
        <p className="truncate text-xs text-[#6d7fbc]">{email}</p>
      </div>
    </button>
  );
};

export default User;
