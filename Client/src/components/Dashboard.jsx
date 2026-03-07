import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getUserInfo() {
  try {
    const data = localStorage.getItem("user-info");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const Dashboard = () => {
  const [userInfo] = useState(getUserInfo);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };

  const outer = cn(
    "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#d9e0ff] px-4 py-10",
    "before:absolute before:-left-24 before:top-10 before:h-72 before:w-72 before:rounded-full before:bg-[#7f98ff]/35 before:blur-3xl",
    "after:absolute after:-right-20 after:-bottom-10 after:h-80 after:w-80 after:rounded-full after:bg-[#89a2ff]/35 after:blur-3xl",
  );
  const card = cn(
    "relative z-10 mx-auto w-full max-w-sm overflow-hidden rounded-[2.25rem]",
    "bg-white shadow-[0_30px_80px_rgba(91,115,204,0.28)]",
  );

  const HandleRedirectChat = () => {
    navigate("/chat");
  };

  return (
    <div className={outer}>
      <div className={card}>
        <div className="rounded-b-[1.8rem] bg-gradient-to-br from-[#5a7cff] to-[#6c8dff] px-6 pb-7 pt-6 text-white">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/90">
              Dashboard
            </p>
            <Avatar className="h-9 w-9 border border-white/35">
              <AvatarImage src={userInfo?.profilePic} alt={userInfo?.email || "User"} />
              <AvatarFallback className="bg-white/30 text-white">
                {userInfo?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {userInfo?.name || "User"}
          </h1>
          <p className="mt-1 text-sm text-white/80">Ready to continue your chat?</p>
        </div>

        <div className="px-6 pb-6 pt-5">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-[#f4f7ff] p-3">
            <Avatar className="h-11 w-11 border border-[#d8e0ff]">
              <AvatarImage src={userInfo?.profilePic} alt={userInfo?.email || "User"} />
              <AvatarFallback className="bg-[#dfe7ff] text-[#3553c7]">
                {userInfo?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#314189]">
                {userInfo?.name || "User"}
              </p>
              <p className="truncate text-xs text-[#6071b5]">{userInfo?.email || "Not available"}</p>
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-[#e3e9ff] bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8b9ad3]">
              Account
            </p>
            <h3 className="mt-2 text-base font-semibold text-[#2f3f85]">
              Welcome, {userInfo?.name || "User"}
            </h3>
            <p className="mt-1 text-sm text-[#6f7fb8]">
              Signed in with Google account and ready to jump into conversation.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              onClick={HandleRedirectChat}
              className="h-11 rounded-xl bg-[#5f80ff] text-white shadow-[0_12px_25px_rgba(95,128,255,0.45)] hover:bg-[#4f73ff]"
            >
              Continue to Chat
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleLogout}
              className="h-10 rounded-xl text-[#5a70c1] hover:bg-[#eef2ff] hover:text-[#445db5]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
