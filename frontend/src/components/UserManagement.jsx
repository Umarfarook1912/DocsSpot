import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import client from "../api/client";

const roles = ["admin", "user", "doctor"];

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data } = await client.get('/admin/users');
                setUsers(data);
            } catch (e) {
                console.error('Failed to fetch users', e);
                setError(e?.response?.data?.message || 'Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
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
        if (!form.name || !form.email || !form.password) {
            setError("All fields are required.");
            return;
        }
        setError("");
        (async () => {
            try {
                const { data } = await client.post('/admin/users', form);
                setUsers((prev) => [data.user, ...prev]);
                setSuccess('User created successfully.');
                setShowModal(false);
            } catch (e) {
                console.error('Create user failed', e);
                setError(e?.response?.data?.message || 'Failed to create user');
            }
        })();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        try {
            await client.delete(`/admin/users/${id}`);
            setUsers((prev) => prev.filter((u) => String(u._id || u.id) !== String(id)));
            setSuccess('User deleted');
        } catch (e) {
            console.error('Delete user failed', e);
            setError(e?.response?.data?.message || 'Failed to delete user');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4><FiEdit className="me-2" /> User Management</h4>
                <Button onClick={handleShow}><FiPlus className="me-1" /> Create New User</Button>
            </div>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={4} className="text-center py-4"><Spinner animation="border" size="sm" /> Loading...</td></tr>
                    ) : users.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-4">No users found</td></tr>
                    ) : users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button size="sm" variant="outline-primary" className="me-2">
                                    <FiEdit />
                                </Button>
                                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(user._id || user.id)}>
                                    <FiTrash2 />
                                </Button>
                            </td>
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
