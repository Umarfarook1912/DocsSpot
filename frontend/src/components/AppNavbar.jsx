import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Book a Doctor</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {user && user.role === "user" && (
              <>
                <Nav.Link as={NavLink} to="/doctors">Doctors</Nav.Link>
                <Nav.Link as={NavLink} to="/appointments">My Appointments</Nav.Link>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
              </>
            )}
            {user && user.role === "doctor" && (
              <>
                <Nav.Link as={NavLink} to="/doctor/appointments">Appointments</Nav.Link>
                <Nav.Link as={NavLink} to="/doctor/profile">My Profile</Nav.Link>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Nav.Link as={NavLink} to="/admin/users">Users</Nav.Link>
                <Nav.Link as={NavLink} to="/admin/doctors">Doctors</Nav.Link>
                <Nav.Link as={NavLink} to="/admin/profile">My Profile</Nav.Link>
              </>
            )}
            {!user && (
              <Nav.Link as={NavLink} to="/doctors">Doctors</Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  Signed in as {user.name}
                </Navbar.Text>
                <Button variant="outline-secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  className="me-2"
                >
                  Login
                </Button>
                <Button as={Link} to="/register" variant="primary">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
