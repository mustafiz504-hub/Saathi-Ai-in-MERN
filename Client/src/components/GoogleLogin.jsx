import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../api";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        console.log(result);
        const { email, name, profilePic } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, profilePic, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
        console.log("User data:", result.data.user);
        console.log("Token:", token);
      }
    } catch (err) {
      console.error("error while requesting google code", err);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: responseGoogle,
    onError: (error) => console.log(error),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-600 text-center mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in with your Google account to continue
        </p>

        <button
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fbbc05"
              d="M43.6 20.5H42V20H24v8h11.3C34.7 33.3 30 36 24 36c-7 0-12.7-5.7-12.7-12.7S17 10.7 24 10.7c3.2 0 6 .9 8.1 2.6l5.7-5.7C34.6 4.8 29.6 3 24 3 12.9 3 3.7 12.2 3.7 23.3S12.9 43.7 24 43.7c11 0 20-8 20-20.2 0-1.4-.1-2.6-.4-3z"
            />
            <path
              fill="#ea4335"
              d="M6.3 14.7l6.6 4.8C14.7 17.1 18.9 14 24 14c3.2 0 6 .9 8.1 2.6l5.7-5.7C34.6 4.8 29.6 3 24 3 17.7 3 12.1 6.6 9.2 11.1z"
            />
            <path
              fill="#34a853"
              d="M24 43.7c5.6 0 10.6-1.9 14.3-5.2L31.4 33c-2.1 1.7-4.9 2.7-7.4 2.7-6 0-10.7-2.7-13.4-7l-6.6 4.8C6.3 36.9 14.3 43.7 24 43.7z"
            />
            <path
              fill="#4285f4"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.6-3 4.7-5.6 6.1l8.1 6.2C40.9 37.6 46 30.7 46 23.5 46 22 45.7 21 43.6 20.5z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default GoogleLogin;
