import React, { useState } from 'react';
import { registerWithEmail } from '../../firebase/auth';
import { Form, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageContainer from '../../components/layout/PageContainer';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Signup = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup failed:", error.code, error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Google signup failed:", error.code, error.message);
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
              <span className="small text-uppercase fw-bold text-accent tracking-widest mb-2 d-block">Join the Archive</span>
              <h1 className="fw-bold mb-2 serif display-5">Create profile</h1>
              <div className="mx-auto title-underline mb-4" />
              <p className="text-secondary fw-medium small">Begin your curated library journey.</p>
            </div>

            <Form onSubmit={handleSignup} className="mt-4">
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary text-uppercase mb-2 tracking-wider ps-1">Full Name</Form.Label>
                <div className="position-relative">
                  <div className="position-absolute h-100 d-flex align-items-center ps-4 text-accent" style={{ zIndex: 10 }}>
                    <FaUser size={16} />
                  </div>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ps-5 py-3 border-0 bg-bg shadow-none fs-6"
                    placeholder="John Doe"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary text-uppercase mb-2 tracking-wider ps-1">Archive ID</Form.Label>
                <div className="position-relative">
                  <div className="position-absolute h-100 d-flex align-items-center ps-4 text-accent" style={{ zIndex: 10 }}>
                    <FaEnvelope size={16} />
                  </div>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ps-5 py-3 border-0 bg-bg shadow-none fs-6"
                    placeholder="••••••••"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
              </Form.Group>

              <BrutalButton
                type="submit"
                variant="primary"
                className="w-100 mb-4 py-3 fw-bold shadow-sm"
              >
                Assemble Profile
              </BrutalButton>

              <div className="d-flex align-items-center gap-3 mb-4 opacity-50">
                <hr className="flex-grow-1 border-secondary" />
                <span className="small fw-bold text-secondary text-uppercase tracking-widest">or</span>
                <hr className="flex-grow-1 border-secondary" />
              </div>

              <BrutalButton
                variant="secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 fw-semibold border-border bg-white text-text shadow-sm"
                onClick={handleGoogleLogin}
                style={{ borderRadius: '16px' }}
              >
                <FaGoogle className="text-danger" /> Join with Google
              </BrutalButton>

              <div className="text-center mt-5">
                <p className="text-secondary small fw-medium mb-0 italic opacity-85">
                  Already cataloged?{' '}
                  <Link to="/login" className="text-accent fw-bold text-decoration-none">
                    Log In
                  </Link>
                </p>
              </div>
            </Form>
          </BrutalCard>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default Signup;