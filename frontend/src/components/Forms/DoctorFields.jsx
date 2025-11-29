import React from "react";
import { Form } from "react-bootstrap";

const DoctorFields = () => (
  <>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control name="name" required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="designation">
      <Form.Label>Designation</Form.Label>
      <Form.Control name="designation" required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" type="email" required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="phone">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control name="phone" required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="about">
      <Form.Label>About</Form.Label>
      <Form.Control name="about" as="textarea" rows={3} required />
    </Form.Group>
    <Form.Group className="mb-3" controlId="photo">
      <Form.Label>Photo</Form.Label>
      <Form.Control name="photo" type="file" accept="image/*" required />
    </Form.Group>
  </>
);

export default DoctorFields;
