import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/Forms/AuthForm.jsx";
import { registerApi } from "../api/authApi.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Alert, Form } from "react-bootstrap";

const RegisterPage = () => {
  const { login } = useAuth();
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      const res = await registerApi({ ...values, role });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="mx-auto" style={{ maxWidth: 420 }}>
          {error}
        </Alert>
      )}
      <AuthForm
        title="Register"
        loading={loading}
        onSubmit={handleSubmit}
        fields={[
          { name: "name", label: "Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" }
        ]}
      />
      <Form.Group
        className="mx-auto mt-3"
        style={{ maxWidth: 420 }}
        controlId="role"
      >
        <Form.Label>Role</Form.Label>
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </Form.Select>
      </Form.Group>
      <p className="text-center mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default RegisterPage;
