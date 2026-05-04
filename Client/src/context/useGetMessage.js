import useConversation from "@/statemanage/useConversation.js";
import { useEffect, useState } from "react";
import axios from "axios";

const useGetmessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const BACKEND_URL = import.meta.env.PROD ? "" : "http://127.0.0.1:8080";
          const response = await axios.get(
            `${BACKEND_URL}/message/get/${selectedConversation._id}`,
            { withCredentials: true },
          );
          const data = response.data;
          setMessages(Array.isArray(data) ? data : data.messages || []);
        } catch (error) {
          console.log("Error in Get Message:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMessage();
  }, [selectedConversation, setMessages]);
  return {
    messages,
    loading,
  };
};

export default useGetmessage;
