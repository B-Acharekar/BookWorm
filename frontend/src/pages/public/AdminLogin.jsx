import React, { useState } from 'react';
import { Container, Form, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import BrutalButton from '../../components/ui/BrutalButton';
import BrutalCard from '../../components/ui/BrutalCard';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaEnvelope } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await loginWithEmail(email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError("Forbidden Authentication. High-clearance credentials required.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-100"
          style={{ maxWidth: '450px' }}
        >
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-accent bg-opacity-10 p-4 rounded-circle mb-4 border border-accent border-opacity-20">
              <FaShieldAlt size={40} className="text-accent" />
            </div>
            <h1 className="h1 fw-bold serif mb-2">Internal Command</h1>
            <p className="text-secondary opacity-75 small text-uppercase tracking-widest">Administrative Clearance Area</p>
          </div>

          <BrutalCard className="p-5 border-0 shadow-2xl glass" style={{ borderRadius: '40px' }}>
            {error && <Alert variant="danger" className="rounded-2xl small border-0 py-3 mb-4">{error}</Alert>}
            
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary text-uppercase tracking-tighter opacity-75 ms-1">Registry Email</Form.Label>
                <div className="position-relative">
                  <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-50" />
                  <Form.Control 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bookworm.com"
                    className="py-3 ps-5 bg-bg border-0 rounded-2xl shadow-none"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="small fw-bold text-secondary text-uppercase tracking-tighter opacity-75 ms-1">Access Protocol</Form.Label>
                <div className="position-relative">
                  <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-50" />
                  <Form.Control 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="py-3 ps-5 bg-bg border-0 rounded-2xl shadow-none"
                  />
                </div>
              </Form.Group>

              <BrutalButton 
                variant="primary" 
                type="submit" 
                className="w-100 py-3 fw-bold tracking-widest text-uppercase"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Verify Clearance"}
              </BrutalButton>
            </Form>
          </BrutalCard>
          
          <div className="text-center mt-5">
             <button onClick={() => navigate('/')} className="bg-transparent border-0 text-secondary small fw-bold tracking-widest hover:text-accent transition-colors">
               ABORT MISSION
             </button>
          </div>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default AdminLogin;
