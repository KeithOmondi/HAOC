import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Building2, ClipboardList, LogOut, Settings2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/authSlice";
import { CgAdd } from "react-icons/cg";
import { FaBlog, FaCreativeCommonsPdAlt } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Properties", path: "/admin/properties", icon: <Building2 size={20} /> },
    { name: "Add Property", path: "/admin/add", icon: <CgAdd size={20} /> },
    { name: "Agents", path: "/admin/agents", icon: <Users size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Events", path: "/admin/events", icon: <FaCreativeCommonsPdAlt size={20} /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FaBlog size={20} /> },
    { name: "Bookings", path: "/admin/bookings", icon: <ClipboardList size={20} /> },
    { name: "Careers", path: "/admin/careers", icon: <FaBook size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings2 size={20} /> },
    
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside
      className="sticky top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col border-r z-40"
    >
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-2 text-red-500 hover:bg-red-100 p-3 rounded-lg transition"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
