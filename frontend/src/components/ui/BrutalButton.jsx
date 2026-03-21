import React from 'react';
import { motion } from 'framer-motion';

const BrutalButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}) => {
  const variants = {
    primary: 'btn-premium-primary',
    secondary: 'bg-surface text-text border border-border hover:bg-bg',
    outline: 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    'outline-dark': 'bg-transparent text-text border border-text hover:bg-text hover:text-white'
  };

  const baseClasses = 'btn-premium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = variants[variant] || variants.primary;

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default BrutalButton;
