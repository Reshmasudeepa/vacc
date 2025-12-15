import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', age: '', phone: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setForm({
        name: parsed.name || parsed.firstName || '',
        email: parsed.email || '',
        age: parsed.age || '',
        phone: parsed.phone || ''
      });
    }
  }, []);

  if (!user) {
    return (
      <Container className="py-5">
        <Card className="p-4 text-center">
          <h2>User not logged in</h2>
          <p>Please log in to view your profile.</p>
        </Card>
      </Container>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditMode(false);
  };

  return (
    <Container className="py-5">
      <Card className="p-4">
        <h2 className="mb-4">My Profile</h2>
        <Row>
          <Col md={6}>
            {editMode ? (
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <Button variant="success" className="me-2" onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
              </form>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name || user.firstName || ''}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {user.age && <p><strong>Age:</strong> {user.age}</p>}
                {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                <Button variant="primary" className="mt-3" onClick={() => setEditMode(true)}>Edit Profile</Button>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
