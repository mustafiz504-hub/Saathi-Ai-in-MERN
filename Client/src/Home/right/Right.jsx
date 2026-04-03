import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import backgroundImage from "../../assets/images/background/ChatGPT Image Mar 28, 2026, 01_55_23 PM.png";

import useConversation from "@/statemanage/useConversation";
import { useAuth } from "@/context/AuthProvider";

const Right = () => {
  const { selectedConversation, setselectedConversation } = useConversation();

  useEffect(() => {
    // Unmount work (cleanup)
    return () => {
      setselectedConversation(null);
    };
  }, [setselectedConversation]);

  return (
    <div
      className="flex h-full flex-col border border-[#e8edff] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <Type />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuth();
  console.log("authUser", authUser);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-600">
          Welcome <span className="text-blue-500">{authUser?.user?.name}</span>
        </h2>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
};


export default Right;
