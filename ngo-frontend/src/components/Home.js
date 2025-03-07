import React, { useContext, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useUserService } from "../services/userService";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { getUserById } = useUserService();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user && user.userId) {
      getUserById(user.userId).then((response) => {
        setUserProfile(response.data);
      });
    }
  }, [user, getUserById]);

  const handleDonateClick = () => {
    window.location.href = "/donate";
  };

  return (
    <Container>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-6 fw-bold">
            Welcome, {userProfile ? userProfile.name : "Guest"} to TogetherWeCan NGO{" "}
          </h1>
          <p className="col-md-12 fs-4">
            We are dedicated to making the world a better place through various
            initiatives.
          </p>
          <Button variant="primary" onClick={handleDonateClick}>Donate</Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
