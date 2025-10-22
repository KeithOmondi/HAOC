import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBookings,
  updateBookingStatus,
  selectAllBookings,
  selectBookingLoading,
  selectBookingError,
} from "../../redux/slices/bookingSlice";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  Calendar,
  AlertCircle,
  Loader2,
  Frown,
} from "lucide-react";
import { toast } from "react-toastify";

/* ─────────────────────────────
   🎨 Helpers
─────────────────────────────── */
const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-700 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-700 border-red-200";
    case "completed":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-yellow-100 text-yellow-700 border-yellow-200"; // pending
  }
};

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return <CheckCircle size={16} className="text-green-600 mr-1" />;
    case "rejected":
      return <XCircle size={16} className="text-red-600 mr-1" />;
    case "completed":
      return <Calendar size={16} className="text-blue-600 mr-1" />;
    default:
      return <Clock size={16} className="text-yellow-600 mr-1" />;
  }
};

/* ─────────────────────────────
   🧭 Main Component
─────────────────────────────── */
const AdminBookingsPage = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectAllBookings) || [];
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  const [initialLoad, setInitialLoad] = useState(true);

  // Fetch only once
  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchAllBookings()).unwrap();
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setInitialLoad(false);
      }
    };
    loadData();
  }, [dispatch]);

  /* ─── Handle status update ───────────────────── */
  const handleStatusChange = async (id, newStatus) => {
    const booking = bookings.find((b) => b._id === id);
    if (!booking) return toast.error("Booking not found.");

    const currentStatus = booking.status?.toLowerCase();
    if (currentStatus === newStatus)
      return toast.info("Status already set to this value.");

    try {
      await dispatch(updateBookingStatus({ id, status: newStatus })).unwrap();
      toast.success(
        `Booking ${id.slice(0, 5)}… updated to ${newStatus
          .charAt(0)
          .toUpperCase()}${newStatus.slice(1)}`
      );
    } catch (err) {
      toast.error(err?.message || "Failed to update booking status.");
    }
  };

  /* ─── UI States ─────────────────────────────── */
  const LoadingState = () => (
    <div className="text-center py-10 bg-white rounded-xl shadow">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
      <p className="text-gray-600 font-medium">Loading booking data...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-10 bg-red-50 rounded-xl shadow border border-red-200">
      <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
      <p className="text-lg font-semibold text-red-700">
        Error fetching bookings
      </p>
      <p className="text-sm text-red-600 mt-1">{error}</p>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-10 bg-white rounded-xl shadow">
      <Frown className="w-8 h-8 text-gray-400 mx-auto mb-3" />
      <p className="text-lg text-gray-600 font-medium">No bookings found</p>
      <p className="text-sm text-gray-500 mt-1">
        You’re all caught up! No pending viewings at the moment.
      </p>
    </div>
  );

  /* ─── Render ─────────────────────────────── */
  return (
    <section className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
        Manage Property Viewings
      </h2>

      {/* Smart loading logic — keeps last data visible */}
      {initialLoad && loading && <LoadingState />}
      {!initialLoad && error && <ErrorState />}
      {!initialLoad && !error && bookings.length === 0 && !loading && (
        <EmptyState />
      )}

      {/* Table stays visible even if refreshing */}
      {bookings.length > 0 && (
        <div
          className={`relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 ${
            loading ? "opacity-75" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {loading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600 font-medium">
                Refreshing…
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white sticky top-0 z-20">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    User / Contact
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Property
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Requested Date
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {bookings.map((b, index) => {
                  const status = b.status?.toLowerCase() || "pending";
                  const statusText =
                    status.charAt(0).toUpperCase() + status.slice(1);
                  const user = b.user || {};

                  return (
                    <motion.tr
                      key={b._id || index}
                      className="hover:bg-blue-50 transition duration-150"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name || b.name || "N/A"}
                        <p className="text-xs text-gray-500">
                          {user.email || b.email || "No email"}
                        </p>
                      </td>

                      <td className="p-4 text-sm text-gray-700 font-medium max-w-xs truncate">
                        {b.property?.title || b.propertyId || "N/A"}
                      </td>

                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                        <p className="font-medium">
                          {b.date
                            ? new Date(b.date).toLocaleDateString()
                            : "N/A"}
                        </p>
                        {b.startTime && (
                          <p className="text-xs text-gray-500">
                            {b.startTime}
                            {b.endTime ? ` - ${b.endTime}` : ""}
                          </p>
                        )}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyles(
                            b.status
                          )}`}
                        >
                          {getStatusIcon(b.status)}
                          {statusText}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="relative inline-block text-left">
                          <select
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(b._id, e.target.value)
                            }
                            className={`appearance-none bg-white border rounded-lg py-2 pl-3 pr-10 text-sm font-medium shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${getStatusStyles(
                              b.status
                            )}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Reject</option>
                            <option value="completed">Complete</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminBookingsPage;
