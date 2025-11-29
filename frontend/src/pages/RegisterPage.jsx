

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../api/authApi.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Alert, Card, Form, Button } from "react-bootstrap";
import RoleSelect from "../components/Forms/RoleSelect.jsx";
import UserFields from "../components/Forms/UserFields.jsx";
import DoctorFields from "../components/Forms/DoctorFields.jsx";

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
    <>
      {error && (
        <Alert variant="danger" className="mx-auto" style={{ maxWidth: 420 }}>
          {error}
        </Alert>
      )}
      <Card className="mx-auto" style={{ maxWidth: 420 }}>
        <Card.Body>
          <Card.Title className="mb-3">Register</Card.Title>
          <Form onSubmit={handleSubmit} encType={role === "doctor" ? "multipart/form-data" : undefined}>
            <RoleSelect value={role} onChange={handleRoleChange} />
            {role === "user" ? <UserFields /> : <DoctorFields />}
            <Button type="submit" disabled={loading} className="w-100 mt-2">
              {loading ? "Please wait..." : "Submit"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <p className="text-center mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default RegisterPage;
