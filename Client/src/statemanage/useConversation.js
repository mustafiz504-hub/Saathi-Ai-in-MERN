import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setselectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) =>
    set((state) => ({
      messages: typeof messages === "function" ? messages(state.messages) : messages,
    })),

  // --- Step 1: Notifications State Add Karo ---
  notifications: [],
  setNotifications: (notifications) =>
    set((state) => ({
      notifications:
        typeof notifications === "function"
          ? notifications(state.notifications)
          : notifications,
    })),
  
  // All Users mapping for notifications
  allUsers: [],
  setAllUsers: (allUsers) => set({ allUsers }),
  // --------------------------------------------
}));

export default useConversation;
