// src/pages/User/UserBookingsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserBookings,
  selectUserBookings,
  selectBookingLoading,
  selectBookingError,
} from "../../redux/slices/bookingSlice";
import {
  Loader2,
  Home,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const UserBookingsPage = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectUserBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  // Fetch bookings once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserBookings()).unwrap();
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Loading your bookings...
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        ❌ {error || "Failed to load bookings. Please try again later."}
      </div>
    );
  }

  // Empty State
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        You have no bookings yet. <br />
        <a
          href="/listings"
          className="text-blue-600 hover:underline font-medium"
        >
          Browse properties
        </a>{" "}
        to book your first one!
      </div>
    );
  }

  // Bookings List
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
      <p className="text-gray-500">
        View and manage your recent property bookings.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookings.map((booking) => {
          const property = booking.property || {};
          const imageUrl =
            property?.images?.[0]?.url ||
            "https://via.placeholder.com/400x250?text=No+Image";

          return (
            <div
              key={booking._id}
              className="flex bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200"
            >
              {/* Property Image */}
              <div className="w-1/3">
                <img
                  src={imageUrl}
                  alt={property.title || "Property"}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="w-2/3 p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                    {property.title || "Unnamed Property"}
                  </h2>
                  <p className="text-gray-500 text-sm flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {property.location?.address || "Unknown Location"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    Booked on{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-blue-600 font-bold text-lg">
                    ${property.price?.toLocaleString() || "N/A"}
                  </p>

                  {/* Booking Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status === "Confirmed" && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    {booking.status === "Cancelled" && (
                      <XCircle className="w-4 h-4" />
                    )}
                    {booking.status || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserBookingsPage;
