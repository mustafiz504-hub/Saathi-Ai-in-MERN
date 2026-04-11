import React, { useLayoutEffect, useRef } from "react";
import Message from "./Message";
import useGetmessage from "@/context/useGetMessage.js";
import Spinner from "@/components/ui/Spinner";
const Messages = () => {
  const { messages, loading } = useGetmessage();
  const lastMsgRef = useRef();

  useLayoutEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView();
    }
  }, [messages]);

  console.log("message", messages, loading);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}

      {/* This invisible div helps auto-scroll to the bottom */}
      <div ref={lastMsgRef} />

      <div className="px-25">
        {!loading && messages.length === 0 && (
          <div className="flex h-[70vh] items-center justify-center">
            <p className="font-semibold text-sm text-gray-600">
              Say hi 👋 and start the conversation
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
