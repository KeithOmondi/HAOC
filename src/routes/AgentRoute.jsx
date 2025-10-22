import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AgentRoute = ({ children }) => {
  const { accessToken, user } = useSelector((state) => state.auth);

  // 1️⃣ Not logged in
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Logged in but not an Agent
  if (user.role !== "Agent") {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ Authorized Agent
  return <>{children}</>;
};

export default AgentRoute;
