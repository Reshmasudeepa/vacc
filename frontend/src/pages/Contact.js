import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await contactAPI.sendMessage(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-center mb-4">Contact Us</h1>
          <p className="lead text-center text-muted mb-5">
            Get in touch with us for any questions or support
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mx-auto">
          <Row>
            {/* Contact Form */}
            <Col md={8}>
              <Card>
                <Card.Body className="p-4">
                  <h5 className="mb-4">Send us a Message</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submitting}
                      className="w-100"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Information */}
            <Col md={4}>
              <Card className="h-100">
                <Card.Body className="p-4">
                  <h5 className="mb-4">Contact Information</h5>
                  
                  <div className="mb-4">
                    <h6><i className="fas fa-map-marker-alt text-primary me-2"></i>Address</h6>
                    <p className="text-muted">
                      MediVaxPortal<br />
                      Tuni, 533401<br />
                      Andhra Pradesh, India
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6><i className="fas fa-phone text-primary me-2"></i>Phone</h6>
                    <p className="text-muted">
                      +91 9493661116 <br />
                      +91 7386341416
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6><i className="fas fa-envelope text-primary me-2"></i>Email</h6>
                    <p className="text-muted">
                      MediVaxPortal@gmail.com<br />
                      chandanayalla2006@gmail.com
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6><i className="fas fa-clock text-primary me-2"></i>Business Hours</h6>
                    <p className="text-muted">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4">Frequently Asked Questions</h4>
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <h6>How do I book a vaccination appointment?</h6>
                    <p className="text-muted">
                      Simply go to the "Book Appointment" page, select your preferred vaccine, 
                      fill in your details, and choose your preferred date. You'll receive a 
                      confirmation email with all the details.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6>Can I cancel or reschedule my appointment?</h6>
                    <p className="text-muted">
                      Yes, you can cancel your appointment through the "My Bookings" page. 
                      Please cancel at least 24 hours in advance to avoid any charges.
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-4">
                    <h6>What should I bring to my appointment?</h6>
                    <p className="text-muted">
                      Please bring a valid ID, your booking confirmation, and any relevant 
                      medical documents. Arrive 15 minutes before your scheduled time.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6>Are there any side effects?</h6>
                    <p className="text-muted">
                      Most vaccines have minimal side effects. Common side effects include 
                      mild fever, soreness at injection site, or fatigue. Consult your 
                      healthcare provider if you have concerns.
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;

