import React from "react";
import Search from "./Search";
import User from "./User";
import useGetAllUsers from "@/context/useGetAllUsers";
import Logout from "../../components/Logout";
import { useAuth } from "@/context/AuthProvider";

import useGetSocketMessage from "@/context/useGetSocketMessage";

const Left = () => {
  useGetSocketMessage();
  const [allUsers, loading] = useGetAllUsers();
  const [search, setSearch] = React.useState("");
  const { authUser } = useAuth();

  // Search logic: Filter users based on fullname or name
  const filteredUsers = allUsers?.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.fullname?.toLowerCase().includes(term) ||
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-2xl bg-linear-to-br from-[#5a7cff] to-[#6c8dff] p-4 text-white">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/85 uppercase">
              {authUser?.user?.name || "Messages"}
            </p>
            <h2 className="mt-2 text-xl font-semibold">Chats</h2>
          </div>
          <Logout />
        </div>
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
        {/* Nemo AI Bot Section */}
        {!loading && (
          <div className="mb-4">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Assistant</p>
            {allUsers?.find(u => u.isBot) && (
              <User 
                user={allUsers.find(u => u.isBot)} 
                setSearch={setSearch} 
                className="bg-blue-50 border border-blue-100 hover:bg-blue-100 shadow-sm"
              />
            )}
          </div>
        )}

        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contacts</p>
        
        {loading ? (
          <div className="flex justify-center p-4 text-white/50 text-sm italic">
            Loading users...
          </div>
        ) : filteredUsers?.length > 0 ? (
          filteredUsers
            .filter(user => !user.isBot) // Don't show bot in regular list if already shown at top
            .map((user, index) => (
              <User key={user._id || index} user={user} setSearch={setSearch} />
            ))
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center px-6 py-10 text-center">
            <div className="mb-3 text-3xl">🔍</div>
            <p className="text-base font-semibold text-gray-700">
              User not found
            </p>
            <span className="mt-1 text-sm text-gray-400">
              Try searching with another name
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Left;
