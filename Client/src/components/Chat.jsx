import Left from "@/Home/left/Left";
import Logout from "@/Home/left1/Logout";
import Right from "@/Home/right/Right";
import React from "react";
import Signup from "./Signup";
import Login from "./Login";
// import { useAuth } from "../context/AuthProvider";

const Chat = () => {
  // const { authUser } = useAuth();
  // console.log(authUser);

  return (
    <>
      {/* <div className="h-screen w-screen overflow-hidden bg-[#d9e0ff]">
        <div className="flex h-full w-full overflow-hidden bg-white">
          <aside className="flex h-full w-[30%] min-w-[280px] border-r border-[#e7ecff] bg-[#f7f9ff]">
            <div className="flex h-full w-[12%] min-w-10 flex-col items-center justify-end border-r border-[#e7ecff] px-1 py-4">
              <Logout />
            </div>
            <div className="min-h-0 flex-1 p-4">
              <Left />
            </div>
          </aside>
          <main className="h-full flex-1">
            <Right />
          </main>
        </div>
      </div> */}
      <Signup />
      <Login />
    </>
  );
};

export default Chat;
