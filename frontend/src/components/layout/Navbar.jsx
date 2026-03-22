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
    <Navbar
      expand="lg"
      className="glass py-2 py-lg-3 sticky-top border-bottom"
    >
      <Container fluid="lg">
        
        {/* ✅ BRAND */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold fs-5 fs-lg-3 serif gap-2 text-gradient"
        >
          <Image
            src="/public/icons/icon-512.png"
            alt="Bookworm Logo"
            style={{ width: '34px', height: '34px', objectFit: 'contain' }}
          />
          <span className="tracking-tighter">BOOKWORM</span>
        </Navbar.Brand>

        {/* ✅ RIGHT SIDE */}
        <div className="d-flex align-items-center order-lg-3">

          {/* Desktop-only actions */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <ThemeToggle />

            {user ? (
              <>
                <Link to="/profile">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${
                        user.displayName || 'User'
                      }&background=random`
                    }
                    alt="Profile"
                    className="rounded-circle border shadow-sm"
                    style={{ width: '36px', height: '36px' }}
                  />
                </Link>

                <BrutalButton
                  variant="secondary"
                  onClick={logout}
                >
                  Logout
                </BrutalButton>
              </>
            ) : (
              <>
                <BrutalButton
                  variant="outline-dark"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </BrutalButton>

                <BrutalButton
                  variant="primary"
                  onClick={() => navigate('/signup')}
                >
                  Join
                </BrutalButton>
              </>
            )}
          </div>

          {/* ✅ TOGGLE */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="ms-2 border-0 shadow-none"
          />
        </div>

        {/* ✅ COLLAPSE MENU */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="order-lg-2 mt-3 mt-lg-0"
        >
          <Nav className="mx-auto text-center text-lg-start fw-medium">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/discover">Discover</Nav.Link>
                <Nav.Link as={Link} to="/my-books">My Books</Nav.Link>
                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                <Nav.Link as={Link} to="/community">Community</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/discover">Library</Nav.Link>
                <Nav.Link as={Link} to="/events">Local Events</Nav.Link>
              </>
            )}
          </Nav>

          {/* ✅ MOBILE DROPDOWN (NO profile, NO theme toggle) */}
          <div className="d-lg-none mt-3 pt-3 border-top">
            <div className="d-flex flex-column gap-2">

              {user ? (
                <BrutalButton onClick={logout}>
                  Logout
                </BrutalButton>
              ) : (
                <>
                  <BrutalButton
                    variant="outline-dark"
                    onClick={() => navigate('/login')}
                  >
                    Log In
                  </BrutalButton>

                  <BrutalButton
                    variant="primary"
                    onClick={() => navigate('/signup')}
                  >
                    Join Now
                  </BrutalButton>
                </>
              )}

            </div>
          </div>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default CustomNavbar;