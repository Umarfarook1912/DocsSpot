import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Layout/Footer.jsx";
import { FiSearch, FiPlus, FiCalendar, FiUserCheck, FiStar } from "react-icons/fi";

const ServiceCard = ({ title, desc, icon }) => (
  <Card className="card-enhanced p-3 h-100">
    <div className="d-flex align-items-start gap-3">
      <div style={{ fontSize: 28, color: 'var(--bs-primary)' }}>{icon}</div>
      <div>
        <h6 className="mb-1">{title}</h6>
        <p className="muted-small mb-0">{desc}</p>
      </div>
    </div>
  </Card>
);

const Testimonial = ({ text, author }) => (
  <div className="testimonial">
    <p className="mb-2">“{text}”</p>
    <small className="text-muted">— {author}</small>
  </div>
);

const HomePage = () => (
  <>
    <Container>
      <div className="hero">
        <Row className="align-items-center">
          <Col md={7}>
            <h1 className="mb-3">Your health, one click away</h1>
            <p className="muted-small">Discover verified doctors, book appointments instantly and manage your health records — all in one place.</p>
            <div className="mt-4 d-flex gap-2">
              <Button href="/doctors" className="btn-icon" variant="primary"><FiSearch className="me-2" /> Find Doctors</Button>
              <Button href="/register" variant="outline-primary" className="btn-icon"><FiPlus className="me-2" /> Join as Doctor</Button>
            </div>
          </Col>
          <Col md={5} className="d-none d-md-block">
            <Card className="card-enhanced p-4">
              <h6 className="mb-2">Why choose DocsSpot?</h6>
              <ul className="mb-0 muted-small">
                <li>Verified & experienced doctors</li>
                <li>Simple online booking & reminders</li>
                <li>Secure and private medical records</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>

      <section className="mt-4">
        <h4 className="mb-3">Our Services</h4>
        <Row className="g-3">
          <Col md={4}><ServiceCard title="Search Doctors" desc="Filter by specialty, location and fees to find the right doctor." icon={<FiSearch />} /></Col>
          <Col md={4}><ServiceCard title="Book Appointments" desc="Choose a time slot and book instantly with confirmation." icon={<FiCalendar />} /></Col>
          <Col md={4}><ServiceCard title="Manage Care" desc="Keep track of your appointments and health records in one place." icon={<FiUserCheck />} /></Col>
        </Row>
      </section>

      <section className="mt-5">
        <h4 className="mb-3">How it Works</h4>
        <Row>
          <Col md={4} className="mb-3">
            <Card className="p-3 card-enhanced">
              <h6>1. Find</h6>
              <p className="muted-small mb-0">Search by symptom or specialization and compare profiles.</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="p-3 card-enhanced">
              <h6>2. Book</h6>
              <p className="muted-small mb-0">Select date and time, and receive instant confirmation.</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="p-3 card-enhanced">
              <h6>3. Visit</h6>
              <p className="muted-small mb-0">Get care in-clinic or via teleconsultation and save notes.</p>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="mt-5">
        <h4 className="mb-3">What our users say</h4>
        <Row className="g-3">
          <Col md={4}><Testimonial text="Quick booking and friendly doctors — saved me time." author="Priya K." /></Col>
          <Col md={4}><Testimonial text="The profiles helped me pick the right specialist." author="Rohit S." /></Col>
          <Col md={4}><Testimonial text="Great reminders and easy rescheduling options." author="Anita G." /></Col>
        </Row>
      </section>

      <section className="mt-5 mb-4">
        <Card className="p-4 card-enhanced text-center">
          <h4 className="mb-2">Ready to take control of your health?</h4>
          <p className="muted-small mb-3">Sign up and start booking appointments in minutes.</p>
          <div>
            <Button href="/register" variant="primary" className="me-2 btn-icon">Get Started</Button>
            <Button href="/doctors" variant="outline-primary" className="btn-icon">Browse Doctors</Button>
          </div>
        </Card>
      </section>
    </Container>

    <Footer />
  </>
);

export default HomePage;
