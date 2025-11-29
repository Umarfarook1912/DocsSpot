import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Row, Col, Image, Button } from "react-bootstrap";
import { fetchDoctorByIdApi } from "../api/doctorApi.js";

const DoctorDetailPage = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await fetchDoctorByIdApi(id);
                setDoctor(data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load doctor");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading)
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
            </Container>
        );
    if (error)
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    if (!doctor) return null;
    const { user } = doctor;
    const photoUrl = user.photo ? `/${user.photo.replace(/\\/g, "/")}` : "https://via.placeholder.com/120x120?text=Doctor";
    return (
        <Container className="mt-4">
            <Card className="mx-auto" style={{ maxWidth: 600 }}>
                <Card.Body>
                    <Row>
                        <Col xs={4} className="d-flex align-items-center justify-content-center">
                            <Image src={photoUrl} roundedCircle width={120} height={120} alt={user.name} />
                        </Col>
                        <Col>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.designation || doctor.specialization}</Card.Subtitle>
                            <div><b>Email:</b> {user.email}</div>
                            <div><b>Phone:</b> {user.phone}</div>
                            <div><b>About:</b> {user.about}</div>
                            <div><b>Fee:</b> ₹{doctor.fee}</div>
                            <div><b>Experience:</b> {doctor.experience} years</div>
                            <Button className="mt-3" href={`/book/${doctor._id}`}>Book Appointment</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DoctorDetailPage;
