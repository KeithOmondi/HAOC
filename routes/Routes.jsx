// src/routes/Routes.jsx

import React from "react";

// ------------------- General & Public Pages -------------------
import HomePage from "../pages/HomePage";
import Services from "../pages/Services";
import NotFound from "../pages/NotFound"; // Assuming you have a NotFound component

// ------------------- Authentication Pages -------------------
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";

// ------------------- Layouts & Admin/Agent Pages -------------------
import AdminLayout from "../pages/Admin/Layout/AdminLayout";
import AdminDashboard from "../pages/Admin/Dashboard"; // Renamed Dashboard to AdminDashboard
import AgentLayout from "../components/Agent/AgentLayout";
import AgentDashboard from "../pages/Agent/AgentDashboard";
import UserLayout from "../components/User/UserLayout";
import VerifyOtp from "../pages/auth/VerifyOTP";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import UserDashboard from "../pages/User/UserDashboard";
import AminProperties from "../pages/Admin/AminProperties";
import AdminAgents from "../pages/Admin/AdmiAgents";
import AdminAddProperty from "../pages/Admin/AdminAddProperty";
import AdminUsers from "../pages/Admin/AdminUsers";
import EventsPage from "../pages/EventsPage";
import ContactPage from "../pages/ContactPage";
import About from "../pages/About";
import BlogPage from "../pages/BlogPage";
import Careers from "../pages/Careers";
import AllPropertiesPage from "../pages/AllPropertiesPage";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import AdminBookingsPage from "../pages/Admin/AdminBookingsPage";
import AdminBlogPage from "../pages/Admin/Blog/AdminBlogPage";
import BookingRequestPage from "../pages/User/BookingRequestPage";
import UserBookingsPage from "../pages/User/UserBookingsPage";
import AdminEvents from "../pages/Admin/AdminEvents";
import PropertyViewPage from "../pages/Admin/PropertyViewPage";
import PropertyEditPage from "../pages/Admin/PropertyEditPage";
import AdminCareers from "../pages/Admin/AdminCareers";
import AdminSettings from "../pages/Admin/AdminSettings";
import BlogDetailsPage from "../components/Blog/BlogDetailsPage";

/* ===============================
   🔐 AUTH ROUTES (Public)
=============================== */
export const authRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/services", element: <Services /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <SignupPage /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/password/reset/:token", element: <ResetPassword /> },
  { path: "/events", element: <EventsPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/about", element: <About /> },
  { path: "/blogs", element: <BlogPage /> },
  { path: "/blogs/:id", element: <BlogDetailsPage /> },
  { path: "/career", element: <Careers /> },
  { path: "/listings", element: <AllPropertiesPage /> },
  { path: "/listings/:id", element: <PropertyDetailsPage /> },
];

/* ===============================
   👤 USER ROUTES (Logged-in, all roles can access)
=============================== */
export const userRoutes = [
  // Standard logged-in user dashboard (e.g., viewing settings, basic info)
  {
    path: "/user/dashboard",
    element: (
      <UserLayout>
        <UserDashboard />
      </UserLayout>
    ),
  },
  {
    path: "/booking/:id",
    element: (
      <UserLayout>
        <BookingRequestPage />
      </UserLayout>
    ),
  },
  {
    path: "/user/bookings",
    element: (
      <UserLayout>
        <UserBookingsPage />
      </UserLayout>
    ),
  },
];

/* ===============================
   🏠 AGENT ROUTES (Role: Agent)
=============================== */
export const agentRoutes = [
  {
    path: "/agent/dashboard",
    element: (
      <AgentLayout>
        {" "}
        <AgentDashboard />
      </AgentLayout>
    ),
  },
];

/* ===============================
   ⚙️ ADMIN ROUTES (Role: Admin)
=============================== */
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <AdminLayout>
        {" "}
        <AdminDashboard />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/properties",
    element: (
      <AdminLayout>
        {" "}
        <AminProperties />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/agents",
    element: (
      <AdminLayout>
        {" "}
        <AdminAgents />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/add",
    element: (
      <AdminLayout>
        {" "}
        <AdminAddProperty />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminLayout>
        {" "}
        <AdminUsers />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/bookings",
    element: (
      <AdminLayout>
        {" "}
        <AdminBookingsPage />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/blogs",
    element: (
      <AdminLayout>
        {" "}
        <AdminBlogPage />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/events",
    element: (
      <AdminLayout>
        {" "}
        <AdminEvents />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/properties/view/:id",
    element: (
      <AdminLayout>
        {" "}
        <PropertyViewPage />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/properties/edit/:id",
    element: (
      <AdminLayout>
        {" "}
        <PropertyEditPage />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/careers",
    element: (
      <AdminLayout>
        {" "}
        <AdminCareers />{" "}
      </AdminLayout>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <AdminLayout>
        {" "}
        <AdminSettings />{" "}
      </AdminLayout>
    ),
  },
];

/* ===============================
   ❌ 404 NOT FOUND
=============================== */
export const notFoundRoute = {
  // This path="/*" is handled in App.jsx via the <Route path="*" element={...} />
  path: "*",
  element: <NotFound />,
};
