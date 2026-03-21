import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrutalButton from '../ui/BrutalButton';
import ThemeToggle from '../ui/ThemeToggle';
import { FaBook } from 'react-icons/fa';

const CustomNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="glass py-3 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold fs-3 serif">
          <FaBook className="me-2 text-accent" /> BOOKWORM
        </Navbar.Brand>
        
        <div className="d-flex align-items-center order-lg-3 gap-2">
          <ThemeToggle />
          {user ? (
            <div className="d-flex align-items-center gap-3 ms-2">
              <Link to="/profile" className="d-none d-md-block">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} 
                  alt="Profile" 
                  className="rounded-full shadow-sm" 
                  style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                />
              </Link>
              <BrutalButton variant="secondary" className="px-3 py-2 small" onClick={logout}>
                Logout
              </BrutalButton>
            </div>
          ) : (
            <BrutalButton variant="primary" className="ms-2" onClick={() => navigate('/signup')}>
              Sign Up
            </BrutalButton>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none ms-2" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-2">
          <Nav className="mx-auto fw-medium">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="px-3">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/discover" className="px-3">Discover</Nav.Link>
                <Nav.Link as={Link} to="/my-books" className="px-3">My Books</Nav.Link>
                <Nav.Link as={Link} to="/events" className="px-3">Events</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/discover" className="px-3">Library</Nav.Link>
                <Nav.Link as={Link} to="/events" className="px-3">Local Events</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
