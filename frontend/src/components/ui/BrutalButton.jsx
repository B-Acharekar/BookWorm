import React from 'react';
import { motion } from 'framer-motion';

const BrutalButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'brutal-btn-primary',
    secondary: 'brutal-btn-secondary',
    accent: 'brutal-btn-accent',
    outline: 'brutal-btn-outline',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ translate: '-2px -2px' }}
      className={`brutal-btn ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default BrutalButton;
