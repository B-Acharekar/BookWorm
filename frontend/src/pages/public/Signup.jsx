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
      console.error("Signup failed:", error.code);
    }
  };

  return (
    <PageContainer className="d-flex align-items-center justify-content-center min-vh-100 bg-bg">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto"
          style={{ maxWidth: '400px' }} // Tightened width
        >
          <BrutalCard className="p-4 border-0 shadow-lg bg-surface" style={{ borderRadius: '28px' }}>
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-1 serif h3">Create profile</h2>
              <p className="text-secondary small opacity-75">Begin your curated library journey.</p>
            </div>

            <Form onSubmit={handleSignup}>
              {/* Condensed Name Input */}
              <Form.Group className="mb-3">
                <div className="position-relative">
                  <FaUser className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-50" size={14} />
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ps-5 py-2 border-0 bg-bg shadow-none small"
                    style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </Form.Group>

              {/* Condensed Email Input */}
              <Form.Group className="mb-3">
                <div className="position-relative">
                  <FaEnvelope className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-50" size={14} />
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ps-5 py-2 border-0 bg-bg shadow-none small"
                    style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </Form.Group>

              {/* Condensed Password Input */}
              <Form.Group className="mb-4">
                <div className="position-relative">
                  <FaLock className="position-absolute translate-middle-y top-50 start-0 ms-3 text-accent opacity-50" size={14} />
                  <Form.Control
                    type="password"
                    placeholder="Access Key"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ps-5 py-2 border-0 bg-bg shadow-none small"
                    style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </Form.Group>

              <BrutalButton type="submit" variant="primary" className="w-100 mb-3 py-2 fw-bold shadow-sm rounded-pill">
                Assemble Profile
              </BrutalButton>

              <div className="d-flex align-items-center gap-2 mb-3 opacity-25">
                <hr className="flex-grow-1" />
                <span className="tiny fw-bold text-uppercase tracking-widest">or</span>
                <hr className="flex-grow-1" />
              </div>

              <BrutalButton
                variant="outline-dark"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 small fw-semibold bg-white rounded-pill shadow-sm"
                onClick={() => loginWithGoogle().then(() => navigate('/dashboard'))}
              >
                <FaGoogle className="text-danger" /> Google
              </BrutalButton>

              <div className="text-center mt-4">
                <p className="text-secondary small mb-0">
                  Already cataloged?{' '}
                  <Link to="/login" className="text-accent fw-bold text-decoration-none">Log In</Link>
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