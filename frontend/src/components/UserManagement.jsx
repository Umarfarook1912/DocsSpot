import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";

const roles = ["admin", "user", "doctor"];

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Placeholder: Fetch users from backend
    useEffect(() => {
        // TODO: Replace with real API call
        setUsers([
            { _id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
            { _id: 2, name: "Bob", email: "bob@example.com", role: "user" },
            { _id: 3, name: "Dr. Smith", email: "drsmith@example.com", role: "doctor" },
        ]);
    }, []);

    const handleShow = () => {
        setForm({ name: "", email: "", password: "", role: "user" });
        setError("");
        setSuccess("");
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Replace with real API call
        if (!form.name || !form.email || !form.password) {
            setError("All fields are required.");
            return;
        }
        setUsers([...users, { ...form, _id: Date.now() }]);
        setSuccess("User created successfully.");
        setShowModal(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>User Management</h4>
                <Button onClick={handleShow}>Create New User</Button>
            </div>
            {success && <Alert variant="success">{success}</Alert>}
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" value={form.password} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={form.role} onChange={handleChange} required>
                                {roles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary">Create</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserManagement;
