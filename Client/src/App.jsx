import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./Home/left1/Logout";
import Left from "./Home/left/Left";
import Right from "./Home/right/Right";
import { useAuth } from "./context/AuthProvider";

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
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<GoogleAuthWrapper />} /> */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        {/* <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        /> */}
        <Route
          path="/"
          element={
            authUser ? (
              <div className="h-screen w-screen overflow-hidden bg-[#d9e0ff]">
                <div className="flex h-full w-full overflow-hidden bg-white">
                  <aside className="flex h-full w-[30%] min-w-[280px] border-r border-[#e7ecff] bg-[#f7f9ff]">
                    <div className="flex h-full w-[12%] min-w-10 flex-col items-center justify-end border-r border-[#e7ecff] px-1 py-4">
                      <Logout />
                    </div>
                    <div className="min-h-0 flex-1 p-4">
                      <Left />
                    </div>
                  </aside>
                  <main className="h-full flex-1">
                    <Right />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={ authUser? <Navigate to="/" /> :  <Signup />} />
        <Route path="/login" element={ authUser? <Navigate to="/" /> :  <Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );  
};

export default App;
