import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../../redux/slices/bookingSlice";
import { toast } from "react-toastify";
import { Calendar, User, Mail, Phone, MessageSquare, Key, Send, Clock } from "lucide-react";

const BookingRequestPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    propertyId: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.propertyId || !formData.name || !formData.email || !formData.date || !formData.startTime || !formData.endTime) {
      return toast.error("Please fill in all required fields (marked with *).");
    }

    try {
      setLoading(true);
      await dispatch(createBooking(formData)).unwrap();
      toast.success("Booking request submitted successfully! We'll be in touch soon.");
      setFormData({
        propertyId: "",
        name: "",
        email: "",
        phone: "",
        message: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (err) {
      const errorMessage = err?.data?.message || err.message || "Failed to submit booking request.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <section className="min-h-[calc(100vh-100px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-3xl">
          
          <div className="text-center mb-8">
            <Calendar size={36} className="text-blue-600 mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-gray-900">
              Schedule a Viewing
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Fill out the form below to request a booking for the property.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Property ID */}
              <div className="md:col-span-2">
                <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Key size={16} className="text-gray-400" /> Property ID *
                </label>
                <input
                  type="text"
                  id="propertyId"
                  name="propertyId"
                  value={formData.propertyId}
                  onChange={handleChange}
                  placeholder="e.g., 61c8b8f36f..."
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  required
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <User size={16} className="text-gray-400" /> Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" /> Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" /> Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 555 123 4567"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" /> Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  required
                />
              </div>

              {/* Start Time */}
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" /> Start Time *
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  required
                />
              </div>

              {/* End Time */}
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" /> End Time *
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  required
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-400" /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I would like to know about..."
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                  rows={4}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md ${
                loading ? "opacity-70 cursor-not-allowed bg-blue-500" : "hover:bg-blue-700 transform hover:scale-[1.005]"
              }`}
            >
              <Send size={20} />
              {loading ? "Sending Request..." : "Submit Booking Request"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default BookingRequestPage;
