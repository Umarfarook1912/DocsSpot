import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";

const AdminProfilePage = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Admin Profile</h2>
      {!user ? (
        <p>You are not signed in.</p>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text>
              <strong>Phone:</strong> {user.phone || "-"}
            </Card.Text>
            <Card.Text>
              <strong>Role:</strong> {user.role}
            </Card.Text>
            {user.designation && (
              <Card.Text>
                <strong>Designation:</strong> {user.designation}
              </Card.Text>
            )}
            {user.about && (
              <Card.Text>
                <strong>About:</strong> {user.about}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AdminProfilePage;
