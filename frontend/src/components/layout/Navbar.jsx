import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrutalButton from '../ui/BrutalButton';
import ThemeToggle from '../ui/ThemeToggle';

const CustomNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="glass py-2 sticky-top border-bottom border-2 border-dark">
      <Container>
        {/* Brand Section: Fixed logo size and alignment */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold fs-3 serif gap-2">
          <Image 
            src="/public/icons/icon-512.png" 
            alt="Bookworm Logo"
            style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
          /> 
          <span className="tracking-tighter">BOOKWORM</span>
        </Navbar.Brand>
        
        {/* Action Group: Buttons and Toggles */}
        <div className="d-flex align-items-center order-lg-3 gap-3">
          <ThemeToggle />
          
          {user ? (
            <div className="d-flex align-items-center gap-3">
              <Link to="/profile" className="d-none d-md-block">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`} 
                  alt="Profile" 
                  className="rounded-circle border border-2 border-dark" 
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </Link>
              <BrutalButton variant="secondary" className="px-3 py-1 btn-sm" onClick={logout}>
                Logout
              </BrutalButton>
            </div>
          ) : (
            <BrutalButton variant="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </BrutalButton>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-2 border-dark ms-2" />
        </div>

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-2">
          <Nav className="mx-auto fw-bold">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="px-3 text-dark">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/discover" className="px-3 text-dark">Discover</Nav.Link>
                <Nav.Link as={Link} to="/my-books" className="px-3 text-dark">My Books</Nav.Link>
                <Nav.Link as={Link} to="/events" className="px-3 text-dark">Events</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/discover" className="px-3 text-dark">Library</Nav.Link>
                <Nav.Link as={Link} to="/events" className="px-3 text-dark">Local Events</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;