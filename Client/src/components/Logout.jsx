import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import baseURL from "@/../api"; // Use @ alias to reach Client root safely
import Cookies from "js-cookies";
import { useAuth } from "@/context/AuthProvider";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await baseURL.post("/logout");
      localStorage.removeItem("messenger");
      Cookies.removeItem("jwt");
      setAuthUser(null); // Clear auth state to trigger redirect
      alert("Logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
      alert("Error logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-[#ff5a66] text-white transition hover:bg-[#ff3f4e] hover:shadow-md disabled:bg-gray-400"
      aria-label="Logout"
    >
      <BiLogOut size={18} />
    </button>
  );
};

export default Logout;
