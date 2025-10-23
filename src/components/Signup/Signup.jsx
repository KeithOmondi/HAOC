import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, clearAuthState } from "../../redux/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Basic client-side validation for minimum password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    dispatch(
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthState());
    }

    if (success && !error) {
      toast.success(success);

      // ✅ Navigate to OTP page with email preserved in state
      navigate("/verify-otp", { state: { email: formData.email } });

      // Cleanup after a small delay to avoid resetting before OTP page loads
      setTimeout(() => dispatch(clearAuthState()), 800);
    }
  }, [error, success, navigate, formData.email, dispatch]);

  return (
    // Background: Lighter, modern gradient
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Form Container: Bigger shadow, more rounded corners */}
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 sm:p-10 space-y-7 border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Join Us! 🚀
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Create your account to get started.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              onChange={handleChange}
              value={formData.name}
              placeholder="John Doe"
              // Refined input styling with focus color
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-600 focus:border-cyan-600 text-gray-900 placeholder-gray-400 text-base transition"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={handleChange}
              value={formData.email}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-600 focus:border-cyan-600 text-gray-900 placeholder-gray-400 text-base transition"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              minLength={6}
              onChange={handleChange}
              value={formData.password}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-600 focus:border-cyan-600 text-gray-900 placeholder-gray-400 text-base transition"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 6 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-600 focus:border-cyan-600 text-gray-900 placeholder-gray-400 text-base transition"
              disabled={loading}
            />
          </div>

          {/* Submit button: Teal color with loading state animation */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition duration-300 ease-in-out ${
              loading
                ? "bg-cyan-500 cursor-not-allowed flex items-center justify-center"
                : "bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 font-semibold hover:underline hover:text-cyan-700 transition duration-150"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;