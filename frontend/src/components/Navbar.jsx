import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBookOpen } from 'react-icons/fa';

const CustomNavbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="lg" className="border-bottom border-4 border-dark py-3 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-black fs-3">
          <FaBookOpen className="me-2" /> BOOKWORM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="sharp-corners border-3 border-dark" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fw-bold text-uppercase">
            <Nav.Link as={Link} to="/discover" className="mx-2">Discover</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="mx-2">My Books</Nav.Link>
            <Nav.Link as={Link} to="/" className="mx-2">Events</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="rounded-circle border border-2 border-dark me-3" 
                  style={{ width: '40px', height: '40px' }}
                />
                <Button 
                  variant="none" 
                  className="brutal-btn brutal-btn-secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="none" 
                className="brutal-btn brutal-btn-primary ms-lg-3 mt-3 mt-lg-0"
                onClick={loginWithGoogle}
              >
                Get Started
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
