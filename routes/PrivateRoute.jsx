import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { accessToken, user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  // 🔹 Optional: show loader while auth state initializes
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  // 🔹 Not logged in → redirect to login
  if (!accessToken || !user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Authenticated → show protected content
  return children;
};

export default PrivateRoute;
