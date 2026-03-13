import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { useAuth } from "@/context/AuthProvider";


const Login = () => {
    const { setAuthUser } = useAuth();
  
  // const passwordValue = watch("password", "");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.username,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword,
    };

    try {
      const response = await api.post("/login", userInfo);
      console.log("Login success:", response.data);

      if (response.data) {
        alert("Login successful");
      }

      localStorage.setItem("messenger", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      console.log("Full error:", error);
      console.log("Error response:", error?.response);
      console.log("Error data:", error?.response?.data);

      alert(
        "Error: " + (error?.response?.data?.message || "Something went wrong"),
      );
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("messenger");
    localStorage.removeItem("user-info");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#d9e0ff] px-4 py-10">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#7f98ff]/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#89a2ff]/35 blur-3xl" />

      <div className="card relative z-10 w-full max-w-md overflow-hidden rounded-[2.1rem] bg-white shadow-[0_30px_80px_rgba(91,115,204,0.28)]">
        <div className="bg-linear-to-br from-[#5a7cff] to-[#6c8dff] px-7 pb-6 pt-7 text-white">
          <h1 className="text-3xl font-bold">Saathi Ai</h1>
          <h2 className="text-xl font-semibold tracking-tight">
            Login to your Account
          </h2>
        </div>

        <div className="card-body px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="form-control gap-1">
              <label className="label pb-0">
                <span className="label-text text-sm font-medium text-[#4a5ea9]">
                  Email
                </span>
              </label>
              <label className="input validator h-10 w-full border-[#d8e0ff] bg-[#f9fbff] text-[#2f3f85] focus-within:border-[#6f88ff]">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  {...register("email", { required: "Email is required" })}
                />
              </label>
              {errors.email && (
                <p className="text-xs text-error">{errors.email.message}</p>
              )}
            </div>

           <div className="form-control gap-1">
                <label className="label pb-0">
                  <span className="label-text text-sm font-medium text-[#4a5ea9]">
                    Password
                  </span>
                </label>
                <label className="input validator h-10 w-full border-[#d8e0ff] bg-[#f9fbff] text-[#2f3f85] focus-within:border-[#6f88ff]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[#6071b5] hover:text-[#4f73ff]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                        <path d="M9.88 5.09A9.77 9.77 0 0 1 12 4.91c5 0 9.27 3.11 11 7.5a11.76 11.76 0 0 1-4.24 5.09" />
                        <path d="M6.61 6.61A11.75 11.75 0 0 0 1 12.41a11.77 11.77 0 0 0 5 5.77" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </label>
                {errors.password && (
                  <span className="text-xs text-error">
                    {errors.password.message || "Password is required"}
                  </span>
                )}
              </div>

            <button
              type="submit"
              className="btn mt-2 w-full rounded-xl border-0 bg-[#5f80ff] text-white shadow-[0_12px_25px_rgba(95,128,255,0.45)] hover:bg-[#4f73ff]"
            >
              Login
            </button>
            <button onClick={handleClearLocalStorage} className="btn btn-secondary">
              clear local storage
            </button>

            <p className="text-center text-sm text-[#6071b5]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#4f73ff] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
