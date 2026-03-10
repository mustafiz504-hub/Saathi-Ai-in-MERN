import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Chat from "./components/Chat";

const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="578545012124-hjbsk8rnmnth65sev1oon49patvodqk3.apps.googleusercontent.com">
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
};

const PrivateRoute = ({ element }) => {
  const user = localStorage.getItem("user-info");
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<GoogleAuthWrapper />} /> */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        {/* <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        /> */}
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;