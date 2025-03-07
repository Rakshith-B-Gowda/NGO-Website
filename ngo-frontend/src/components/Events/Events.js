import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useAxios } from "../../services/api";

const Events = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [volunteering, setVolunteering] = useState({});

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, [axios]);

  const handleVolunteer = (eventId) => {
    setVolunteering((prev) => ({ ...prev, [eventId]: true }));
    axios
      .post(`/volunteers/register/${user.userId}/${eventId}`)
      .then(() => {
        alert("You have successfully volunteered for the event!");
        setVolunteering((prev) => ({ ...prev, [eventId]: false }));
      })
      .catch((error) => {
        setVolunteering((prev) => ({ ...prev, [eventId]: false }));
        if (error.response) {
          if (error.response.status === 409) {
            // Handle 409 Conflict error
            alert("You are already registered for this event.");
          } else {
            // Handle other errors
            console.error("Error volunteering for event:", error);
            alert("An error occurred while volunteering for the event.");
          }
        } else {
          // Handle network or other errors without a response
          console.error("Error volunteering for event:", error);
          alert("An error occurred while volunteering for the event.");
        }
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4">Upcoming Events</h2>
      <Row>
        {events.map((event) => (
          <Col xs={12} md={6} lg={4} key={event.id} className="mb-4 d-flex">
            <Card className="flex-fill">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {event.location}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {event.date}
                </Card.Text>
                <Card.Text>{event.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleVolunteer(event.id)}
                  disabled={volunteering[event.id]}
                  className="mt-auto"
                >
                  {volunteering[event.id] ? "Volunteering..." : "Volunteer"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Events;
