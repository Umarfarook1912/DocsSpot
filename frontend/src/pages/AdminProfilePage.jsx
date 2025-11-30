import React, { useEffect, useState } from "react";
import { Card, Form, Button, Alert, Image, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getProfileApi, updateProfileApi, deleteProfileApi } from "../api/authApi.js";
import { useNavigate } from "react-router-dom";

const AdminProfilePage = () => {
    const { user, updateUser, logout } = useAuth();
    const [form, setForm] = useState({ name: "", phone: "" });
    const [photoPreview, setPhotoPreview] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        getProfileApi()
            .then((res) => {
                const data = res?.data ?? res;
                const u = data.user || data;
                if (!mounted) return;
                setForm({ name: u.name || "", phone: u.phone || "" });
                const staticBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "");
                if (u.photo) setPhotoPreview(`${staticBase}/${u.photo.replace(/\\/g, "/")}`);
            })
            .catch(() => {});
        return () => (mounted = false);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo" && files[0]) {
            setForm((f) => ({ ...f, photo: files[0] }));
            setPhotoPreview(URL.createObjectURL(files[0]));
        } else setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (v !== undefined && v !== null) fd.append(k, v);
        });
        try {
            const res = await updateProfileApi(fd);
            const data = res?.data ?? res;
            const u = data.user || data;
            updateUser && updateUser(u);
            setSuccess("Profile updated.");
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete your admin account? This cannot be undone.")) return;
        try {
            await deleteProfileApi();
            logout();
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Delete failed");
        }
    };

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <h2>Admin Profile</h2>
            {!user ? (
                <p>You are not signed in.</p>
            ) : (
                <Card>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Row>
                                <Col xs={4} className="d-flex align-items-center justify-content-center">
                                    <Image src={photoPreview || "https://via.placeholder.com/120x120?text=Admin"} roundedCircle width={120} height={120} alt={form.name} />
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control name="name" value={form.name} onChange={handleChange} required />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control name="phone" value={form.phone} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control name="photo" type="file" accept="image/*" onChange={handleChange} />
                                    </Form.Group>
                                    <Button type="submit" disabled={saving} className="me-2">{saving ? "Saving..." : "Update Profile"}</Button>
                                    <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default AdminProfilePage;
