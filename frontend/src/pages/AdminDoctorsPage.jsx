import React from "react";
import DoctorManagement from "../components/DoctorManagement.jsx";

const AdminDoctorsPage = () => {
    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
            <h2>Admin - Doctors</h2>
            <DoctorManagement />
        </div>
    );
};

export default AdminDoctorsPage;
