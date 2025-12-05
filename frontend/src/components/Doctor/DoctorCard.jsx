import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiCalendar, FiUser } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const getStaticBase = () => {
  const api = import.meta.env.VITE_API_BASE_URL || "";
  return api.replace(/\/api\/?$/, "");
};

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.stopPropagation();
    navigate(`/book/${doctor._id}`);
  };

  const handleCardClick = () => {
    navigate(`/doctors/${doctor._id}`);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    navigate(`/doctors/${doctor._id}`);
  };

  const { user } = doctor || {};
  const staticBase = getStaticBase();
  const photoPath = user?.photo ? user.photo.replace(/\\/g, "/") : "";
  const photoUrl = photoPath ? `${staticBase}/${photoPath}` : "https://via.placeholder.com/100x100?text=Doctor";

  return (
    <Card className="mb-3" style={{ cursor: "pointer" }} onClick={handleCardClick}>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3} className="d-flex align-items-center justify-content-center">
            <Image
              src={photoUrl}
              roundedCircle
              width={100}
              height={100}
              alt={user?.name}
              onClick={handleImageClick}
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
          </Col>
          <Col>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <FiBriefcase className="me-1" /> {user?.designation || doctor?.specialization}
            </Card.Subtitle>
            <Card.Text>
              {user?.about && <span><FiUser className="me-1" />{user.about}<br /></span>}
              <b><FaRupeeSign className="me-1" />Fee:</b> ₹{doctor?.fee}
            </Card.Text>
            <Button onClick={handleBook}><FiCalendar className="me-1" /> Book Appointment</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
