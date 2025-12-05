import { Container, Row, Col, Button, Card } from "react-bootstrap";
import DoctorCard from "../components/Doctor/DoctorCard.jsx";
import { FiSearch, FiPlus } from "react-icons/fi";

const HomePage = () => (
  <Container>
    <div className="hero">
      <Row className="align-items-center">
        <Col md={8}>
          <h1 className="mb-2">Find and Book Trusted Doctors</h1>
          <p className="muted-small">Search doctors by specialization, read profiles and book appointments instantly.</p>
          <div className="mt-3">
            <Button href="/doctors" className="me-2 btn-icon" variant="primary"><FiSearch className="me-1" /> Find Doctors</Button>
            <Button href="/register" variant="outline-primary" className="btn-icon"><FiPlus className="me-1" /> Join as Doctor</Button>
          </div>
        </Col>
        <Col md={4}>
          <Card className="card-enhanced p-3">
            <h6 className="mb-2">Quick Facts</h6>
            <ul className="mb-0">
              <li>1000+ registered doctors</li>
              <li>24/7 online booking</li>
              <li>Secure patient data</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>

    <h4 className="mb-3">Featured Doctors</h4>
    <Row className="g-4">
      <Col xs={12} md={6} lg={4}>
        <DoctorCard doctor={{ _id: 'sample1', fee: 500, user: { name: 'Dr. Anya Patel', designation: 'Cardiologist', about: 'Expert in heart health' } }} />
      </Col>
      <Col xs={12} md={6} lg={4}>
        <DoctorCard doctor={{ _id: 'sample2', fee: 650, user: { name: 'Dr. Rahul Mehta', designation: 'Dermatologist', about: 'Skin specialist' } }} />
      </Col>
    </Row>
  </Container>
);

export default HomePage;
