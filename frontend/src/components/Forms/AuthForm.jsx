import { Button, Card, Form } from "react-bootstrap";

const AuthForm = ({ title, fields, onSubmit, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    onSubmit(formData);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 420 }}>
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>
        <Form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <Form.Group className="mb-3" controlId={f.name} key={f.name}>
              <Form.Label>{f.label}</Form.Label>
              <Form.Control
                name={f.name}
                type={f.type || "text"}
                required={f.required !== false}
              />
            </Form.Group>
          ))}
          <Button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Submit"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;
