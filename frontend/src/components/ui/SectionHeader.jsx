import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, align = 'left', className = '' }) => {
  const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-end' : 'text-start';
  const marginClass = align === 'center' ? 'mx-auto' : align === 'right' ? 'ms-auto' : 'me-auto';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-5 ${alignmentClass} ${className}`}
    >
      <h2 className="display-5 fw-bold mb-2 serif text-gradient">{title}</h2>
      {subtitle && (
        <p className="text-muted fw-medium mb-3" style={{ fontSize: '1.1rem' }}>
          {subtitle}
        </p>
      )}
      <div className={`title-underline ${marginClass}`} style={{ 
        height: '4px', 
        width: '40px', 
        background: 'var(--accent)', 
        borderRadius: '20px' 
      }} />
    </motion.div>
  );
};

export default SectionHeader;
