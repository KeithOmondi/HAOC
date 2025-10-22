import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile, updateAdminProfile, clearAdminState } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";
import { Loader2, CheckCircle } from "lucide-react";

const AdminSettings = () => {
  const dispatch = useDispatch();
  const { admin, loading, error, success } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch admin profile on mount
  useEffect(() => {
    dispatch(fetchAdminProfile());

    return () => dispatch(clearAdminState());
  }, [dispatch]);

  // Update form data when admin data loads
  useEffect(() => {
    if (admin) {
      setFormData((prev) => ({
        ...prev,
        name: admin.name || "",
        email: admin.email || "",
      }));
    }
  }, [admin]);

  // Handle notifications for error/success
  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
    if (success) {
      toast.success(success);
      setIsSubmitting(false);
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" })); // clear password fields
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    const updates = {
      name: formData.name,
      email: formData.email,
      ...(formData.password ? { password: formData.password } : {}),
    };

    dispatch(updateAdminProfile(updates));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Settings</h1>

        {loading && !isSubmitting ? (
          <div className="flex justify-center items-center py-10 text-indigo-600">
            <Loader2 className="animate-spin mr-3" size={24} /> Loading profile...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Admin Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password (optional)"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-400"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin mr-2" />
                ) : (
                  <CheckCircle size={20} className="mr-2" />
                )}
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
