import React from "react";
import { Container } from "react-bootstrap";
import UserManagement from "../components/UserManagement.jsx";
import { FiUsers } from "react-icons/fi";

const AdminUsersPage = () => {
    return (
        <Container className="mt-3">
            <h2 className="page-title"><FiUsers /> Admin - Users</h2>
            <UserManagement />
        </Container>
    );
};

export default AdminUsersPage;
