import React from "react";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const itsme = message.senderId === authUser?.user?._id;

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-[8%] py-1">
      <div
        className={`flex items-end gap-2 group ${
          itsme ? "justify-end" : "justify-start"
        }`}
      >
        {!itsme && (
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100">
            <img
              alt="receiver"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        )}

        <div className="max-w-[80%]">
          <div
            className={`flex items-end gap-2 px-4 py-2.5 rounded-2xl shadow-sm ${
              itsme
                ? "bg-[#ffffff] text-blue-900 rounded-br-sm border border-blue-100/50"
                : "bg-white text-gray-800 rounded-bl-sm ring-1 ring-gray-100"
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
              className={`shrink-0 text-[10px] text-right mt-1.5 flex items-center justify-end gap-1 font-medium ${
                itsme ? "text-blue-700/60" : "text-gray-400"
              }`}
            >
              <span>{formattedTime}</span>

              {itsme && (
                <span className="text-blue-600 text-[13px] leading-none mb-0.5 font-bold">
                  ✓✓
                </span>
              )}
            </div>
          </div>
        </div>

        {itsme && (
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-blue-100">
            <img
              alt="sender"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;