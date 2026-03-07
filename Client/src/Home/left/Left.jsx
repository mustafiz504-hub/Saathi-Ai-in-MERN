import React from "react";
import Search from "./Search";
import User from "./User";

const Left = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-2xl bg-gradient-to-br from-[#5a7cff] to-[#6c8dff] p-4 text-white">
        <p className="text-xs tracking-[0.2em] text-white/85">MESSAGES</p>
        <h2 className="mt-2 text-xl font-semibold">Chats</h2>
        <Search />
      </div>

      <div className="mt-4 h-full space-y-2 overflow-y-auto pr-1">
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};

export default Left;
