import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUserService } from "../../services/userService";
import useDonationService from "../../services/donationService";
import { Container, Row, Col, Card, Button, Collapse } from "react-bootstrap";
import { useAxios } from "../../services/api";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { getUserById } = useUserService();
  const { getDonationsByUser } = useDonationService();
  const axios = useAxios();
  const [profile, setProfile] = useState(null);
  const [donations, setDonations] = useState([]);
  const [volunteerRegistrations, setVolunteerRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDonationId, setExpandedDonationId] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      const [profileResponse, donationsResponse, volunteersResponse] =
        await Promise.all([
          getUserById(user.userId),
          getDonationsByUser(user.userId),
          axios.get(`/volunteers/user/${user.userId}`).catch((error) => {
            if (error.response && error.response.status === 404) {
              return { data: [] };
            } else {
              throw error;
            }
          }),
        ]);
      setProfile(profileResponse.data);
      setDonations(donationsResponse.data);
      setVolunteerRegistrations(volunteersResponse.data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      setLoading(false);
    }
  }, [user.userId, getUserById, getDonationsByUser, axios]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } // eslint-disable-next-line
  }, []);

  const toggleExpand = (donationId) => {
    setExpandedDonationId(
      expandedDonationId === donationId ? null : donationId
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleUnregister = async (volunteerId) => {
    try {
      await axios.delete(`/volunteers/${volunteerId}`);
      alert("Successfully unregistered from the event.");
      setVolunteerRegistrations((prev) =>
        prev.filter((volunteer) => volunteer.volunteerId !== volunteerId)
      );
    } catch (error) {
      alert("Failed to unregister from the event.");
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>
          {/* Centered User Profile Card */}
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="p-4 border rounded shadow-sm mb-4">
                <Card.Body>
                  <h2 className="mb-4 text-center">User Profile</h2>
                  <Card.Text>
                    <strong>User ID:</strong> {profile.id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Name:</strong> {profile.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {profile.email}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Donations Section */}
          <h3 className="mb-4 text-center">Donation Details</h3>
          {donations.length > 0 ? (
            <Row>
              {donations.map((donation) => (
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={donation.donationId}
                  className="mb-3 d-flex"
                >
                  <Card className="flex-fill">
                    <Card.Body className="d-flex flex-column">
                      <Card.Text>
                        <strong>Donation ID:</strong> {donation.donationId}
                      </Card.Text>
                      <Card.Text>
                        <strong>Donation Type:</strong> {donation.donationType}
                      </Card.Text>
                      <Card.Text>
                        <strong>Amount:</strong> {donation.amount}
                      </Card.Text>
                      <Button
                        variant="link"
                        onClick={() => toggleExpand(donation.donationId)}
                        aria-controls={`donation-details-${donation.donationId}`}
                        aria-expanded={
                          expandedDonationId === donation.donationId
                        }
                      >
                        {expandedDonationId === donation.donationId
                          ? "Hide Details"
                          : "Show Details"}
                      </Button>
                      <Collapse in={expandedDonationId === donation.donationId}>
                        <div id={`donation-details-${donation.donationId}`}>
                          <Card.Text>
                            <strong>Frequency:</strong> {donation.frequency}
                          </Card.Text>
                          {donation.tributeType && (
                            <Card.Text>
                              <strong>Tribute Type:</strong>{" "}
                              {donation.tributeType}
                            </Card.Text>
                          )}
                          {donation.honoreeName && (
                            <Card.Text>
                              <strong>Honoree Name:</strong>{" "}
                              {donation.honoreeName}
                            </Card.Text>
                          )}
                          <Card.Text>
                            <strong>Message:</strong> {donation.message}
                          </Card.Text>
                          {donation.donorInfo && (
                            <>
                              <Card.Text>
                                <strong>Donor Name:</strong>{" "}
                                {donation.donorInfo.firstName}{" "}
                                {donation.donorInfo.lastName}
                              </Card.Text>
                              <Card.Text>
                                <strong>Donor Email:</strong>{" "}
                                {donation.donorInfo.email}
                              </Card.Text>
                              <Card.Text>
                                <strong>Donor Phone:</strong>{" "}
                                {donation.donorInfo.phone}
                              </Card.Text>
                            </>
                          )}
                        </div>
                      </Collapse>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center text-muted">No donations found.</p>
          )}

          {/* Volunteer Registrations Section */}
          <h3 className="mb-4 text-center">Volunteer Details</h3>
          {volunteerRegistrations.length > 0 ? (
            <Row>
              {volunteerRegistrations.map((volunteer) => (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  key={volunteer.volunteerId}
                  className="mb-3 d-flex"
                >
                  <Card className="flex-fill">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{volunteer.event.name}</Card.Title>
                      <Card.Text>
                        <strong>Event ID:</strong> {volunteer.event.id}
                      </Card.Text>
                      <Card.Text>
                        <strong>Date:</strong> {volunteer.event.date}
                      </Card.Text>
                      <Card.Text>
                        <strong>Location:</strong> {volunteer.event.location}
                      </Card.Text>
                      <Card.Text className="mt-auto">
                        {volunteer.event.description.length > 100
                          ? volunteer.event.description.substring(0, 100) +
                            "..."
                          : volunteer.event.description}
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleUnregister(volunteer.volunteerId)}
                      >
                        Unregister
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center text-muted">
              No volunteer registrations found.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
