import React from "react";
import UserManagement from "../components/UserManagement.jsx";

const AdminUsersPage = () => {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <h2>Admin - Users</h2>
            <UserManagement />
        </div>
    );
};

export default AdminUsersPage;
