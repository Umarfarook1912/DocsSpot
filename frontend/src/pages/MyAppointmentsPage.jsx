import { Container, Spinner, Alert, ListGroup } from "react-bootstrap";
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
        {data?.map((a) => (
          <ListGroup.Item key={a._id}>
            Doctor: {a.doctor?.user?.name || "N/A"} | {a.date} at {a.time} |{" "}
            {a.status}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MyAppointmentsPage;
