import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrutalButton from '../ui/BrutalButton';
import { FaBookOpen } from 'react-icons/fa';

const CustomNavbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="lg" className="border-bottom border-4 border-dark py-3 sticky-top shadow-none">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-black fs-3">
          <FaBookOpen className="me-2" /> BOOKWORM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="sharp-corners border-3 border-dark" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fw-bold text-uppercase">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="mx-2">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/discover" className="mx-2">Discover</Nav.Link>
                <Nav.Link as={Link} to="/my-books" className="mx-2">My Books</Nav.Link>
                <Nav.Link as={Link} to="/events" className="mx-2">Events</Nav.Link>
                <Nav.Link as={Link} to="/community" className="mx-2">Community</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/discover" className="mx-2">Discover</Nav.Link>
                <Nav.Link as={Link} to="/events" className="mx-2">Events</Nav.Link>
              </>
            )}
          </Nav>
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            {user ? (
              <>
                <Link to="/profile" className="me-3">
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="rounded-circle border border-2 border-dark" 
                    style={{ width: '40px', height: '40px' }}
                  />
                </Link>
                <BrutalButton variant="secondary" onClick={logout}>Logout</BrutalButton>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link fw-bold text-uppercase me-3 d-none d-lg-block">Login</Link>
                <BrutalButton variant="primary" onClick={() => navigate('/signup')}>Get Started</BrutalButton>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
