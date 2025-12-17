import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css';

const Footer = () => {
  return (
  <footer className="footer animate__animated animate__fadeInUp">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Vaccination Booking System</h5>
            <p>
              A comprehensive platform for managing vaccination appointments 
              and ensuring public health safety.
            </p>
          </Col>
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/vaccines" className="text-light">Vaccines</a></li>
              <li><a href="/book" className="text-light">Book Appointment</a></li>
              <li><a href="/my-bookings" className="text-light">My Bookings</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Contact Info</h6>
            <ul className="list-unstyled">
              <li>📧 MediVaxPortal@gmail.com</li>
              <li>📞 +91 9493661116</li>
              <li>📍 MediVaxPortal<br/>Tuni, 533401<br/>India</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 Vaccination Booking System. All rights reserved...</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

