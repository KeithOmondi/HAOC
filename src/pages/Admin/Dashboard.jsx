import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboard, selectAdminDashboard } from "../../redux/slices/adminDashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { summary, charts, loading, error } = useSelector(selectAdminDashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <p className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
            <h3 className="text-2xl font-bold text-blue-600">{value}</h3>
          </div>
        ))}
      </div>

      {/* Charts will go here next */}
    </div>
  );
};

export default Dashboard;
