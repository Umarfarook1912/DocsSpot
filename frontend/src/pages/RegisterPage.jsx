

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../api/authApi.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Alert, Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import RoleSelect from "../components/Forms/RoleSelect.jsx";
import UserFields from "../components/Forms/UserFields.jsx";
import DoctorFields from "../components/Forms/DoctorFields.jsx";
import { FiUserPlus, FiShield } from "react-icons/fi";

const RegisterPage = () => {
  const { login } = useAuth();
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    try {
      let data;
      if (role === "doctor") {
        // For doctor, send as multipart/form-data
        data = formData;
      } else {
        // For user, send as JSON
        data = Object.fromEntries(formData.entries());
      }
      const res = await registerApi(data, role);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        <Col md={6} className="d-none d-md-block">
          <div className="p-4">
            <h2 style={{ color: 'var(--bs-primary)' }}><FiUserPlus className="me-2" /> Create your account</h2>
            <p className="muted-small">Register as a user to book appointments or join as a doctor to offer consultations. Secure & fast onboarding.</p>
            <ul className="muted-small">
              <li>Easy registration</li>
              <li>Secure profile and verification</li>
              <li>Manage bookings and availability</li>
            </ul>
            <div className="mt-4 card-enhanced p-3">
              <h6>Privacy</h6>
              <p className="muted-small mb-0"><FiShield className="me-2" /> We protect your personal data and never share it without consent.</p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="mx-auto" style={{ maxWidth: 560 }}>
            <Card className="card-enhanced">
              <Card.Body>
                <div className="text-center mb-3">
                  <h4 className="mb-1">Create Account</h4>
                  <p className="muted-small mb-0">Sign up to start booking doctors</p>
                </div>
                {error && (
                  <Alert variant="danger">{error}</Alert>
                )}
                <Form onSubmit={handleSubmit} encType={role === "doctor" ? "multipart/form-data" : undefined}>
                  <RoleSelect value={role} onChange={handleRoleChange} />
                  {role === "user" ? <UserFields /> : <DoctorFields />}
                  <div className="text-center mt-2">
                    <Button type="submit" disabled={loading} className="btn-icon" variant="primary" size="md" style={{ minWidth: 140 }}>
                      {loading ? "Please wait..." : "Create account"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <p className="text-center mt-3 muted-small">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
