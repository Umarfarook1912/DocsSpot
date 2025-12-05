import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

const UserFields = () => (
    <>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <InputGroup>
                <InputGroup.Text><FiUser /></InputGroup.Text>
                <Form.Control name="name" required />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <InputGroup>
                <InputGroup.Text><FiMail /></InputGroup.Text>
                <Form.Control name="email" type="email" required />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
                <InputGroup.Text><FiLock /></InputGroup.Text>
                <Form.Control name="password" type="password" required />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
                <InputGroup.Text><FiPhone /></InputGroup.Text>
                <Form.Control name="phone" required />
            </InputGroup>
        </Form.Group>
    </>
);

export default UserFields;
