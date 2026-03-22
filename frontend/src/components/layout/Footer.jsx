import React from 'react';
import PageContainer from './PageContainer';

const Footer = () => {
  return (
    <footer className="py-5 border-top bg-surface text-text mt-auto">
      <PageContainer className="d-flex flex-column align-items-center gap-4">
        
        {/* Branding & Logo Section */}
        <div className="text-center animate-fade-in">
          <div className="mb-3 d-flex justify-content-center">
            <img
              src="/icons/icon-512.png" 
              alt="Bookworm Logo"
              className="logo-img"
              style={{
                width: '42px',
                height: '42px',
                objectFit: 'contain',
                filter: 'grayscale(0.8)',
                transition: 'all 0.4s ease',
                opacity: 0.8
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0)';
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(0.8)';
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
          
          <div className="brand-typography">
            <p className="serif display-6 mb-0 tracking-tighter text-gradient">
              Bookworm
            </p>
            <p className="text-uppercase fw-bold small tracking-widest text-muted mt-1" style={{ fontSize: '0.65rem' }}>
              Est. 2026 • Curated Literature & Cultural Discovery
            </p>
          </div>
        </div>

        {/* Minimalist Divider */}
        <div 
          className="bg-accent opacity-20" 
          style={{ width: '40px', height: '2px', borderRadius: '4px' }} 
        />

        {/* Mission Statement */}
        <div className="max-w-md text-center">
          <p className="small fw-medium text-muted serif italic px-4">
            "For those who find themselves within the pages."
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex gap-4 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          <a href="/discover" className="nav-link-footer text-muted text-decoration-none">Discover</a>
          <a href="/events" className="nav-link-footer text-muted text-decoration-none">Events</a>
          <a href="/community" className="nav-link-footer text-muted text-decoration-none">Community</a>
        </nav>

        {/* Copyright */}
        <div className="mt-2 text-center">
          <p className="text-uppercase fw-bold opacity-50 mb-0" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
            © 2026 Bookworm. All Rights Reserved.
          </p>
        </div>

      </PageContainer>
    </footer>
  );
};

export default Footer;