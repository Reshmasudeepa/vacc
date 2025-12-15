import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, Spinner, Modal, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { vaccineAPI, bookingAPI } from '../services/api';

const Vaccines = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState([]);
  const [filteredVaccines, setFilteredVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // Sort state removed
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');

  // Map UI labels to backend age group values
  const ageGroupMap = {
    'all': 'all',
    'Birth – 1 Year': 'infant',
    '1 – 5 Years': 'child_1_5',
    '5 – 10 Years': 'child_5_10',
    '10 – 18 Years': 'adolescent',
    '18 – 50 Years': 'adult',
    '50+ Years': 'senior',
    'Infant': 'infant',
    'Child 1-5': 'child_1_5',
    'Child 5-10': 'child_5_10',
    'Adolescent': 'adolescent',
    'Adult': 'adult',
    'Senior': 'senior'
  };
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    userInfo: {
      name: '',
      email: '',
      phone: ''
    },
    address: '',
    notes: '',
    bookingDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // fetchVaccines must be defined before useEffect
  const fetchVaccines = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        ageGroup: selectedAgeGroup !== 'all' ? selectedAgeGroup : undefined
      };
      const response = await vaccineAPI.getVaccines(params);
      setVaccines(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch vaccines');
      console.error('Error fetching vaccines:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedAgeGroup]);

  useEffect(() => {
    fetchVaccines();
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [fetchVaccines]);



  const filterVaccines = useCallback(() => {
    // Only show available vaccines
    let filtered = vaccines.filter(v => v.isActive !== false);
    // Age group filter
    filtered = selectedAgeGroup === 'all'
      ? filtered
      : filtered.filter(v => v.ageGroups.includes(selectedAgeGroup));
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vaccine =>
        vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaccine.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredVaccines(filtered);
  }, [vaccines, searchTerm, selectedAgeGroup]);

  // Ensure filteredVaccines is updated when dependencies change
  useEffect(() => {
    filterVaccines();
  }, [vaccines, searchTerm, selectedAgeGroup, filterVaccines]);

  const handleAgeGroupChange = (uiAgeGroup) => {
    // Map UI label to backend value
    const backendAgeGroup = ageGroupMap[uiAgeGroup] || uiAgeGroup;
    setSelectedAgeGroup(backendAgeGroup);
  };

  const handleBookVaccine = (vaccine) => {
    setSelectedVaccine(vaccine);
    
    // Auto-fill user details if logged in
    if (user) {
      setBookingForm({
        userInfo: {
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          email: user.email || '',
          phone: user.phone || ''
        },
        address: '',
        notes: '',
        bookingDate: ''
      });
    } else {
      setBookingForm({
        userInfo: { name: '', email: '', phone: '' },
        address: '',
        notes: '',
        bookingDate: ''
      });
    }
    
    setShowBookingModal(true);
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('userInfo.')) {
      const field = name.split('.')[1];
      setBookingForm(prev => ({
        ...prev,
        userInfo: {
          ...prev.userInfo,
          [field]: value
        }
      }));
    } else {
      setBookingForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateBookingForm = () => {
    if (!bookingForm.bookingDate) {
      toast.error('Please select a booking date');
      return false;
    }
    if (!bookingForm.userInfo.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!bookingForm.userInfo.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    
    if (!bookingForm.userInfo.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (!bookingForm.address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingForm.userInfo.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    // Validate phone format
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(bookingForm.userInfo.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    
    // Check if booking date is not in the past
  // No date validation needed for address
    
    return true;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateBookingForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      if (!selectedVaccine || !(selectedVaccine.id || selectedVaccine._id) || !selectedVaccine.name) {
        toast.error('Vaccine information is missing. Please try again.');
        setSubmitting(false);
        return;
      }
      const bookingData = {
        vaccine: selectedVaccine.id || selectedVaccine._id,
        user: user?._id || user?.id,
        bookingDate: bookingForm.bookingDate,
        userInfo: bookingForm.userInfo,
        address: bookingForm.address,
        notes: bookingForm.notes
      };
      const response = await bookingAPI.createBooking(bookingData);
      toast.success('Registration successful! You will be notified when the vaccine becomes available.');
      // Show confirmation message
      const booking = response.data.data;
      const confirmationMessage = booking && booking.vaccineInfo ? `
        🎉 Registration Confirmed!
        
        Vaccine: ${booking.vaccineInfo.name}
        Location: ${booking.vaccineInfo.location}
        Preferred Date: ${new Date(booking.bookingDate).toLocaleDateString()}
        Status: ${booking.status}
        
        📧 We'll send you an email when this vaccine becomes available for your preferred date.
        📱 You can also check your bookings anytime in the "My Bookings" section.
      ` : 'Booking confirmed, but vaccine details are unavailable.';
      toast.info(confirmationMessage, {
        autoClose: 15000
      });
      setShowBookingModal(false);
      setBookingForm({
        userInfo: { name: '', email: '', phone: '' },
        address: '',
        notes: '',
        bookingDate: ''
      });
      // Navigate to my bookings page
      navigate('/my-bookings', { 
        state: { 
          bookingId: booking?._id,
          userEmail: bookingForm.userInfo.email 
        } 
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create booking';
      toast.error(errorMessage);
      console.error('Error creating booking:', error);
    } finally {
      setSubmitting(false);
    }
  };



  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2 className="mb-4">Please login to view vaccine details and book appointments.</h2>
        <Button as={Link} to="/login" variant="primary" size="lg">Login</Button>
      </Container>
    );
  }
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


  // Categorize vaccines by age group using the backend value
  const categorizedVaccines = {
    'infant': filteredVaccines.filter(v => v.ageGroups.includes('infant')),
    'child_1_5': filteredVaccines.filter(v => v.ageGroups.includes('child_1_5')),
    'child_5_10': filteredVaccines.filter(v => v.ageGroups.includes('child_5_10')),
    'adolescent': filteredVaccines.filter(v => v.ageGroups.includes('adolescent')),
    'adult': filteredVaccines.filter(v => v.ageGroups.includes('adult')),
    'senior': filteredVaccines.filter(v => v.ageGroups.includes('senior')),
    'all': filteredVaccines
  };

  // Always use the backend value for displayGroup
  const displayGroup = selectedAgeGroup && selectedAgeGroup in categorizedVaccines ? selectedAgeGroup : 'all';

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-center mb-4">Available Vaccines</h1>
          <p className="lead text-center text-muted mb-5">
            Browse through our comprehensive list of available vaccines
          </p>
        </Col>
      </Row>

      {/* Age Group Selection */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-4 text-center">Select Your Age Group</h5>
              <Row className="g-3">
                {[
                  { value: 'all', label: 'All Ages', icon: '👥', description: 'View all vaccines' },
                  { value: 'Birth – 1 Year', label: 'Birth – 1 Year', icon: '👶', description: 'Birth – 1 Year' },
                  { value: '1 – 5 Years', label: '1 – 5 Years', icon: '🧒', description: '1 – 5 Years' },
                  { value: '5 – 10 Years', label: '5 – 10 Years', icon: '🧒', description: '5 – 10 Years' },
                  { value: '10 – 18 Years', label: '10 – 18 Years', icon: '👦', description: '10 – 18 Years' },
                  { value: '18 – 50 Years', label: '18 – 50 Years', icon: '👨', description: '18 – 50 Years' },
                  { value: '50+ Years', label: '50+ Years', icon: '👴', description: '50+ Years' }
                ].map((ageGroup, idx) => (
                  <Col md={4} lg={2} key={ageGroup.value + '-' + idx}>
                    <Card 
                      className={`h-100 cursor-pointer ${selectedAgeGroup === ageGroupMap[ageGroup.value] ? 'border-primary bg-primary text-white' : 'border-light'}`}
                      onClick={() => handleAgeGroupChange(ageGroup.value)}
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                    >
                      <Card.Body className="text-center p-3">
                        <div className="mb-2" style={{ fontSize: '2rem' }}>
                          {ageGroup.icon}
                        </div>
                        <h6 className="mb-1">{ageGroup.label}</h6>
                        <small className={selectedAgeGroup === ageGroupMap[ageGroup.value] ? 'text-white-50' : 'text-muted'}>
                          {ageGroup.description}
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search Section (Sort removed) */}
      <Row className="mb-4">
        <Col md={12}>
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search vaccines by name, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Results Count */}
      <Row className="mb-4">
        <Col>
          <p className="text-muted">
            Showing {categorizedVaccines[displayGroup].length} of {vaccines.length} vaccines
          </p>
        </Col>
      </Row>

      {/* Vaccines Grid */}
      <Row>
        {categorizedVaccines[displayGroup].length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No vaccines found</h4>
              <p className="text-muted">
                {searchTerm ? 'Try adjusting your search terms' : 'No vaccines are currently available'}
              </p>
            </div>
          </Col>
        ) : (
          categorizedVaccines[displayGroup].map((vaccine, idx) => (
            <Col md={6} lg={4} key={vaccine._id || vaccine.id || idx} className="mb-4">
              <Card className="h-100 card-hover">
                <Card.Body>
                  <div className="mb-3">
                    <Card.Title className="h5">{vaccine.name}</Card.Title>
                  </div>
                  
                  <Card.Text className="text-muted mb-3">
                    {vaccine.description}
                  </Card.Text>

                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Dosage:</strong> {vaccine.dosage}
                    </small>
                  </div>

                  {/* Available date removed as requested */}



                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Age Groups:</strong> {vaccine.ageGroups.map((age, idx) => (
                        <span key={age + '-' + idx}>
                          {age === 'infant' ? 'Infant' :
                          age === 'child' ? 'Child' :
                          age === 'adolescent' ? 'Adolescent' :
                          age === 'adult' ? 'Adult' :
                          age === 'senior' ? 'Senior' : age}
                          {idx !== vaccine.ageGroups.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </small>
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      disabled={vaccine.availableSlots === 0}
                      onClick={() => handleBookVaccine(vaccine)}
                    >
                      {vaccine.availableSlots === 0 ? 'Unavailable' : 'Book Now'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Call to Action */}
      <Row className="mt-5">
        <Col className="text-center">
          <h3>Can't find what you're looking for?</h3>
          <p className="text-muted mb-4">
            Contact us for more information about specific vaccines or special requirements
          </p>
          <Button as={Link} to="/contact" variant="outline-primary">
            Contact Us
          </Button>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Register for {selectedVaccine?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVaccine && (
            <div className="mb-4">
              <Alert variant="info">
                <h6 className="fw-bold mb-2">📅 Availability Information</h6>
                <p className="mb-0">
                  <strong>Location:</strong> {selectedVaccine.location}
                </p>
              </Alert>
              
              <div className="bg-light p-3 rounded">
                <h6 className="fw-bold mb-2">Vaccine Details:</h6>
                <p className="mb-1"><strong>Description:</strong> {selectedVaccine.description}</p>
                <p className="mb-1"><strong>Dosage:</strong> {selectedVaccine.dosage}</p>
                <p className="mb-1"><strong>Price:</strong> ${selectedVaccine.price}</p>
                <p className="mb-0"><strong>Age Groups:</strong> {selectedVaccine.ageGroups.map((age, idx) => (
                  <span key={age + '-' + idx}>
                    {age === 'infant' ? 'Infant' :
                    age === 'child' ? 'Child' :
                    age === 'adolescent' ? 'Adolescent' :
                    age === 'adult' ? 'Adult' :
                    age === 'senior' ? 'Senior' : age}
                    {idx !== selectedVaccine.ageGroups.length - 1 ? ', ' : ''}
                  </span>
                ))}</p>
              </div>
            </div>
          )}

          {!user && (
            <Alert variant="warning">
              <h6 className="fw-bold mb-2">💡 Not logged in?</h6>
              <p className="mb-2">
                You can still register, but we recommend creating an account to track your bookings.
              </p>
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-primary" size="sm">
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="outline-success" size="sm">
                  Sign Up
                </Button>
              </div>
            </Alert>
          )}

          <Form onSubmit={handleBookingSubmit}>
            <h6 className="fw-bold mb-3">
              Personal Information
              {user && <small className="text-success ms-2">✓ Pre-filled from your account</small>}
            </h6>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Booking Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="bookingDate"
                    value={bookingForm.bookingDate}
                    onChange={handleBookingInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="userInfo.name"
                    value={bookingForm.userInfo.name}
                    onChange={handleBookingInputChange}
                    placeholder="Enter your full name"
                    required
                    disabled={user && bookingForm.userInfo.name}
                  />
                  {user && bookingForm.userInfo.name && (
                    <Form.Text className="text-muted">
                      <i className="fas fa-check-circle text-success me-1"></i>
                      Pre-filled from your account
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="userInfo.email"
                    value={bookingForm.userInfo.email}
                    onChange={handleBookingInputChange}
                    placeholder="Enter your email"
                    required
                    disabled={user && bookingForm.userInfo.email}
                  />
                  {user && bookingForm.userInfo.email && (
                    <Form.Text className="text-muted">
                      <i className="fas fa-check-circle text-success me-1"></i>
                      Pre-filled from your account
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="userInfo.phone"
                    value={bookingForm.userInfo.phone}
                    onChange={handleBookingInputChange}
                    placeholder="Enter your phone number"
                    required
                    disabled={user && bookingForm.userInfo.phone}
                  />
                  {user && bookingForm.userInfo.phone && (
                    <Form.Text className="text-muted">
                      <i className="fas fa-check-circle text-success me-1"></i>
                      Pre-filled from your account
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address *</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={bookingForm.address}
                        onChange={handleBookingInputChange}
                        placeholder="Enter your address"
                        required
                      />
                      <Form.Text className="text-muted">
                        <i className="fas fa-info-circle me-1"></i>
                        Please provide your address for the appointment
                      </Form.Text>
                    </Form.Group>
                  </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Additional Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={bookingForm.notes}
                onChange={handleBookingInputChange}
                placeholder="Any special requirements or notes..."
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Creating Booking...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Vaccines;

