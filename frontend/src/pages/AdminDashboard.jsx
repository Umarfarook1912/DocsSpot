import React from "react";
import UserManagement from "../components/UserManagement.jsx";

const AdminDashboard = () => {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <UserManagement />
    </div>
  );
};

export default AdminDashboard;
