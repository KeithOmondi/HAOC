// src/pages/User/UserDashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  MdHomeWork,
  MdFavorite,
  MdHistory,
  MdAccountCircle,
} from "react-icons/md";

const DashboardCard = ({ icon: Icon, title, value, color }) => (
  <div className={`p-5 rounded-xl shadow-lg bg-white border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
      <Icon size={32} className="text-gray-400" />
    </div>
    <div className="mt-1 text-sm font-medium text-gray-500">{title}</div>
  </div>
);

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // 💡 Placeholder — replace with actual API calls (e.g., fetch user's bookings or favorites)
  const dashboardData = {
    activeBookings: 2,
    savedProperties: 5,
    totalBookings: 8,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome back, {user?.name || "Valued User"}!
      </h1>
      <p className="text-gray-500">
        Here’s an overview of your activity on the Real Estate platform.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={MdHomeWork}
          title="Active Bookings"
          value={dashboardData.activeBookings}
          color="border-blue-500"
        />
        <DashboardCard
          icon={MdFavorite}
          title="Saved Properties"
          value={dashboardData.savedProperties}
          color="border-pink-500"
        />
        <DashboardCard
          icon={MdHistory}
          title="Total Bookings"
          value={dashboardData.totalBookings}
          color="border-green-500"
        />
        <DashboardCard
          icon={MdAccountCircle}
          title="Account Type"
          value={user?.role || "User"}
          color="border-yellow-500"
        />
      </div>

      {/* Notices / Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Updates
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            Your booking for <strong>Luxury 3 Bedroom Villa</strong> is confirmed.
          </li>
          <li>
            You recently saved <strong>Modern Apartment in Westlands</strong> to
            your favorites.
          </li>
          <li>
            Check out our new <strong>featured listings</strong> in your area!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
