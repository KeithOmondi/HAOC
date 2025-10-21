import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { loginUser, clearAuthState } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Clear auth state ONLY once when the component first mounts
  useEffect(() => {
    dispatch(clearAuthState());
    // eslint-disable-next-line
  }, []);

  // 🔹 Submit login form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  // 🔹 Role-based redirect after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success(`Welcome back, ${user.name || user.email}!`);

      const redirectTimer = setTimeout(() => {
        let redirectPath = "/user/dashboard";

        if (user.role === "Admin") redirectPath = "/admin/dashboard";
        else if (user.role === "Agent") redirectPath = "/agent/dashboard";

        navigate(redirectPath, { replace: true });
      }, 800);

      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, user, navigate]);

  // 🔹 Handle login errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <LogIn size={40} className="text-blue-600 mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-lg shadow-lg transition duration-200 transform hover:scale-[1.005] ${
              loading
                ? "bg-blue-400 cursor-not-allowed opacity-80"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-sm text-center mt-6 space-y-2">
          <p className="text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
          <a
            href="/forgot-password"
            className="text-xs text-gray-500 hover:text-blue-600 hover:underline block"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
