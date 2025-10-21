// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  authRoutes,
  userRoutes,
  agentRoutes,
  adminRoutes,
  notFoundRoute,
} from "../routes/Routes";

import PrivateRoute from "../routes/PrivateRoute";
import AgentRoute from "../routes/AgentRoute";
import AdminRoute from "../routes/AdminRoute";
import Loader from "../components/Loader/Loader";
import { getUser } from "../redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  // Use the global auth loading state for showing the loader
  const { loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load the user on app mount (checks token, fetches profile)
    dispatch(getUser());

    // Fetch global app settings if needed
    // dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <>
      {/* Global Loader */}
      {authLoading && <Loader />}

      <Routes>
        {/* -------------------- Public Routes -------------------- */}
        {authRoutes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}

        {/* -------------------- User Routes -------------------- */}
        {userRoutes.map(({ path, element }, i) => (
          <Route
            key={i}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}

        {/* -------------------- Agent Routes -------------------- */}
        {agentRoutes.map(({ path, element }, i) => (
          <Route
            key={i}
            path={path}
            element={<AgentRoute>{element}</AgentRoute>}
          />
        ))}

        {/* -------------------- Admin Routes -------------------- */}
        {adminRoutes.map(({ path, element }, i) => (
          <Route
            key={i}
            path={path}
            element={<AdminRoute>{element}</AdminRoute>}
          />
        ))}

        {/* -------------------- 404 Not Found Route -------------------- */}
        <Route path="*" element={notFoundRoute.element} />
      </Routes>

      {/* Global Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default App;
