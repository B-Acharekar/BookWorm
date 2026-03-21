import React from 'react';
import PageContainer from './PageContainer';

const Footer = () => {
  return (
    <footer className="py-8 border-top border-1 border-light-subtle bg-paper text-dark">
      <PageContainer className="d-flex flex-column align-items-center gap-4">
        
        {/* Branding & Logo Section */}
        <div className="text-center">
          <div className="logo-wrapper mb-3">
            <img
              src="/public/icons/icon-512.png" 
              alt="Bookworm Logo"
              className="logo-img"
            />
          </div>
          
          <div className="brand-typography">
            <p className="font-serif italic display-6 mb-0 tracking-tighter">
              Book<span className="text-muted-gold">worm</span>
            </p>
            <p className="text-uppercase fw-bold small tracking-widest opacity-50 mt-1" style={{ fontSize: '0.65rem' }}>
              Est. 2026 • Curated Literature & Cultural Discovery
            </p>
          </div>
        </div>

        {/* Minimalist Divider */}
        <div 
          className="bg-dark opacity-10" 
          style={{ width: '40px', height: '1px' }} 
        />

        {/* Mission Statement */}
        <div className="max-w-md text-center">
          <p className="small fw-medium opacity-60 font-serif italic px-4">
            "For those who find themselves within the pages."
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex gap-4 text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          <a href="/discover" className="nav-link-custom">Discover</a>
          <a href="/events" className="nav-link-custom">Events</a>
          <a href="/community" className="nav-link-custom">Community</a>
        </nav>

        {/* Copyright */}
        <div className="mt-2 text-center">
          <p className="text-uppercase fw-bold opacity-25 mb-0" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
            © 2026 Bookworm. All Rights Reserved.
          </p>
        </div>

      </PageContainer>

      <style jsx>{`
        .bg-paper {
          background-color: #F9F7F2;
          background-image: url("https://www.transparenttextures.com/patterns/felt.png");
        }
        .font-serif {
          font-family: 'Playfair Display', 'EB Garamond', serif;
        }
        .text-muted-gold {
          color: #A69374;
        }
        .tracking-tighter {
          letter-spacing: -0.04em;
        }
        .logo-wrapper {
          opacity: 0.75;
          filter: grayscale(1);
          transition: all 0.5s ease;
        }
        .logo-wrapper:hover {
          filter: grayscale(0);
          opacity: 1;
        }
        .logo-img {
          width: 45px;
          height: 45px;
          object-fit: contain;
        }
        .nav-link-custom {
          text-decoration: none;
          color: #2D2D2D;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .nav-link-custom:hover {
          opacity: 1;
        }
      `}</style>
    </footer>
  );
};

export default Footer;