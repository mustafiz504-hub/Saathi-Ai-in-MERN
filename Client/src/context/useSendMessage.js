import { useState } from "react";
import useConversation from "@/statemanage/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  
  const sendMessage = async (message) => {
    setLoading(true);
    if (selectedConversation && selectedConversation._id) {
      try {
        const res = await axios.post(
          `/message/send/${selectedConversation._id}`,
          { message },
          { withCredentials: true }
        );
        // Backend returns: { message: "...", newMessage: {...} }
        setMessages([...messages, res.data.newMessage]);
      } catch (error) {
        console.log("Error in Send Message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
