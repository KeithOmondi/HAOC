// src/components/Auth/Signup.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthState } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Lock, Users, UserPlus, Loader2 } from "lucide-react"; // Import icons

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User", // default role
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle registration submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    dispatch(register(formData));
  };

  // Handle success/error messages
  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Registration successful! Please verify your account.");
      // Navigate to OTP verification page, passing email in state
      navigate("/verify-otp", { state: { email: formData.email } }); 
    }

    return () => {
      dispatch(clearAuthState());
    };
  }, [error, success, navigate, dispatch, formData.email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        
        {/* Header Block */}
        <div className="text-center mb-8">
            <UserPlus size={40} className="text-blue-600 mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
        </div>

        <div className='space-y-5'>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a strong password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Role (optional dropdown) */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Register As
              </label>
              <div className="relative">
                <Users size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                >
                  <option value="User">Standard User (Looking to buy/rent)</option>
                  <option value="Agent">Property Agent (Listing properties)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl text-white font-bold text-lg shadow-lg transition duration-200 transform hover:scale-[1.005] ${
            loading
              ? "bg-blue-400 cursor-not-allowed opacity-80"
              : "bg-blue-600 hover:bg-blue-700"
          } flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Registering...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Redirect to Login */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;