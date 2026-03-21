import React from 'react';
import BrutalCard from '../ui/BrutalCard';
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  return (
    <BrutalCard 
      className="p-4 bg-surface border-0 shadow-sm hover:shadow-md transition-all group" 
      style={{ borderRadius: '24px' }}
    >
      <h5 className="serif fw-bold mb-3 line-height-1 group-hover:text-accent transition-colors">{event.title}</h5>
      
      <div className="d-flex flex-column gap-2 mb-4">
        <div className="d-flex align-items-center gap-2 text-secondary small fw-medium">
          <FaCalendarAlt className="text-accent" />
          {event.date || 'TBD'}
        </div>
        <div className="d-flex align-items-center gap-2 text-secondary small fw-medium">
          <FaMapMarkerAlt className="text-accent" />
          {event.location || 'Online'}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-end pt-3 border-top border-border">
         <span className="small text-uppercase fw-bold text-accent tracking-widest" style={{ fontSize: '0.7rem' }}>
           {event.category || 'Literary Event'}
         </span>
         {event.link && (
           <a 
             href={event.link} 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-text hover:text-accent transition-colors"
           >
             <FaExternalLinkAlt size={14} />
           </a>
         )}
      </div>
    </BrutalCard>
  );
};

export default EventCard;