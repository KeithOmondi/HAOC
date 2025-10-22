// src/pages/auth/ForgotPassword.jsx
import { forgotPassword } from "../../redux/slices/authSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  // useDispatch without generics in JS
  const dispatch = useDispatch();
  
  // useSelector without generics in JS
  const { loading, success, error } = useSelector((state) => state.auth);

  // useState without type annotation in JS
  const [email, setEmail] = useState("");

  // Handler without generic event type in JS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Dispatch the action with the email payload
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    // Handle success
    if (success) {
      toast.success(success);
      // Optional: Clear the success state here if your slice provides a cleanup action
      // dispatch(clearAuthSuccess());
    }
    
    // Handle error
    if (error) {
      toast.error(error);
      // Optional: Clear the error state here if your slice provides a cleanup action
      // dispatch(clearAuthError());
    }
  }, [success, error]); // Depend on success and error

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
          Forgot Password
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a password reset link.
        </p>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending Email..." : "Send Reset Link"}
        </button>
        
        <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-blue-600 hover:underline">
                Back to Login
            </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;