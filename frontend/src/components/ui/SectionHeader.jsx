import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, align = 'left', className = '' }) => {
  const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-end' : 'text-start';
  const marginClass = align === 'center' ? 'mx-auto' : align === 'right' ? 'ms-auto' : 'me-auto';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`mb-5 ${alignmentClass} ${className}`}
    >
      <h2 className="display-5 fw-bold mb-2 serif">{title}</h2>
      {subtitle && (
        <p className="text-secondary fw-medium mb-1" style={{ fontSize: '1.1rem', opacity: 0.8 }}>
          {subtitle}
        </p>
      )}
      <div className={`title-underline ${marginClass}`} style={{ width: '40px' }} />
    </motion.div>
  );
};

export default SectionHeader;
