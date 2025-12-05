import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-5" style={{ background: 'linear-gradient(180deg, rgba(47,174,102,0.06), transparent)', padding: '2rem 0' }}>
            <Container>
                <Row>
                    <Col md={4} className="mb-3">
                        <h5>DocsSpot</h5>
                        <p className="muted-small">Easy online doctor booking and appointment management — trusted doctors at your fingertips.</p>
                    </Col>
                    <Col md={3} className="mb-3">
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled muted-small">
                            <li><a href="/doctors">Find Doctors</a></li>
                            <li><a href="/register">Join as Doctor</a></li>
                            <li><a href="/appointments">My Appointments</a></li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-3">
                        <h6>Contact</h6>
                        <p className="mb-1 muted-small"><FaPhone className="me-2" /> +1 (555) 123-4567</p>
                        <p className="mb-0 muted-small"><FaEnvelope className="me-2" /> support@docsspot.example</p>
                    </Col>
                    <Col md={2} className="mb-3">
                        <h6>Follow</h6>
                        <div className="d-flex gap-2">
                            <a href="#" aria-label="facebook"><FaFacebookF /></a>
                            <a href="#" aria-label="twitter"><FaTwitter /></a>
                            <a href="#" aria-label="instagram"><FaInstagram /></a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center muted-small">© {new Date().getFullYear()} DocsSpot. All rights reserved.</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
