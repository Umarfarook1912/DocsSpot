import { Container, Spinner, Alert, ListGroup, Row, Col, Image, Badge } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch.js";
import { fetchMyAppointmentsApi } from "../api/appointmentApi.js";

const MyAppointmentsPage = () => {
  const { data, loading, error } = useFetch(fetchMyAppointmentsApi, []);

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
      <h4 className="mb-3">My Appointments</h4>
      <ListGroup>
        {data?.map((a) => {
          const doc = a.doctor;
          const user = doc?.user || {};
          const staticBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "");
          const photoPath = user.photo ? user.photo.replace(/\\/g, "/") : "";
          const photoUrl = photoPath ? `${staticBase}/${photoPath}` : "https://via.placeholder.com/60x60?text=Doctor";
          return (
            <ListGroup.Item key={a._id}>
              <Row>
                <Col xs={2} className="d-flex align-items-center justify-content-center">
                  <Image src={photoUrl} roundedCircle width={50} height={50} alt={user.name} />
                </Col>
                <Col>
                  <div><b>{user.name}</b> <span className="text-muted">{user.designation || doc.specialization}</span></div>
                  <div>Date: {a.date} at {a.time}</div>
                  <div>Status: <Badge bg={a.status === "confirmed" ? "success" : a.status === "cancelled" ? "danger" : "warning"}>{a.status}</Badge></div>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default MyAppointmentsPage;
