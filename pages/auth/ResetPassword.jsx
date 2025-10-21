// src/pages/auth/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/slices/authSlice";

const ResetPassword = () => {
  // useParams extracts the URL parameter (e.g., from /reset-password/TOKEN)
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Note: This password validation relies on the backend validation too, 
    // but client-side is faster for user experience.
    if (password.length < 8 || password.length > 16) {
      toast.error("Password must be 8-16 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing token. Please use the link from your email.");
      return;
    }

    // Dispatch the action with the required data
    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      // Redirect to login after successful password reset
      navigate("/login");
    }
    if (error) {
        toast.error(error);
        // If there's an error (e.g., token expired), you might want to redirect 
        // them back to forgot password or login after showing the error.
    }
  }, [success, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl px-8 pt-6 pb-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
          Reset Password
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
            Enter your new password below.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            placeholder="Enter new password (8-16 chars)"
            minLength={8}
            maxLength={16}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token || password !== confirmPassword || password.length < 8}
          className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;