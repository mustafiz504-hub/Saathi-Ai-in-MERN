import useSendMessage from "@/context/useSendMessage";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const Type = () => {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-linear-to-r from-[#6f87ec] to-[#7c93ef] p-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type here"
              className="w-full rounded-xl border border-white/25 bg-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white/75 outline-none ring-0 focus:border-white/40"
            />
            <button
              type="submit"
              className="rounded-lg bg-white/20 p-3 text-white hover:bg-white/30"
              aria-label="Send message"
            >
              <IoSend className="text-base" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Type;
