// src/components/Agent/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AgentSidebar from "./AgentSidebar";
import AgentHeader from "./AgentHeader";

const AgentLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AgentSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <AgentHeader />
        <main className="p-6">
          <Outlet /> {/* Dynamic page content */}
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;
