
import { useEffect, useState } from "react";
import { Container, Spinner, Alert, ListGroup, Row, Col, Image, Button, Badge, Modal, Nav } from "react-bootstrap";
import { fetchMyAppointmentsApi, updateAppointmentStatusApi } from "../api/appointmentApi.js";


const DoctorAppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState("");
    const [filter, setFilter] = useState("pending");
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);

    const loadAppointments = async () => {
        setLoading(true);
        try {
            const data = await fetchMyAppointmentsApi();
            setAppointments(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const handleStatus = async (id, status) => {
        setActionLoading(id + status);
        try {
            await updateAppointmentStatusApi(id, status);
            await loadAppointments();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update status");
        } finally {
            setActionLoading("");
        }
    };

    const filtered = appointments.filter((a) => a.status === filter);

    const handleShowDetails = (a) => {
        setSelected(a);
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    if (loading)
        return (
            <Container className="text-center">
                <Spinner animation="border" />
            </Container>
        );
    if (error)
        return (
            <Container className="mt-3">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    return (
        <Container>
            <h4 className="mb-3">My Appointments (Doctor)</h4>
            <Nav variant="tabs" activeKey={filter} onSelect={setFilter} className="mb-3">
                <Nav.Item>
                    <Nav.Link eventKey="pending">Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="confirmed">Accepted</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cancelled">Rejected</Nav.Link>
                </Nav.Item>
            </Nav>
            <ListGroup>
                {filtered.map((a) => {
                    const patient = a.patient || {};
                    return (
                        <ListGroup.Item key={a._id} action onClick={() => handleShowDetails(a)}>
                            <Row>
                                <Col>
                                    <div><b>Patient:</b> {patient.name} ({patient.email})</div>
                                    <div>Date: {a.date} at {a.time}</div>
                                    <div>Status: <Badge bg={a.status === "confirmed" ? "success" : a.status === "cancelled" ? "danger" : "warning"}>{a.status}</Badge></div>
                                </Col>
                                <Col xs="auto" className="d-flex align-items-center">
                                    {a.status === "pending" && (
                                        <>
                                            <Button size="sm" variant="success" className="me-2" disabled={actionLoading === a._id + "confirmed"} onClick={e => { e.stopPropagation(); handleStatus(a._id, "confirmed"); }}>Accept</Button>
                                            <Button size="sm" variant="danger" disabled={actionLoading === a._id + "cancelled"} onClick={e => { e.stopPropagation(); handleStatus(a._id, "cancelled"); }}>Reject</Button>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selected && (
                        <>
                            <div><b>Patient Name:</b> {selected.patient?.name}</div>
                            <div><b>Patient Email:</b> {selected.patient?.email}</div>
                            <div><b>Date:</b> {selected.date}</div>
                            <div><b>Time:</b> {selected.time}</div>
                            <div><b>Status:</b> <Badge bg={selected.status === "confirmed" ? "success" : selected.status === "cancelled" ? "danger" : "warning"}>{selected.status}</Badge></div>
                            <div><b>Created At:</b> {new Date(selected.createdAt).toLocaleString()}</div>
                            <div><b>Updated At:</b> {new Date(selected.updatedAt).toLocaleString()}</div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DoctorAppointmentsPage;
