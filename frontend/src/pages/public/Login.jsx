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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto"
          style={{ maxWidth: '400px' }}
        >
          <BrutalCard className="p-5 bg-surface" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="text-center mb-5 animate-fade-in">
              <h2 className="fw-bold mb-2 serif h3 text-gradient">Welcome back</h2>
              <p className="text-muted small fw-medium">Your personal archive awaits.</p>
            </div>
            
            <Form onSubmit={(e) => e.preventDefault()}>
              {/* Archive ID Input */}
              <Form.Group className="mb-4">
                <div className="position-relative">
                  <FaEnvelope className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-40" size={14} />
                  <Form.Control 
                    type="email" 
                    placeholder="Archive ID (Email)"
                    className="premium-input ps-5 w-100" 
                  />
                </div>
              </Form.Group>
              
              {/* Access Key Input */}
              <Form.Group className="mb-5">
                <div className="position-relative">
                  <FaLock className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-40" size={14} />
                  <Form.Control 
                    type="password" 
                    placeholder="Access Key"
                    className="premium-input ps-5 w-100" 
                  />
                </div>
              </Form.Group>
              
              <BrutalButton type="submit" variant="primary" className="w-100 mb-4 py-3">
                Sign In
              </BrutalButton>
              
              <div className="d-flex align-items-center gap-3 mb-4 opacity-20">
                <hr className="flex-grow-1" />
                <span className="tiny fw-bold text-uppercase tracking-widest text-text">or</span>
                <hr className="flex-grow-1" />
              </div>
              
              <BrutalButton 
                variant="outline-dark" 
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 bg-white" 
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="text-danger" /> Google
              </BrutalButton>
              
              <div className="text-center mt-5">
                <p className="text-muted small mb-0 fw-medium">
                  New researcher? <Link to="/signup" className="text-accent fw-bold text-decoration-none hover-underline">Create a profile</Link>
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