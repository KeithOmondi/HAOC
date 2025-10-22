import React from "react";
import { Bell, UserCircle2 } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">Welcome, Admin</h1>

      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-blue-600">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <UserCircle2 size={24} className="text-gray-700" />
          <span className="font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
