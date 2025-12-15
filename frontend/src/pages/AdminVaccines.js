import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PASSCODE = 'admin123';

const styles = {
  container: {
    maxWidth: 900,
    margin: '40px auto',
    padding: 30,
    background: '#f8f9fa',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
  },
  form: {
    display: 'grid',
    gap: 16,
    marginBottom: 40,
    background: '#fff',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  },
  input: {
    padding: '10px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16
  },
  label: {
    fontWeight: 500,
    marginBottom: 4
  },
  button: {
    padding: '10px 20px',
    borderRadius: 6,
    border: 'none',
    background: '#3595e3',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 8
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  },
  th: {
    background: '#3595e3',
    color: '#fff',
    padding: 12,
    fontWeight: 600
  },
  td: {
    padding: 10,
    borderBottom: '1px solid #eee',
    textAlign: 'center'
  },
  statusBtn: {
    padding: '6px 14px',
    borderRadius: 5,
    border: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    background: '#eee',
    color: '#333'
  },
  available: { color: 'green', fontWeight: 600 },
  unavailable: { color: 'red', fontWeight: 600 },
  error: { color: 'red', marginBottom: 10 },
  success: { color: 'green', marginBottom: 10 },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.25)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    background: '#fff',
    padding: 32,
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    minWidth: 320,
    maxWidth: 360
  }
};

