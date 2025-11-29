import React from "react";
import UserManagement from "../components/UserManagement.jsx";
import DoctorManagement from "../components/DoctorManagement.jsx";

const AdminDashboard = () => {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <h2>Admin Dashboard</h2>
            <UserManagement />
            <hr className="my-4" />
            <DoctorManagement />
        </div>
    );
};

export default AdminDashboard;
