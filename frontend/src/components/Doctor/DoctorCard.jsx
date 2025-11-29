import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const handleBook = () => {
    navigate(`/book/${doctor._id}`);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{doctor.user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {doctor.specialization}
        </Card.Subtitle>
        <Card.Text>Fee: ₹{doctor.fee}</Card.Text>
        <Button onClick={handleBook}>Book Appointment</Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
