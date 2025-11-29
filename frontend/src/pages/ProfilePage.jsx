import { useAuth } from "../contexts/AuthContext.jsx";
import { Container, Card } from "react-bootstrap";

const ProfilePage = () => {
    const { user } = useAuth();
    return (
        <Container>
            <Card className="mx-auto mt-4" style={{ maxWidth: 420 }}>
                <Card.Body>
                    <Card.Title>My Profile</Card.Title>
                    <div><b>Name:</b> {user?.name}</div>
                    <div><b>Email:</b> {user?.email}</div>
                    <div><b>Phone:</b> {user?.phone}</div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
