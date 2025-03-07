import React from "react";
import { Container } from "react-bootstrap";

const Unauthorized = () => {
  return (
    <Container className="mt-5 text-center">
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
    </Container>
  );
};

export default Unauthorized;
