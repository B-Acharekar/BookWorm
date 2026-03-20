import React from 'react';
import { Container } from 'react-bootstrap';

const PageContainer = ({ children, className = '', fluid = false }) => {
  return (
    <Container 
      fluid={fluid} 
      className={`p-1 p-md-3 ${className}`} // Minimal padding
      style={{ maxWidth: fluid ? 'none' : '1300px' }}
    >
      {children}
    </Container>
  );
};
export default PageContainer;
