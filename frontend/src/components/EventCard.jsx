import React from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
  return (
    <motion.div 
      className="brutal-card h-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="status-badge mb-2 bg-dark text-white">EVENT</span>
      <h3 className="mb-2">{event.title}</h3>
      <p className="fw-bold mb-1">📍 {event.location}</p>
      <p className="text-muted small mb-3">📅 {event.date}</p>
1      <p>{event.description}</p>
      <button className="brutal-btn brutal-btn-accent w-100">Details</button>
    </motion.div>
  );
};

export default EventCard;
