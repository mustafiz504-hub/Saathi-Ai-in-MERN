# Saathi Ai - Real-Time Chat Application

Saathi Ai is a premium, full-stack real-time chat application built using the MERN stack. It features a modern, responsive interface with real-time communication capabilities inspired by industry-leading messaging platforms.

## 🚀 Key Features

- **Real-Time Messaging:** Fully integrated with Socket.io for instantaneous message delivery.
- **User Authentication:** Secure authentication using JWT and support for **Google OAuth**.
- **Online/Offline Status:** Real-time tracking of active users.
- **Typing Indicators:** Visual feedback when a user is typing a message.
- **Advanced Search:** Live user filtering by name or email within the sidebar.
- **Notifications:** In-app notification badges, browser taskbar badges (App Badging API), and audio alerts.
- **Premium UI/UX:** Built with a modern aesthetic using Tailwind CSS and Framer Motion for smooth transitions.
- **Message Management:** Detailed timestamps and support for profile picture fallbacks.

## 🛠️ Tech Stack

### Frontend
- **React.js & Vite:** For a fast and responsive user interface.
- **Zustand:** Lightweight and scalable state management.
- **Tailwind CSS & DaisyUI:** For modern, modular, and customized styling.
- **Framer Motion:** For micro-animations and smooth UI transitions.
- **Axios:** For handling asynchronous API requests.
- **Socket.io-Client:** For real-time bi-directional communication.

### Backend
- **Node.js & Express.js:** Scalable server-side architecture.
- **MongoDB & Mongoose:** NoSQL database for flexible data modeling and persistence.
- **Socket.io:** Powering real-time updates and notifications.
- **JWT (JSON Web Token):** For secure and stateless authentication.

## 📁 Project Structure

```text
├── client/          # React frontend with Vite
└── server/          # Node/Express backend with Socket.io
```

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mustafiz504-hub/Saathi-Ai-in-MERN.git
   ```

2. **Frontend Setup:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   ```bash
   cd server
   npm install
   npm start
   ```

---
Built with ❤️ for a seamless communication experience.