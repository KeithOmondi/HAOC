// src/components/User/UserSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdFavorite,
  MdHomeWork,
  MdAccountCircle,
} from "react-icons/md";

// Navigation items for a real estate user
const navItems = [
  { name: "Dashboard", path: "/user/dashboard", icon: MdDashboard },
  { name: "My Bookings", path: "/user/bookings", icon: MdHomeWork },
  { name: "Saved Properties", path: "/user/favorites", icon: MdFavorite },
  { name: "Profile", path: "/user/profile", icon: MdAccountCircle },
];

const UserSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col p-5 shadow-xl">
      {/* Branding */}
      <div className="text-2xl font-bold mb-10 text-center text-blue-400 tracking-wide">
        My Realty Panel
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
              end={item.path === "/user/dashboard"}
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default UserSidebar;
