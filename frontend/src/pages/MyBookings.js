import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { bookingAPI } from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        if (!user?.email) return;
        const response = await bookingAPI.getBookings({ userEmail: user.email });
        setBookings(response.data.data);
      } catch (error) {
        toast.error('Failed to fetch bookings');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchBookings();
  }, [user]);

  return (
    <>
      {!user ? (
        <Container className="py-5 text-center">
          <h2>Please login to view your bookings.</h2>
        </Container>
      ) : loading ? (
        <Container className="py-5 text-center">
          <Spinner animation="border" />
        </Container>
      ) : (
        <Container className="py-5">
          <h2 className="mb-4">My Bookings</h2>
          {bookings.length === 0 ? (
            <Alert variant="info">No bookings found.</Alert>
          ) : (
            <Row>
              {bookings.map((booking, idx) => (
                <Col md={6} lg={4} key={booking.id || booking._id || idx} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{booking.vaccineInfo?.name || 'Vaccine'}</Card.Title>
                      <Card.Text>
                        <strong>Status:</strong> <Badge bg={booking.status === 'confirmed' ? 'success' : 'secondary'}>{booking.status}</Badge><br />
                        <strong>Location:</strong> {booking.vaccineInfo?.location || 'N/A'}<br />
                        <strong>Dosage:</strong> {booking.vaccineInfo?.dosage || 'N/A'}<br />
                        <strong>Registered Name:</strong> {booking.userInfo?.name}<br />
                        <strong>Email:</strong> {booking.userInfo?.email}<br />
                        <strong>Phone:</strong> {booking.userInfo?.phone}<br />
                        <strong>Address:</strong> {booking.address}<br />
                        <strong>Notes:</strong> {booking.notes || 'None'}<br />
                        <strong>Registered At:</strong> {new Date(booking.createdAt).toLocaleString()}<br />
                        {Array.isArray(booking.availableSlots) && booking.availableSlots.length > 0 && (
                          <>
                            <hr />
                            <strong>Available Locations & Dates:</strong>
                            <ul style={{ paddingLeft: '1.2em' }}>
                              {booking.availableSlots.map((slot, i) => (
                                <li key={i}>
                                  <span>{slot.area} on {slot.date}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      )}
    </>
  );
}

export default MyBookings;


