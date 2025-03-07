import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './Header.css'; // Import the CSS file

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="pl-3">
      <Navbar.Brand href="/">TogetherWeCan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/">
            <Nav.Link className="nav-link-custom">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/donate">
            <Nav.Link className="nav-link-custom">Donate</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/volunteer">
            <Nav.Link className="nav-link-custom">Volunteer</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/events">
            <Nav.Link className="nav-link-custom">Events</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link className="nav-link-custom">Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
