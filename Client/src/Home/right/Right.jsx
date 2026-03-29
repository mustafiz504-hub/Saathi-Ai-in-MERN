import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import backgroundImage from "../../assets/images/background/ChatGPT Image Mar 28, 2026, 01_58_18 PM.png";

const Right = () => {
  return (
    <div 
      className="flex h-full flex-col rounded-2xl border border-[#e8edff] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Chatuser />
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>
      <Type />
    </div>
  );
};

export default Right;
