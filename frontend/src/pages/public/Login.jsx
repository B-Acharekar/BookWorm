import React from 'react';
import { Form, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageContainer from '../../components/layout/PageContainer';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <PageContainer className="d-flex align-items-center justify-content-center min-vh-100 bg-bg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto"
          style={{ maxWidth: '440px' }}
        >
          <BrutalCard className="p-4 p-md-5 border-0 shadow-lg bg-surface" style={{ borderRadius: '40px' }}>
            <div className="text-center mb-5">
              <span className="small text-uppercase fw-bold text-accent tracking-widest mb-2 d-block">Member Portal</span>
              <h1 className="fw-bold mb-2 serif display-5">Welcome back</h1>
              <div className="mx-auto title-underline mb-4" />
              <p className="text-secondary fw-medium small">Your personal archive awaits.</p>
            </div>
            
            <Form className="mt-4">
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary text-uppercase mb-2 tracking-wider ps-1">Archive ID</Form.Label>
                <div className="position-relative">
                  <div className="position-absolute h-100 d-flex align-items-center ps-4 text-accent" style={{ zIndex: 10 }}>
                    <FaEnvelope size={16} />
                  </div>
                  <Form.Control 
                    type="email" 
                    className="ps-5 py-3 border-0 bg-bg shadow-none fs-6" 
                    placeholder="reader@bookworm.com"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
              </Form.Group>
              
              <Form.Group className="mb-5">
                <Form.Label className="small fw-bold text-secondary text-uppercase mb-2 tracking-wider ps-1">Access Key</Form.Label>
                <div className="position-relative">
                  <div className="position-absolute h-100 d-flex align-items-center ps-4 text-accent" style={{ zIndex: 10 }}>
                    <FaLock size={16} />
                  </div>
                  <Form.Control 
                    type="password" 
                    className="ps-5 py-3 border-0 bg-bg shadow-none fs-6" 
                    placeholder="••••••••"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
              </Form.Group>
              
              <BrutalButton type="button" variant="primary" className="w-100 mb-4 py-3 fw-bold shadow-sm" onClick={(e) => e.preventDefault()}>
                Sign In
              </BrutalButton>
              
              <div className="d-flex align-items-center gap-3 mb-4 opacity-50">
                <hr className="flex-grow-1 border-secondary" />
                <span className="small fw-bold text-secondary text-uppercase tracking-widest">or</span>
                <hr className="flex-grow-1 border-secondary" />
              </div>
              
              <BrutalButton 
                type="button" 
                variant="secondary" 
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 fw-semibold border-border bg-white text-text shadow-sm" 
                onClick={handleGoogleLogin}
                style={{ borderRadius: '16px' }}
              >
                <FaGoogle className="text-danger" /> Continue with Google
              </BrutalButton>
              
              <div className="text-center mt-5">
                <p className="text-secondary small fw-medium mb-0 italic opacity-85">
                  New researcher? <Link to="/signup" className="text-accent fw-bold text-decoration-none">Create a profile</Link>
                </p>
              </div>
            </Form>
          </BrutalCard>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default Login;
