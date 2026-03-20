import React from 'react';

const SectionHeader = ({ title, subtitle, align = 'left', className = '' }) => {
  return (
    <div className={`mb-3 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 className="display-3 fw-black text-uppercase mb-0 lh-1" style={{ letterSpacing: '-2px' }}>
        {title}
      </h2>
      {subtitle && <p className="fw-black text-uppercase small mt-1 mb-0 opacity-75">{subtitle}</p>}
      <div 
        className="mt-2" 
        style={{ height: '8px', width: '100%', backgroundColor: 'currentColor', opacity: 0.2 }} 
      />
    </div>
  );
};

export default SectionHeader;
