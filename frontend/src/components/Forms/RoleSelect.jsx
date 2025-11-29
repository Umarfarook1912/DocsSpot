import React from "react";
import { Form } from "react-bootstrap";

const RoleSelect = ({ value, onChange }) => (
  <Form.Group className="mb-3" controlId="role">
    <Form.Label>Register as</Form.Label>
    <Form.Select name="role" value={value} onChange={onChange} required>
      <option value="user">User</option>
      <option value="doctor">Doctor</option>
    </Form.Select>
  </Form.Group>
);

export default RoleSelect;
