import React, { useEffect, useState } from "react";
import { useEventService } from "../../services/eventService";
import { Card, Button, Row, Col, Spinner, Modal, Form } from "react-bootstrap";

const EventsAdmin = () => {
  const { getAllEvents, addEvent, updateEvent, deleteEvent } =
    useEventService();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    fetchEvents(); // eslint-disable-next-line
  }, []); 

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleAddEvent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newEvent = Object.fromEntries(formData.entries());

    try {
      await addEvent(newEvent);
      fetchEvents();
      setShowModal(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleUpdateEvent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedEvent = Object.fromEntries(formData.entries());

    try {
      await updateEvent(currentEvent.id, updatedEvent);
      fetchEvents();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const openModal = (event = null) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
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
      <h2 className="mb-4 text-center">Manage Events</h2>
      <div className="text-center mb-4">
        <Button onClick={() => openModal()}>Add Event</Button>
      </div>
      <Row className="mt-4">
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
                  variant="warning"
                  onClick={() => openModal(event)}
                  className="mt-auto"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="mt-2"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEvent ? "Update Event" : "Add Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={currentEvent ? handleUpdateEvent : handleAddEvent}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={currentEvent?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="location" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                defaultValue={currentEvent?.location || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="date" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                defaultValue={currentEvent?.date || ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={currentEvent?.description || ""}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {currentEvent ? "Update Event" : "Add Event"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventsAdmin;
