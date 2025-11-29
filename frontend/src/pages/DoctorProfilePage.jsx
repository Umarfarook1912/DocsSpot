import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert, Row, Col, Image, Spinner } from "react-bootstrap";
import { getMyDoctorProfileApi, updateMyDoctorProfileApi } from "../api/doctorApi.js";

const DoctorProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [photoPreview, setPhotoPreview] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        getMyDoctorProfileApi()
            .then((data) => {
                setProfile(data);
                setForm({
                    name: data.user.name,
                    phone: data.user.phone,
                    designation: data.user.designation,
                    about: data.user.about,
                    specialization: data.specialization,
                    experience: data.experience,
                    fee: data.fee,
                });
                setPhotoPreview(data.user.photo ? `/${data.user.photo.replace(/\\/g, "/")}` : "");
            })
            .catch((err) => setError(err.response?.data?.message || "Failed to load profile"))
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
            const data = await updateMyDoctorProfileApi(formData);
            setProfile(data);
            setSuccess("Profile updated successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
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
