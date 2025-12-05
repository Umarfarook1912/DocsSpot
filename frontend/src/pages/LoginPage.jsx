import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/Forms/AuthForm.jsx";
import { loginApi } from "../api/authApi.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Alert, Container } from "react-bootstrap";
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
    <Container className="mt-3 text-center">
      <h3 className="page-title"><FiLogIn /> Login</h3>
      {error && (
        <Alert variant="danger" className="mx-auto" style={{ maxWidth: 420 }}>
          {error}
        </Alert>
      )}
      <AuthForm
        title="Login"
        loading={loading}
        onSubmit={handleSubmit}
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" }
        ]}
      />
      <p className="text-center mt-3">
        No account? <Link to="/register">Register</Link>
      </p>
    </Container>
  );
};

export default LoginPage;
