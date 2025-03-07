import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © {new Date().getFullYear()} TogetherWeCan. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
