import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/Forms/AuthForm.jsx";
import { loginApi } from "../api/authApi.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      const res = await loginApi(values);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '65vh' }}>
        <Col xs={12} md={6} className="text-center mb-3">
          <h3 className="page-title"><FiLogIn /> Welcome back</h3>
          <p className="muted-small">Login to manage your appointments and consult with trusted doctors.</p>
        </Col>
        <Col xs={12} md={6}>
          {error && (
            <Alert variant="danger" className="mx-auto" style={{ maxWidth: 420 }}>
              {error}
            </Alert>
          )}
          <AuthForm
            title="Login"
            loading={loading}
            submitLabel="Login"
            onSubmit={handleSubmit}
            fields={[
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" }
            ]}
          />
          <div className="text-center mt-2 muted-small">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
