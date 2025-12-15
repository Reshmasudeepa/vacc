import React from 'react';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatusCheck from '../components/StatusCheck';
import Chatbot from '../components/Chatbot';

const Home = () => {
  return (
    <div>
      {/* Status Check */}
      <Container className="py-3">
        <StatusCheck />
      </Container>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Book Your Vaccination Appointment
              </h1>
              <p className="lead mb-4">
                Protect yourself and your community by booking your vaccination appointment 
                through our secure and easy-to-use platform. Find available vaccines, 
                choose your preferred date, and get vaccinated safely.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/vaccines" variant="light" size="lg">
                  View Vaccines
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image mb-3">
                <i className="fas fa-syringe" style={{ fontSize: '200px', opacity: 0.3 }}></i>
              </div>
              <img
                src="/img1.jpg"
                alt="Vaccination"
                className="img-fluid mb-4"
                style={{ maxWidth: '500px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>


      {/* Why Vaccination Matters Section (like image) */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-4">
            <Col md={10} lg={8}>
              <h2 className="fw-bold text-center mb-4" style={{fontSize: '2.5rem'}}>Why Vaccination Matters</h2>
              <p className="lead text-center mb-5" style={{fontSize: '1.25rem'}}>
                Choose from a wide range of vaccines and get your appointment booked at the nearest certified center. Safe, quick, and hassle-free.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Row className="g-4">
                <Col md={6} lg={3}>
                  <div style={{border: '1.5px solid #3595e3', borderRadius: '16px', background: '#f9fafd', padding: '1.5rem', height: '100%', display: 'flex', alignItems: 'flex-start'}}>
                    <span className="me-3"><i className="fas fa-check-circle fa-2x text-success"></i></span>
                    <div className="fw-semibold">Protects you and your family from life-threatening diseases</div>
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div style={{border: '1.5px solid #3595e3', borderRadius: '16px', background: '#f9fafd', padding: '1.5rem', height: '100%', display: 'flex', alignItems: 'flex-start'}}>
                    <span className="me-3"><i className="fas fa-check-circle fa-2x text-success"></i></span>
                    <div className="fw-semibold">Strengthens community health and safety</div>
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div style={{border: '1.5px solid #3595e3', borderRadius: '16px', background: '#f9fafd', padding: '1.5rem', height: '100%', display: 'flex', alignItems: 'flex-start'}}>
                    <span className="me-3"><i className="fas fa-check-circle fa-2x text-success"></i></span>
                    <div className="fw-semibold">Recommended by WHO and health authorities</div>
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div style={{border: '1.5px solid #3595e3', borderRadius: '16px', background: '#f9fafd', padding: '1.5rem', height: '100%', display: 'flex', alignItems: 'flex-start'}}>
                    <span className="me-3"><i className="fas fa-check-circle fa-2x text-success"></i></span>
                    <div className="fw-semibold">Easy, safe, and government-approved</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>


      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">Why Choose Our System?</h2>
              <p className="lead text-muted">
                We provide a comprehensive and user-friendly vaccination booking experience
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 card-hover text-center p-4">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-search fa-3x text-primary"></i>
                  </div>
                  <Card.Title>Easy Search</Card.Title>
                  <Card.Text>
                    Browse through available vaccines with detailed information 
                    including descriptions, dosage, and availability.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 card-hover text-center p-4">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-calendar-check fa-3x text-primary"></i>
                  </div>
                  <Card.Title>Simple Booking</Card.Title>
                  <Card.Text>
                    Book your appointment in just a few clicks. Choose your 
                    preferred date and location for vaccination.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 card-hover text-center p-4">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-user-check fa-3x text-primary"></i>
                  </div>
                  <Card.Title>Track Bookings</Card.Title>
                  <Card.Text>
                    Keep track of all your vaccination appointments and 
                    manage them easily from your dashboard.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">What Our Users Say</h2>
              <p className="lead text-muted">Real feedback from people who booked their vaccines with us</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-user-circle fa-2x text-primary"></i>
                  </div>
                  <blockquote className="blockquote mb-0">
                    <p>"Booking my vaccine was so easy and quick. The reminders were super helpful!"</p>
                    <footer className="blockquote-footer mt-2">Priya S., <cite title="Source Title">Hyderabad</cite></footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-user-circle fa-2x text-primary"></i>
                  </div>
                  <blockquote className="blockquote mb-0">
                    <p>"I could find all the information I needed and book for my parents too. Great service!"</p>
                    <footer className="blockquote-footer mt-2">Rahul M., <cite title="Source Title">Bangalore</cite></footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="mb-3">
                    <i className="fas fa-user-circle fa-2x text-primary"></i>
                  </div>
                  <blockquote className="blockquote mb-0">
                    <p>"The process was smooth and the support team answered all my questions promptly."</p>
                    <footer className="blockquote-footer mt-2">Anjali T., <cite title="Source Title">Delhi</cite></footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>


      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="display-5 fw-bold mb-4">Ready to Get Vaccinated?</h2>
              <p className="lead mb-4">
                Book your appointment today and take the first step towards better health
              </p>
              <div className="mt-4">
                <h5 className="text-primary">Login to book your appointment and access all features!</h5>
                <Button as={Link} to="/login" variant="primary" size="lg" className="mt-2">
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h2 className="fw-bold mb-4 text-center">Frequently Asked Questions</h2>
              <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Q1. How do I book a vaccination appointment?</Accordion.Header>
                  <Accordion.Body>
                    A1. Register/login, choose your vaccine and center, select a time slot, and confirm your booking.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Q2. Can I reschedule or cancel my booking?</Accordion.Header>
                  <Accordion.Body>
                    A8. Yes, from the “My Bookings” section you can modify or cancel anytime.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Q3. Is there any charge for booking?</Accordion.Header>
                  <Accordion.Body>
                    A9. Most government vaccines are free, but some may have a cost depending on the center.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
  <Chatbot />
    </div>
  );
};

export default Home;

