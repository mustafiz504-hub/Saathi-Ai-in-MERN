import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";


const Right = () => {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e8edff] bg-[#fcfdff]">
      <Chatuser />
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>
      <Type />
    </div>
  );
};

export default Right;
