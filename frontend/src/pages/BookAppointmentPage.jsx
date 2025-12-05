import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FiCalendar, FiClock } from "react-icons/fi";
import { createAppointmentApi } from "../api/appointmentApi.js";

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target).entries());
    try {
      await createAppointmentApi({
        doctorId,
        date: formData.date,
        time: formData.time
      });
      navigate("/appointments");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card className="mx-auto center-card card-enhanced" style={{ maxWidth: 540 }}>
        <Card.Body>
          <Card.Title>Book Appointment</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <InputGroup>
                <InputGroup.Text><FiCalendar /></InputGroup.Text>
                <Form.Control type="date" name="date" required />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <InputGroup>
                <InputGroup.Text><FiClock /></InputGroup.Text>
                <Form.Control type="time" name="time" required />
              </InputGroup>
            </Form.Group>
            <Button type="submit" disabled={loading} className="btn-icon">
              {loading ? "Booking..." : "Book Appointment"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookAppointmentPage;
