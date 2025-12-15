import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookingAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchUserBookings(JSON.parse(userData).email);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserBookings = async (email) => {
    try {
      setLoading(true);
      const response = await bookingAPI.getBookings({ userEmail: email });
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch your bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending' },
      confirmed: { variant: 'success', text: 'Confirmed' },
      completed: { variant: 'info', text: 'Completed' },
      cancelled: { variant: 'danger', text: 'Cancelled' }
    };

    const config = statusConfig[status] || { variant: 'secondary', text: status };
    return config;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Welcome Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">
              Welcome back, {user?.name || user?.firstName}!
            </h1>
            <p className="lead text-muted">
              Manage your vaccination appointments and stay healthy
            </p>
          </div>
        </Col>
      </Row>

      {/* Quick Actions (Book Appointment removed) */}
      <Row className="mb-5">
        <Col md={{ span: 4, offset: 2 }} className="mb-3">
          <Card className="h-100 card-hover text-center">
            <Card.Body>
              <div className="mb-3">
                <i className="fas fa-search fa-3x text-primary"></i>
              </div>
              <Card.Title>Browse Vaccines</Card.Title>
              <Card.Text>
                Explore available vaccines and find the right one for you
              </Card.Text>
              <Button as={Link} to="/vaccines" variant="primary">
                View Vaccines
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 card-hover text-center">
            <Card.Body>
              <div className="mb-3">
                <i className="fas fa-user-edit fa-3x text-info"></i>
              </div>
              <Card.Title>Update Profile</Card.Title>
              <Card.Text>
                Keep your personal information up to date
              </Card.Text>
              <Button as={Link} to="/profile" variant="info">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Your Recent Bookings</h5>
              <Button as={Link} to="/my-bookings" variant="outline-primary" size="sm">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              {bookings.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                  <h5>No bookings yet</h5>
                  <p className="text-muted mb-4">
                    Start by browsing available vaccines and booking your first appointment
                  </p>
                  <Button as={Link} to="/vaccines" variant="primary">
                    Browse Vaccines
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Vaccine</th>
                        <th>Location</th>
                        <th>Booking Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((booking) => {
                        const statusConfig = getStatusBadge(booking.status);
                        // Defensive: Only render if vaccineInfo exists
                        if (!booking.vaccineInfo) {
                          return (
                            <tr key={booking._id}>
                              <td colSpan="5" className="text-danger text-center">
                                Vaccine information unavailable
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={booking._id}>
                            <td>
                              <strong>{booking.vaccineInfo.name}</strong>
                            </td>
                            <td>{booking.vaccineInfo.location}</td>
                            <td>{formatDate(booking.bookingDate)}</td>
                            <td>
                              <span className={`badge bg-${statusConfig.variant}`}>
                                {statusConfig.text}
                              </span>
                            </td>
                            <td>
                              <Button
                                as={Link}
                                to="/my-bookings"
                                variant="outline-primary"
                                size="sm"
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Health Tips */}
      <Row className="mt-5">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <h5 className="fw-bold mb-3">💡 Health Tips</h5>
              <Row>
                <Col md={4}>
                  <div className="mb-3">
                    <h6>Stay Hydrated</h6>
                    <p className="text-muted small mb-0">
                      Drink plenty of water before and after your vaccination
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <h6>Get Rest</h6>
                    <p className="text-muted small mb-0">
                      Ensure you get adequate sleep the night before your appointment
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="mb-3">
                    <h6>Eat Well</h6>
                    <p className="text-muted small mb-0">
                      Have a light meal before your vaccination appointment
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

export default Dashboard;
