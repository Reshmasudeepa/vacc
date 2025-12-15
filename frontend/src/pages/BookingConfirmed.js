import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const confettiColors = ['#FFD600', '#FF6F00', '#00C853', '#2962FF', '#FF1744'];

function Confetti() {
  // Generate 20 confetti pieces
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%', pointerEvents: 'none' }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const left = Math.random() * 90 + '%';
        const delay = Math.random() * 1.5 + 's';
        const color = confettiColors[i % confettiColors.length];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top: 0,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: color,
              animation: `fall 1.5s ${delay} ease-in-out forwards`,
              opacity: 0.8,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const BookingConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFFCF7',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Confetti />
      <div className="animate__animated animate__fadeInDown" style={{ marginBottom: 32 }}>
        <div style={{
          background: '#2ecc71',
          borderRadius: '50%',
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 4px 16px rgba(44,204,113,0.15)',
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#2ecc71" />
            <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <h1 style={{ fontWeight: 700, fontSize: 32, margin: 0, color: '#222', textAlign: 'center' }}>Booking Confirmed</h1>
      <p style={{ fontSize: 20, color: '#555', margin: '16px 0 0 0', textAlign: 'center' }}>What's next?</p>
      <p style={{ fontSize: 16, color: '#666', margin: '8px 0 32px 0', textAlign: 'center', maxWidth: 350 }}>
        You will receive a confirmation email with all the details.
      </p>
      <button
        className="animate__animated animate__fadeInUp"
        style={{
          background: '#2196f3',
          color: '#fff',
          border: 'none',
          borderRadius: 28,
          padding: '16px 40px',
          fontSize: 18,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
          marginTop: 8,
        }}
        onClick={() => navigate('/dashboard')}
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default BookingConfirmed;
