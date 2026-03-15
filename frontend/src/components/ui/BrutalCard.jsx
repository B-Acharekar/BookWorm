import React from 'react';
import { motion } from 'framer-motion';

const BrutalCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, translate: '-2px -2px' } : {}}
      className={`brutal-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default BrutalCard;
