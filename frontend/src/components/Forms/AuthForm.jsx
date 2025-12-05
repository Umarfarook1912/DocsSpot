import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const fieldIcon = (name, type) => {
  if (name === "email" || type === "email") return <FiMail className="text-muted" />;
  if (name === "password" || type === "password") return <FiLock className="text-muted" />;
  return <FiUser className="text-muted" />;
};

const AuthForm = ({ title, fields, onSubmit, loading, submitLabel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    onSubmit(formData);
  };

  return (
    <Card className="mx-auto center-card card-enhanced" style={{ maxWidth: 420 }}>
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>
        <Form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <Form.Group className="mb-3" controlId={f.name} key={f.name}>
              <Form.Label>{f.label}</Form.Label>
              <InputGroup>
                <InputGroup.Text>{fieldIcon(f.name, f.type)}</InputGroup.Text>
                <Form.Control
                  name={f.name}
                  type={f.type || "text"}
                  required={f.required !== false}
                />
              </InputGroup>
            </Form.Group>
          ))}
          <div style={{ textAlign: 'center' }}>
            <Button type="submit" disabled={loading} className="btn-icon mx-auto d-block" variant="primary" size="md" style={{ minWidth: 180 }}>
              {loading ? "Please wait..." : (submitLabel || "Submit")}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;
