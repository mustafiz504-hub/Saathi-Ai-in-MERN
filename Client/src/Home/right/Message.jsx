import React from "react";
import useConversation from "@/statemanage/useConversation";
import nemoDp from "@/assets/nemo_no_dots_dp.svg";

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const itsme = message.senderId === authUser?.user?._id;

  // Fallback Profile Pic URL
  const fallbackPic = "https://i.pinimg.com/736x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg";

  // Real profile pics nikalo (with fallback)
  const chatUserProfilePic = selectedConversation?.isBot
    ? nemoDp
    : (selectedConversation?.profilePic || fallbackPic);
  const myProfilePic = authUser?.user?.profilePic || fallbackPic;

  // Time format karne ka function
  const getFormattedTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formattedTime = getFormattedTime(message.createdAt);

  return (
    <div className="px-[8%] py-1">
      <div
        className={`group flex items-end gap-2 ${
          itsme ? "justify-end" : "justify-start"
        }`}
      >
        {/* Receiver Profile Pic (Left side) */}
        {!itsme && (
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-100 shadow-sm">
            <img
              alt="receiver"
              src={chatUserProfilePic}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        )}

        <div className="max-w-[80%]">
          <div
            className={`flex items-end gap-2 rounded-2xl px-4 py-2.5 shadow-sm ${
              itsme
                ? "rounded-br-sm border border-blue-100/50 bg-[#ffffff] text-blue-900"
                : "rounded-bl-sm bg-white text-gray-800 ring-1 ring-gray-100"
            }`}
          >
            <p
              className={`text-sm leading-relaxed break-words ${
                itsme ? "text-slate-800" : "text-gray-800"
              }`}
              style={{ wordBreak: "break-word" }}
            >
              {message.message}
            </p>

            <div
              className={`mt-1.5 flex shrink-0 items-center justify-end gap-1 text-right text-[10px] font-medium ${
                itsme ? "text-blue-700/60" : "text-gray-400"
              }`}
            >
              <span>{formattedTime}</span>

              {itsme && (
                <span className="mb-0.5 text-[13px] font-bold leading-none text-blue-600">
                  ✓✓
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sender Profile Pic (Right side) */}
        {itsme && myProfilePic && (
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-blue-100 shadow-sm">
            <img
              alt="sender"
              src={myProfilePic}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;