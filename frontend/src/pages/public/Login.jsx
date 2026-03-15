import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageContainer from '../../components/layout/PageContainer';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaGoogle } from 'react-icons/fa';

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
    <PageContainer className="d-flex align-items-center justify-content-center min-vh-100">
      <BrutalCard className="bg-white p-5 shadow-lg" style={{ maxWidth: '500px', width: '100%' }} hover={false}>
        <h1 className="display-4 fw-black mb-1 text-uppercase text-center">Login</h1>
        <p className="text-center fw-bold text-muted mb-5 text-uppercase">Access your city library</p>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-black text-uppercase small">Email Address</Form.Label>
            <Form.Control 
              type="email" 
              className="sharp-corners border-3 border-dark p-3" 
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-black text-uppercase small">Password</Form.Label>
            <Form.Control 
              type="password" 
              className="sharp-corners border-3 border-dark p-3" 
              placeholder="••••••••"
            />
          </Form.Group>
          
          <BrutalButton type="button" variant="primary" className="w-100 mb-3 fs-5 py-3" onClick={(e) => e.preventDefault()}>
            Sign In
          </BrutalButton>
          
          <div className="text-center mb-3">
            <span className="fw-black text-uppercase small">OR</span>
          </div>
          
          <BrutalButton type="button" variant="secondary" className="w-100 d-flex align-items-center justify-content-center gap-2 py-3" onClick={handleGoogleLogin}>
            <FaGoogle /> Login with Google
          </BrutalButton>
          
          <p className="text-center mt-4 fw-bold small text-uppercase mb-0">
            No account? <Link to="/signup" className="text-dark">Create one</Link>
          </p>
        </Form>
      </BrutalCard>
    </PageContainer>
  );
};

export default Login;
