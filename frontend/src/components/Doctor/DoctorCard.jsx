import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.stopPropagation();
    navigate(`/book/${doctor._id}`);
  };

  const handleCardClick = () => {
    navigate(`/doctors/${doctor._id}`);
  };

  const { user } = doctor;
  const photoUrl = user.photo ? `/${user.photo.replace(/\\/g, "/")}` : "https://via.placeholder.com/100x100?text=Doctor";

  return (
    <Card className="mb-3 doctor-card-hover" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <Card.Body>
        <Row>
          <Col xs={3} className="d-flex align-items-center justify-content-center">
            <Image src={photoUrl} roundedCircle width={80} height={80} alt={user.name} />
          </Col>
          <Col>
            <Card.Title>{user.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user.designation || doctor.specialization}
            </Card.Subtitle>
            <Card.Text>
              {user.about && <span>{user.about}<br /></span>}
              <b>Fee:</b> ₹{doctor.fee}
            </Card.Text>
            <Button onClick={handleBook}>Book Appointment</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
