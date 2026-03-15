import React from 'react';
import { Container } from 'react-bootstrap';

const PageContainer = ({ children, className = '', fluid = false }) => {
  return (
    <Container fluid={fluid} className={`py-3 ${className}`} style={{ maxWidth: fluid ? 'none' : '1200px' }}>
      {children}
    </Container>
  );
};

export default PageContainer;
