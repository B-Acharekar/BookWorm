import React from 'react';
import BrutalCard from '../ui/BrutalCard';
import BrutalButton from '../ui/BrutalButton';

const EventCard = ({ event }) => {
  return (
    <BrutalCard className="h-100">
      <span className="status-badge mb-3 bg-dark text-white d-inline-block" style={{ width: 'fit-content' }}>EVENT</span>
      <h3 className="fw-black mb-2">{event.name}</h3>
      <div className="mb-4">
        <p className="fw-bold mb-1">📍 {event.location}</p>
        <p className="text-muted small mb-0">📅 {event.date}</p>
      </div>
      <p className="flex-grow-1">{event.description}</p>
      <BrutalButton variant="accent" className="w-100 mt-3">Register Details</BrutalButton>
    </BrutalCard>
  );
};

export default EventCard;
