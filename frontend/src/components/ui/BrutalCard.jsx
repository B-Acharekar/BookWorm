import React from 'react';
import { motion } from 'framer-motion';

const BrutalCard = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { y: -5, boxShadow: 'var(--shadow-lg)' } : {}}
      onClick={onClick}
      className={`premium-card p-4 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default BrutalCard;
