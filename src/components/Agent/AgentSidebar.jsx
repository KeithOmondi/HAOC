// src/components/Agent/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, MessageSquare, User, Settings } from "lucide-react";

const AgentSidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/agent/dashboard" },
    { name: "My Properties", icon: <Home size={18} />, path: "/agent/properties" },
    { name: "Add Property", icon: <PlusCircle size={18} />, path: "/agent/create-property" },
    { name: "Messages", icon: <MessageSquare size={18} />, path: "/agent/messages" },
    { name: "Profile", icon: <User size={18} />, path: "/agent/profile" },
    { name: "Settings", icon: <Settings size={18} />, path: "/agent/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Agent Panel</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AgentSidebar;
