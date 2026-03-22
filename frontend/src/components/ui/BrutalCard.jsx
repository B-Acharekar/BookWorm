import React from 'react';
import { motion } from 'framer-motion';

const BrutalCard = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { 
        y: -6, 
        boxShadow: 'var(--shadow-xl)',
        borderColor: 'var(--accent)'
      } : {}}
      transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
      onClick={onClick}
      className={`premium-card p-4 modern-shadow ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default BrutalCard;
