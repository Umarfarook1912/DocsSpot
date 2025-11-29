import { Container, Spinner, Alert } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch.js";
import { fetchDoctors } from "../api/doctorApi.js";
import DoctorCard from "../components/Doctor/DoctorCard.jsx";

const DoctorsPage = () => {
  const { data, loading, error } = useFetch(fetchDoctors, []);

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
      {data?.length === 0 && <p>No doctors available.</p>}
      {data?.map((d) => (
        <DoctorCard key={d._id} doctor={d} />
      ))}
    </Container>
  );
};

export default DoctorsPage;
