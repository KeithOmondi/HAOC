// src/components/Agent/Header.jsx
import React from "react";
import { Bell, LogOut } from "lucide-react";

const AgentHeader = () => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-3 border-b shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">Agent Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">2</span>
        </button>
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AgentHeader;
