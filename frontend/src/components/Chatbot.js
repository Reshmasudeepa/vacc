import React, { useState } from 'react';
import { Button, Form, InputGroup, Card } from 'react-bootstrap';


const FAQS = [
  {
    q: 'How do I book a vaccination appointment?',
    a: 'Register/login, choose your vaccine and center, select a time slot, and confirm your booking.'
  },
  {
    q: 'Can I reschedule or cancel my booking?',
    a: 'Yes, from the “My Bookings” section you can modify or cancel anytime.'
  },
  {
    q: 'Is there any charge for booking?',
    a: 'Most government vaccines are free, but some may have a cost depending on the center.'
  },
  {
    q: 'What should I bring to my appointment?',
    a: 'Please bring a valid ID, your booking confirmation, and any relevant medical documents.'
  },
  {
    q: 'Are there any side effects?',
    a: 'Most vaccines have minimal side effects. Common side effects include mild fever, soreness at injection site, or fatigue.'
  },
  {
    q: 'How do I contact support?',
    a: 'You can use the Contact Us page to send us a message. We will respond to your email as soon as possible.'
  },
  {
    q: 'Can I book for my family members?',
    a: 'Yes, you can book appointments for your family members using your account.'
  },
  {
    q: 'What if I miss my appointment?',
    a: 'If you miss your appointment, please reschedule as soon as possible from the My Bookings section.'
  },
  {
    q: 'How do I know which vaccines I need?',
    a: 'You can browse the Vaccines page for age group recommendations or consult your healthcare provider.'
  },
  {
    q: 'Is my data safe?',
    a: 'Yes, your data is encrypted and protected. We value your privacy and security.'
  }
];




// Simple fuzzy string similarity (Levenshtein distance ratio)
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) return 1;
  const matrix = [];
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  const distance = matrix[b.length][a.length];
  return 1 - distance / Math.max(a.length, b.length);
}

function getBotResponse(input) {
  input = input.toLowerCase().trim();
  // Greetings
  if (["hi", "hello", "hey", "good morning", "good afternoon", "good evening"].some(g => input.includes(g))) {
    return "Hello! How can I assist you with your vaccination needs today?";
  }
  // Farewell
  if (["bye", "goodbye", "see you", "thanks", "thank you"].some(f => input.includes(f))) {
    return "You're welcome! If you have more questions, just ask. Stay healthy!";
  }
  // Small talk
  if (input.includes("how are you")) {
    return "I'm just a virtual assistant, but I'm here to help you!";
  }
  // Find best FAQ match by similarity
  let bestScore = 0;
  let bestAnswer = null;
  for (const faq of FAQS) {
    const score = similarity(input, faq.q);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.a;
    }
  }
  // Only answer if similarity is strong enough
  if (bestScore > 0.65) {
    return bestAnswer;
  }
  // Default fallback
  return "I'm here to help! Please ask a specific question about booking, rescheduling, charges, vaccine info, or support.";
}


const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your virtual assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const botMsg = { from: 'bot', text: getBotResponse(input) };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* Floating message icon */}
      {!open && (
        <button
          aria-label="Open chatbot"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 9999,
            background: '#3595e3',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 60,
            height: 60,
            boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
            fontSize: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          <span role="img" aria-label="Chat">💬</span>
        </button>
      )}
      {/* Chatbot window */}
      {open && (
        <Card style={{ position: 'fixed', bottom: 24, right: 24, width: 340, zIndex: 9999, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <span>💬 Virtual Assistant</span>
            <button
              aria-label="Close chatbot"
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}
            >
              ×
            </button>
          </Card.Header>
          <Card.Body style={{ maxHeight: 320, overflowY: 'auto', background: '#f8f9fa', padding: 12 }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', marginBottom: 8 }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: msg.from === 'user' ? '#d1e7dd' : '#e2e3e5',
                    color: '#222',
                    borderRadius: 12,
                    padding: '6px 12px',
                    maxWidth: '80%',
                    fontSize: 15
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </Card.Body>
          <Card.Footer style={{ background: '#fff' }}>
            <Form onSubmit={handleSend} autoComplete="off">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Type your question..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  aria-label="Chatbot input"
                />
                <Button type="submit" variant="primary">Send</Button>
              </InputGroup>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
