import React from 'react';

const SectionHeader = ({ title, subtitle, align = 'left', className = '' }) => {
  return (
    <div className={`mb-5 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 className="display-4 fw-black text-uppercase mb-2">{title}</h2>
      {subtitle && <p className="lead fw-bold text-muted">{subtitle}</p>}
      <div 
        className={`mt-3`} 
        style={{ 
          height: '6px', 
          width: align === 'center' ? '100px' : '60px', 
          backgroundColor: 'black',
          margin: align === 'center' ? '0 auto' : '0'
        }}
      />
    </div>
  );
};

export default SectionHeader;
