import React from "react";
import { Container } from "react-bootstrap";
import DoctorManagement from "../components/DoctorManagement.jsx";
import { FiUsers } from "react-icons/fi";

const AdminDoctorsPage = () => {
    return (
        <Container className="mt-3">
            <h2 className="page-title"><FiUsers /> Admin - Doctors</h2>
            <DoctorManagement />
        </Container>
    );
};

export default AdminDoctorsPage;
