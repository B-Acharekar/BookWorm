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
          <BrutalCard className="p-4 border-0 shadow-lg bg-surface" style={{ borderRadius: '28px' }}>
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-1 serif h3">Welcome back</h2>
              <p className="text-secondary small opacity-75">Your personal archive awaits.</p>
            </div>
            
            <Form onSubmit={(e) => e.preventDefault()}>
              {/* Archive ID Input */}
              <Form.Group className="mb-3">
                <div className="position-relative">
                  <FaEnvelope className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-50" size={14} />
                  <Form.Control 
                    type="email" 
                    placeholder="Archive ID (Email)"
                    className="ps-5 py-2 border-0 bg-bg shadow-none small" 
                    style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </Form.Group>
              
              {/* Access Key Input */}
              <Form.Group className="mb-4">
                <div className="position-relative">
                  <FaLock className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-50" size={14} />
                  <Form.Control 
                    type="password" 
                    placeholder="Access Key"
                    className="ps-5 py-2 border-0 bg-bg shadow-none small" 
                    style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </Form.Group>
              
              <BrutalButton type="submit" variant="primary" className="w-100 mb-3 py-2 fw-bold shadow-sm rounded-pill">
                Sign In
              </BrutalButton>
              
              <div className="d-flex align-items-center gap-2 mb-3 opacity-25">
                <hr className="flex-grow-1" />
                <span className="tiny fw-bold text-uppercase tracking-widest">or</span>
                <hr className="flex-grow-1" />
              </div>
              
              <BrutalButton 
                variant="outline-dark" 
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 small fw-semibold bg-white rounded-pill shadow-sm" 
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="text-danger" /> Google
              </BrutalButton>
              
              <div className="text-center mt-4">
                <p className="text-secondary small mb-0">
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