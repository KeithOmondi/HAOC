// src/components/User/UserLayout.jsx
import React from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

/**
 * Main layout for authenticated users (User, Agent, Admin) for consistency, 
 * or specifically for the 'User' role. 
 * This is used to wrap all user-specific pages (e.g., /dashboard, /profile).
 */
const UserLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <UserSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <UserHeader />

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default UserLayout;

// ❗ To use this in your Routes.jsx, you would update the UserRoutes like this:
// export const userRoutes = [
//  { path: "/dashboard", element: (<UserLayout><UserDashboard /></UserLayout>) }, 
//  { path: "/profile", element: (<UserLayout><ProfileContent /></UserLayout>) },
//  // ...
// ];