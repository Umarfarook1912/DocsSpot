import { Container, Spinner, Alert, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch.js";
import { fetchDoctors } from "../api/doctorApi.js";
import DoctorCard from "../components/Doctor/DoctorCard.jsx";
import { FiSearch } from "react-icons/fi";
import { useState, useMemo } from "react";

const DoctorsPage = () => {
  const { data, loading, error } = useFetch(fetchDoctors, []);
  const [query, setQuery] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const min = parseInt(minFee, 10);
    const max = parseInt(maxFee, 10);

    return data.filter((d) => {
      const name = (d.user?.name || "").toLowerCase();
      const spec = (d.specialization || "").toLowerCase();
      const fee = Number(d.fee || 0);

      // search match
      const matchesQuery = !q || name.includes(q) || spec.includes(q);

      // price match
      if (!isNaN(min) && !isNaN(max)) {
        if (fee < min || fee > max) return false;
      } else if (!isNaN(min)) {
        if (fee < min) return false;
      } else if (!isNaN(max)) {
        if (fee > max) return false;
      }

      return matchesQuery;
    });
  }, [data, query, minFee, maxFee]);

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="page-title">Doctors</h3>
        <div style={{ maxWidth: 720, width: "100%" }}>
          <InputGroup>
            <InputGroup.Text><FiSearch /></InputGroup.Text>
            <Form.Control placeholder="Search by name or specialization" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Form.Control type="number" placeholder="Min fee" value={minFee} onChange={(e) => setMinFee(e.target.value)} style={{ maxWidth: 120 }} />
            <Form.Control type="number" placeholder="Max fee" value={maxFee} onChange={(e) => setMaxFee(e.target.value)} style={{ maxWidth: 120 }} />
            <Button variant="outline-secondary" onClick={() => { setQuery(""); setMinFee(""); setMaxFee(""); }}>Reset</Button>
          </InputGroup>
        </div>
      </div>

      {filtered?.length === 0 && <p className="text-muted">No doctors match your search.</p>}
      <Row className="g-4">
        {filtered?.map((d) => (
          <Col key={d._id} xs={12} md={6} lg={4}>
            <DoctorCard doctor={d} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorsPage;
