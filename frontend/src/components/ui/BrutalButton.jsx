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
    secondary: 'btn-premium-secondary',
    outline: 'bg-transparent text-accent border border-accent/20 hover:border-accent hover:bg-accent-soft',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm hover:shadow-md',
    warning: 'bg-amber-500 text-black hover:bg-amber-600 shadow-sm hover:shadow-md',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md',
    'outline-dark': 'bg-transparent text-text border border-border-strong hover:bg-accent-soft'
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
