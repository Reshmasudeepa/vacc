import React, { useState, useEffect } from 'react';
import 'animate.css';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Google Translate widget loader
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.async = true;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }
      window.googleTranslateElementInit = () => {
        if (!window.googleTranslateElementInitDone) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
          window.googleTranslateElementInitDone = true;
        }
      };
    };
    addGoogleTranslateScript();
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

    return (
      <BootstrapNavbar style={{ backgroundColor: '#3595e3' }} variant="dark" expand="lg" sticky="top" className="animate__animated animate__fadeInDown">
        <Container>
          <BootstrapNavbar.Brand as={Link} to={user ? "/dashboard" : "/"} style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>
            🏥 MediVaxPortal
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/vaccines" className={isActive('/vaccines') ? 'active' : ''}>
                Vaccines
              </Nav.Link>
              {user && (
                <Nav.Link as={Link} to="/my-bookings" className={isActive('/my-bookings') ? 'active' : ''}>
                  My Bookings
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/contact" className={isActive('/contact') ? 'active' : ''}>
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/vaccines" className={isActive('/admin/vaccines') ? 'active' : ''}>
                Admin
              </Nav.Link>
                <Nav.Link as={Link} to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                  Dashboard
                </Nav.Link>
            </Nav>
            <div id="google_translate_element" style={{ marginRight: 16 }}></div>
            <Nav>
              {user ? (
                <NavDropdown title={`Welcome, ${user.name || user.firstName}`} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/my-bookings">
                    My Bookings
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className={isActive('/login') ? 'active' : ''}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className={isActive('/signup') ? 'active' : ''}>
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    );
};

export default Navbar;

