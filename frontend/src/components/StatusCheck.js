import React, { useState, useEffect } from 'react';

const statusStyles = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  zIndex: 9999,
  minWidth: '25px',
  padding: '5px 10px',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '15px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: '#fff',
  border: '1.5px solid',
};

const getStatusProps = (status) => {
  if (status === 'checking') {
    return {
      color: '#888',
      borderColor: '#bdbdbd',
      icon: <span style={{fontSize: '1.1em'}}>⏳</span>,
      text: 'Checking...'
    };
  }
  if (status === 'success') {
    return {
      color: '#2e7d32',
      borderColor: '#43a047',
      icon: <span style={{fontSize: '1.1em'}}>🟢</span>,
      text: 'Connected'
    };
  }
  return {
    color: '#c62828',
    borderColor: '#e53935',
    icon: <span style={{fontSize: '1.1em'}}>🔴</span>,
    text: 'Not Connected'
  };
};

const StatusCheck = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };
    checkStatus();
  }, []);

  const { color, borderColor, icon, text } = getStatusProps(status);

  return (
    <div style={{ ...statusStyles, color, borderColor }}>
      {icon} {text}
    </div>
  );
};

export default StatusCheck;
