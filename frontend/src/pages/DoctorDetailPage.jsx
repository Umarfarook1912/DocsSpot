import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import { FiPhone, FiMail, FiClock, FiBriefcase, FiStar } from "react-icons/fi";
import { fetchDoctorByIdApi } from "../api/doctorApi.js";

const DoctorDetailPage = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetchDoctorByIdApi(id);
                const data = res?.data ?? res;
                setDoctor(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to load doctor");
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
    const staticBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "");
    const photoPath = user.photo ? user.photo.replace(/\\/g, "/") : "";
    const photoUrl = photoPath ? `${staticBase}/${photoPath}` : "https://via.placeholder.com/120x120?text=Doctor";
    return (
        <Container className="mt-4">
            <Card className="mx-auto card-enhanced" style={{ maxWidth: 900 }}>
                <Card.Body>
                    <Row>
                        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
                            <Image src={photoUrl} roundedCircle width={140} height={140} alt={user.name} />
                            <div className="mt-3 text-center">
                                <h5 className="mb-0">{user.name}</h5>
                                <small className="text-muted">{user.designation || doctor.specialization}</small>
                            </div>
                        </Col>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><FiMail className="me-2" /> {user.email}</ListGroup.Item>
                                <ListGroup.Item><FiPhone className="me-2" /> {user.phone || 'Not provided'}</ListGroup.Item>
                                <ListGroup.Item><FiBriefcase className="me-2" /> Experience: {doctor.experience || 0} years</ListGroup.Item>
                                <ListGroup.Item><FiClock className="me-2" /> Fee: ₹{doctor.fee}</ListGroup.Item>
                            </ListGroup>
                            <div className="mt-3">
                                <h6>About</h6>
                                <p className="mb-2">{user.about || 'No description provided.'}</p>
                                <h6>Reviews</h6>
                                <div className="d-flex gap-2 align-items-center mb-2">
                                    <FiStar className="text-warning" /> <small className="text-muted">No reviews yet</small>
                                </div>
                                <Button href={`/book/${doctor._id}`} variant="primary">Book Appointment</Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DoctorDetailPage;
