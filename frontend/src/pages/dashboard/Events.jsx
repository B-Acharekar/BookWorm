import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Form, InputGroup, Spinner, Container } from 'react-bootstrap';
import { agentService } from '../../services/api';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import EventCard from '../../components/events/EventCard';
import BrutalButton from '../../components/ui/BrutalButton';
import BrutalCard from '../../components/ui/BrutalCard';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Mumbai");

  const fetchEvents = useCallback(async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    try {
      const [aiRes, manualRes] = await Promise.all([
        agentService.getEvents(location),
        adminService.getManualEvents()
      ]);
      
      let aiData = aiRes.data.events || aiRes.data;
      if (typeof aiData === 'string') {
        try {
          const cleaned = aiData.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          aiData = parsed.events || parsed;
        } catch (e) { aiData = []; }
      }

      const manualData = Array.isArray(manualRes.data) ? manualRes.data : [];
      setEvents([...manualData, ...(Array.isArray(aiData) ? aiData : [])]);
    } catch (err) {
      console.error("Fetch Error:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <PageContainer>
      <Container className="py-5">
        <div className="text-center mb-5 py-5 animate-fade-in">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-3 fw-bold mb-3 text-gradient serif"
          >
            Local Literati
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '40px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto title-underline mb-4"
            style={{ height: '3px', background: 'var(--accent)', borderRadius: '10px' }}
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lead text-muted max-w-xl mx-auto fw-medium"
          >
            Discover upcoming literary gatherings, author talks, and workshops <br />
            within your node's range.
          </motion.p>
        </div>

        <Row className="mb-5 justify-content-center">
          <Col md={10} lg={7}>
            <BrutalCard className="p-1 border-0 shadow-xl bg-surface" style={{ borderRadius: 'var(--radius-full)' }}>
              <InputGroup className="border-0 bg-transparent align-items-center">
                <div className="d-flex align-items-center ps-4 text-accent opacity-60">
                  <FaMapMarkerAlt size={18} />
                </div>
                <Form.Control
                  placeholder="Enter sector (e.g. Mumbai, Bandra)..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchEvents()}
                  className="border-0 shadow-none px-3 py-3 fs-5 bg-transparent text-text"
                  style={{ fontWeight: '500' }}
                />
                <BrutalButton 
                  variant="primary" 
                  onClick={fetchEvents} 
                  disabled={loading}
                  className="px-5 ms-2 my-1 me-1 shadow-sm"
                >
                  {loading ? <Spinner size="sm" /> : "Find Events"}
                </BrutalButton>
              </InputGroup>
            </BrutalCard>
          </Col>
        </Row>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-5"
            >
              <Spinner animation="border" className="text-accent" size="lg" />
              <p className="text-secondary mt-3 serif italic">Scanning for local nodes...</p>
            </motion.div>
          ) : events.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="row g-4 g-lg-5 pt-4"
            >
              {events.map((event, index) => (
                <Col md={6} lg={4} key={index}>
                  <EventCard event={event} />
                </Col>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-5"
            >
              <div className="py-5 bg-bg rounded-lg border border-dashed max-w-lg mx-auto" style={{ borderColor: 'var(--border-strong)' }}>
                <h4 className="serif mb-2 text-gradient">No Activations Found</h4>
                <p className="text-muted small mb-0 px-4 fw-medium">The current sector seems quiet. Try a larger hub like 'Mumbai' or 'Delhi'.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </PageContainer>
  );
};

export default Events;