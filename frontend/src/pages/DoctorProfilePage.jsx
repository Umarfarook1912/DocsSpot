import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert, Row, Col, Image, Spinner } from "react-bootstrap";
import { getMyDoctorProfileApi, updateMyDoctorProfileApi } from "../api/doctorApi.js";
import { updateProfileApi, deleteProfileApi } from "../api/authApi.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const DoctorProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [photoPreview, setPhotoPreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { logout } = useAuth();
    const { updateUser } = useAuth();

    useEffect(() => {
        getMyDoctorProfileApi()
            .then((res) => {
                const data = res?.data ?? res;
                setProfile(data);
                setForm({
                    name: data.user?.name || "",
                    phone: data.user?.phone || "",
                    designation: data.user?.designation || "",
                    about: data.user?.about || "",
                    specialization: data.specialization || "",
                    experience: data.experience || 0,
                    fee: data.fee || 0,
                });
                const staticBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "");
                setPhotoPreview(data.user?.photo ? `${staticBase}/${data.user.photo.replace(/\\/g, "/")}` : "");
            })
            .catch((err) => setError(err.response?.data?.message || err.message || "Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo" && files[0]) {
            setForm((f) => ({ ...f, photo: files[0] }));
            setPhotoPreview(URL.createObjectURL(files[0]));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (v !== undefined && v !== null) formData.append(k, v);
        });
        try {
            const res = await updateMyDoctorProfileApi(formData);
            const data = res?.data ?? res;
            setProfile(data);
            // Also update auth stored user if name/photo changed
            if (data.user) {
                try {
                    const r2 = await updateProfileApi(formData);
                    const u2 = r2?.data?.user || r2?.data || r2;
                    // update auth context user
                    try { updateUser && updateUser(u2); } catch (e) {}
                } catch (e) { /* ignore */ }
            }
            const staticBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "");
            if (data.user?.photo) setPhotoPreview(`${staticBase}/${data.user.photo.replace(/\\/g, "/")}`);
            setSuccess("Profile updated successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!confirm("Delete your account? This will remove your doctor profile and related appointments.")) return;
        try {
            await deleteProfileApi();
            logout();
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed");
        }
    };

    if (loading)
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
            </Container>
        );

    return (
        <Container className="mt-4">
            <Card className="mx-auto" style={{ maxWidth: 600 }}>
                <Card.Body>
                    <Card.Title>My Profile</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Row>
                            <Col xs={4} className="d-flex align-items-center justify-content-center">
                                <Image src={photoPreview || "https://via.placeholder.com/120x120?text=Doctor"} roundedCircle width={120} height={120} alt={form.name} />
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="name" value={form.name || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control name="phone" value={form.phone || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control name="designation" value={form.designation || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>About</Form.Label>
                                    <Form.Control name="about" as="textarea" rows={2} value={form.about || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Specialization</Form.Label>
                                    <Form.Control name="specialization" value={form.specialization || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Experience (years)</Form.Label>
                                    <Form.Control name="experience" type="number" value={form.experience || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Fee</Form.Label>
                                    <Form.Control name="fee" type="number" value={form.fee || ""} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control name="photo" type="file" accept="image/*" onChange={handleChange} />
                                </Form.Group>
                                <Button type="submit" disabled={saving} className="mt-2">
                                    {saving ? "Saving..." : "Update Profile"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DoctorProfilePage;
