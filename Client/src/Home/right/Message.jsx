import React from "react";

const Message = () => {
  return (
    <>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-info rounded">
          Calm down, Anakin.
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-neutral">It's insulting!</div>
      </div>
    </>
  );
};

export default Message;
