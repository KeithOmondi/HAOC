// src/pages/VerifyOtp.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTP, resendOTP, clearAuthState } from "../../redux/slices/authSlice";

const VerifyOtp = () => {
  // useDispatch in JS infers the dispatch type
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Accessing state passed through navigation (assumes { email: string })
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { loading, error, success } = useSelector(
    (state) => state.auth
  );

  // Event handler for input change (using general event type)
  const handleChange = (e) =>
    setOtp(e.target.value);

  // Event handler for form submission (using general event type)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp || !email) {
      toast.error("Email and OTP are required.");
      return;
    }

    // Dispatch the action with the payload
    dispatch(verifyOTP({ email, otp }));
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email not found, please go back and register again.");
      return;
    }
    dispatch(resendOTP({ email }));
    setCooldown(30); // 30s cooldown set
  };

  // Countdown timer effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Handle Redux state changes (Error/Success)
  useEffect(() => {
    if (error) {
      toast.error(error);
      // Optional: Clear error state after showing toast (if your slice supports it)
    }
    if (success) {
      toast.success(success);

      // Redirect to login after successful OTP verification
      navigate("/login", { replace: true });
    }
    
    // Clear the error/success state on cleanup of this effect, 
    // but only if the component remains mounted.
    // NOTE: Relying on the final cleanup effect below is usually sufficient.
  }, [error, success, navigate]);

  // Cleanup effect: Clear Redux auth state (error/success messages) when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Verify Account
        </h2>
        
        {/* Displaying email hint if available */}
        {email && (
            <p className="text-center text-sm text-gray-600 mb-4">
                Verification code sent to: 
                <span className="font-semibold block">{email}</span>
            </p>
        )}

        <div className="mb-4">
            <label htmlFor="otp" className="sr-only">Enter OTP</label>
            <input
                id="otp"
                type="text"
                placeholder="Enter 6-Digit OTP"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                pattern="\d{6}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                required
            />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !otp || otp.length < 6}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-medium transition duration-200 
                disabled:text-gray-500 disabled:cursor-not-allowed 
                text-blue-600 hover:text-blue-800 hover:underline"
            disabled={cooldown > 0 || loading}
          >
            {cooldown > 0 ? (
                <span className="text-gray-500">
                    Resend OTP in <span className="font-bold text-red-500">{cooldown}s</span>
                </span>
            ) : (
                "Resend OTP"
            )}
          </button>
        </div>
        
        <div className="mt-8 text-center">
            <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition"
            >
                Back to Sign Up
            </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;