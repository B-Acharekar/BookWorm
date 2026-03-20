import React from 'react';
import BrutalCard from '../ui/BrutalCard';
import BrutalButton from '../ui/BrutalButton';

const EventCard = ({ event }) => {
  // Generates a Google Search link for the specific event
  // Updated to include the year 2026 for high-relevance search
  const handleKnowMore = () => {
    const query = encodeURIComponent(`${event.title} ${event.location} March 2026`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <BrutalCard className="h-100 d-flex flex-column border-4 border-dark shadow-none bg-white p-4">
      {/* Category Badge */}
      <div className="mb-3">
        <span className="bg-primary text-white px-3 py-1 fw-black text-uppercase border-2 border-dark" style={{ fontSize: '0.8rem' }}>
          LIT EVENT
        </span>
      </div>
      
      {/* Title */}
      <h3 className="fw-black mb-3 text-uppercase lh-1" style={{ letterSpacing: '-1.5px', fontSize: '1.75rem' }}>
        {event.title}
      </h3>
      
      {/* Metadata */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-1">
          <span className="me-2">📍</span>
          <span className="fw-bold text-uppercase" style={{ fontSize: '0.9rem' }}>{event.location}</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">📅</span>
          <span className="fw-bold text-muted small">{event.date}</span>
        </div>
      </div>
      
      {/* Description with Brutalist Left Border */}
      <p className="flex-grow-1 border-start border-4 border-dark ps-3 mb-4 fw-medium" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>
        {event.description}
      </p>

      {/* Action Button */}
      <BrutalButton 
        variant="accent" 
        className="w-100 py-3 text-uppercase fw-black border-3 border-dark"
        onClick={handleKnowMore}
      >
        KNOW MORE
      </BrutalButton>
    </BrutalCard>
  );
};

export default EventCard;