import React from "react";
import { IoSend } from "react-icons/io5";

const Type = () => {
  return (
    <>
      <div className="bg-linear-to-r from-[#6f87ec] to-[#7c93ef] p-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="w-full rounded-xl border border-white/25 bg-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/75 outline-none ring-0 focus:border-white/40"
          />
          <button
            type="button"
            className="rounded-lg bg-white/20 p-3 text-white hover:bg-white/30"
            aria-label="Send message"
          >
            <IoSend className="text-base" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Type;
