import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Spinner } from 'react-bootstrap';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserManager from './UserManager';
import EventManager from './EventManager';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, authLoading, navigate]);

  if (authLoading) {
    return (
      <PageContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" className="text-accent" />
      </PageContainer>
    );
  }

  if (!isAdmin) return null;

  return (
    <PageContainer>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="d-flex align-items-center gap-3 mb-2">
            <FaShieldAlt className="text-accent h2 mb-0" />
            <h1 className="display-4 fw-bold serif mb-0">Admin Forge</h1>
          </div>
          <p className="text-secondary lead fw-medium">Unified command center for BookWorm archives and nodes.</p>
        </motion.div>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Row className="g-4">
            <Col lg={3}>
              <div className="bg-surface p-3 rounded-3xl border border-border shadow-sm sticky-top" style={{ top: '6rem' }}>
                <Nav variant="pills" className="flex-column gap-2 admin-nav">
                  <Nav.Item>
                    <Nav.Link eventKey="users" className="d-flex align-items-center gap-2 py-3 px-4 rounded-2xl">
                      <FaUsers /> User Management
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="events" className="d-flex align-items-center gap-2 py-3 px-4 rounded-2xl">
                      <FaCalendarAlt /> Event Activation
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
            
            <Col lg={9}>
              <div className="bg-surface p-4 p-md-5 rounded-3xl border border-border shadow-sm" style={{ minHeight: '600px' }}>
                <Tab.Content>
                  <Tab.Pane eventKey="users">
                    <UserManager />
                  </Tab.Pane>
                  <Tab.Pane eventKey="events">
                    <EventManager />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Col>
          </Row>
        </Tab.Container>
      </Container>

      <style>{`
        .admin-nav .nav-link {
          color: var(--text-secondary);
          background: transparent;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .admin-nav .nav-link.active {
          background: var(--accent) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(194, 168, 120, 0.3);
        }
        .admin-nav .nav-link:hover:not(.active) {
          background: var(--bg);
          color: var(--accent);
        }
      `}</style>
    </PageContainer>
  );
};

export default AdminDashboard;