const AdminVaccines = () => {
  // State
  const [vaccines, setVaccines] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    dosage: '',
    availability: '',
    location: '',
    availableSlots: 10,
    price: 0,
    ageGroups: ['all'],
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasscode, setShowPasscode] = useState(true);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editVaccine, setEditVaccine] = useState(null);

  // Handlers
  const handleEditClick = (vaccine) => {
    setEditVaccine({ ...vaccine, availability: vaccine.availability ? vaccine.availability.slice(0, 10) : '' });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'ageGroups') {
      setEditVaccine({ ...editVaccine, ageGroups: [value] });
    } else if (type === 'checkbox') {
      setEditVaccine({ ...editVaccine, [name]: checked });
    } else {
      setEditVaccine({ ...editVaccine, [name]: value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.put(`/api/vaccines/${editVaccine.id || editVaccine._id}`, editVaccine);
      setSuccess('Vaccine updated successfully');
      setEditModalOpen(false);
      setEditVaccine(null);
      fetchVaccines();
    } catch (err) {
      setError('Failed to update vaccine');
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditVaccine(null);
  };

  useEffect(() => {
    if (!showPasscode) fetchVaccines();
  }, [showPasscode]);

  const fetchVaccines = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/vaccines');
      setVaccines(res.data.data);
    } catch (err) {
      setError('Failed to fetch vaccines');
    }
    setLoading(false);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'ageGroups') {
      setForm({ ...form, ageGroups: [value] });
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/vaccines', form);
      setSuccess('Vaccine added successfully');
      setForm({
        name: '',
        description: '',
        dosage: '',
        availability: '',
        location: '',
        availableSlots: 10,
        price: 0,
        ageGroups: ['all'],
        isActive: true
      });
      fetchVaccines();
    } catch (err) {
      setError('Failed to add vaccine');
    }
  };

  const handleStatusChange = async (id, isActive) => {
    setError('');
    setSuccess('');
    try {
      await axios.put(`/api/vaccines/${id}`, { isActive });
      setSuccess('Vaccine status updated');
      fetchVaccines();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcodeInput === PASSCODE) {
      setShowPasscode(false);
      setPasscodeError('');
    } else {
      setPasscodeError('Incorrect passcode. Please try again.');
    }
  };

  if (showPasscode) {
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3 style={{ marginBottom: 18, textAlign: 'center' }}>Admin Access</h3>
          <form onSubmit={handlePasscodeSubmit}>
            <label style={styles.label}>Enter Passcode:</label>
            <input
              type="password"
              value={passcodeInput}
              onChange={e => setPasscodeInput(e.target.value)}
              style={{ ...styles.input, width: '100%', marginBottom: 10 }}
              autoFocus
              required
            />
            {passcodeError && <div style={styles.error}>{passcodeError}</div>}
            <button type="submit" style={styles.button}>Enter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', marginBottom: 30, color: '#3595e3' }}>Admin: Manage Vaccines</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={{ marginBottom: 10, color: '#222' }}>Add New Vaccine</h3>
        <label style={styles.label}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={styles.input} />
        <label style={styles.label}>Description</label>
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={styles.input} />
        <label style={styles.label}>Dosage</label>
        <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="Dosage" required style={styles.input} />
        <label style={styles.label}>Availability Date</label>
        <input name="availability" type="date" value={form.availability} onChange={handleChange} required style={styles.input} />
        <label style={styles.label}>Location</label>
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required style={styles.input} />
        <label style={styles.label}>Available Slots</label>
        <input name="availableSlots" type="number" value={form.availableSlots} onChange={handleChange} min="0" required style={styles.input} />
        <label style={styles.label}>Price</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} min="0" required style={styles.input} />
        <label style={styles.label}>Age Group</label>
        <select name="ageGroups" value={form.ageGroups[0]} onChange={handleChange} required style={styles.input}>
          <option value="all">All</option>
          <option value="infant">Infant</option>
          <option value="child">Child</option>
          <option value="adolescent">Adolescent</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
        <label style={styles.label}>
          <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} style={{ marginRight: 8 }} />
          Available
        </label>
        <button type="submit" style={styles.button}>Add Vaccine</button>
      </form>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <h3 style={{ margin: '30px 0 16px', color: '#222' }}>All Vaccines</h3>
      {loading ? <div>Loading...</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Dosage</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Slots</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Age Group</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map(vac => (
                <tr key={vac.id || vac._id}>
                  <td style={styles.td}>{vac.name}</td>
                  <td style={styles.td}>{vac.description}</td>
                  <td style={styles.td}>{vac.dosage}</td>
                  <td style={styles.td}>{vac.availability?.slice(0,10)}</td>
                  <td style={styles.td}>{vac.location}</td>
                  <td style={styles.td}>{vac.availableSlots}</td>
                  <td style={styles.td}>{vac.price}</td>
                  <td style={styles.td}>{vac.ageGroups?.join(', ')}</td>
                  <td style={{ ...styles.td, ...(vac.isActive ? styles.available : styles.unavailable) }}>{vac.isActive ? 'Available' : 'Unavailable'}</td>
                  <td style={styles.td}>
                    <button style={styles.statusBtn} onClick={() => handleStatusChange(vac.id || vac._id, !vac.isActive)}>
                      Set {vac.isActive ? 'Unavailable' : 'Available'}
                    </button>
                    <button style={{...styles.statusBtn, marginLeft: 8, background: '#3595e3', color: '#fff'}} onClick={() => handleEditClick(vac)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Edit Vaccine Modal */}
      {editModalOpen && (
        <div style={{...styles.modalOverlay, zIndex: 2000}}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: 18, textAlign: 'center' }}>Edit Vaccine</h3>
            <form onSubmit={handleEditSubmit}>
              <label style={styles.label}>Name</label>
              <input name="name" value={editVaccine.name} onChange={handleEditChange} required style={styles.input} />
              <label style={styles.label}>Description</label>
              <input name="description" value={editVaccine.description} onChange={handleEditChange} required style={styles.input} />
              <label style={styles.label}>Dosage</label>
              <input name="dosage" value={editVaccine.dosage} onChange={handleEditChange} required style={styles.input} />
              <label style={styles.label}>Availability Date</label>
              <input name="availability" type="date" value={editVaccine.availability} onChange={handleEditChange} required style={styles.input} />
              <label style={styles.label}>Location</label>
              <input name="location" value={editVaccine.location} onChange={handleEditChange} required style={styles.input} />
              <label style={styles.label}>Available Slots</label>
              <input name="availableSlots" type="number" value={editVaccine.availableSlots} onChange={handleEditChange} min="0" required style={styles.input} />
              <label style={styles.label}>Price</label>
              <input name="price" type="number" value={editVaccine.price} onChange={handleEditChange} min="0" required style={styles.input} />
              <label style={styles.label}>Age Group</label>
              <select name="ageGroups" value={editVaccine.ageGroups[0]} onChange={handleEditChange} required style={styles.input}>
                <option value="all">All</option>
                <option value="infant">Infant</option>
                <option value="child">Child</option>
                <option value="adolescent">Adolescent</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
              <label style={styles.label}>
                <input name="isActive" type="checkbox" checked={editVaccine.isActive} onChange={handleEditChange} style={{ marginRight: 8 }} />
                Available
              </label>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <button type="button" style={{ ...styles.button, background: '#aaa' }} onClick={handleEditModalClose}>Cancel</button>
                <button type="submit" style={styles.button}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVaccines;
