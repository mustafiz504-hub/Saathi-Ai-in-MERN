import React from "react";
import Search from "./Search";
import User from "./User";
import useGetAllUsers from "@/context/useGetAllUsers";
import Logout from "../left1/Logout";

const Left = () => {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-2xl bg-linear-to-br from-[#5a7cff] to-[#6c8dff] p-4 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/85">MESSAGES</p>
            <h2 className="mt-2 text-xl font-semibold">Chats</h2>
          </div>
          <Logout />
        </div>
        <Search />
      </div>

      <div className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
        {loading ? (
          <div className="flex justify-center p-4 text-white/50 text-sm italic">Loading users...</div>
        ) : (
          allUsers?.map((user, index) => (
            <User key={user._id || index} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default Left;
