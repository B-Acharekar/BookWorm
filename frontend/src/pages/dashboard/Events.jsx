import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Row, Col, Form, InputGroup, Spinner } from 'react-bootstrap';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import EventCard from '../../components/events/EventCard';
import BrutalButton from '../../components/ui/BrutalButton';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Bandra, Mumbai"); // Default name

  const fetchEvents = useCallback(async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    try {
      // Shifting from ?pincode= to ?location= and encoding spaces
      const res = await axios.get(`http://127.0.0.1:8000/events?location=${encodeURIComponent(location)}`);
      
      let data = res.data.events;

      // Handle raw string responses from Gemini if they occur
      if (typeof data === 'string') {
        try {
          const cleaned = data.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          data = parsed.events || parsed;
        } catch (e) { 
          data = []; 
        }
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [location]);

  // Initial load
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <SectionHeader
        title="Local Book Events"
        subtitle={location ? `Literary gatherings in and around ${location}` : "Discover events near you."}
      />

      <Row className="mb-5 justify-content-center">
        <Col md={8} lg={6}>
          <InputGroup className="brutal-shadow border border-3 border-dark">
            <Form.Control
              placeholder="Enter Area Name (e.g. Fort, Mumbai or Hauz Khas)..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchEvents()}
              className="border-0 fw-bold py-3"
              style={{ fontSize: '1.1rem', borderRadius: 0 }}
            />
            <BrutalButton 
              variant="primary" 
              onClick={fetchEvents} 
              disabled={loading}
              className="border-start border-3 border-dark px-4"
              style={{ borderRadius: 0 }}
            >
              {loading ? <Spinner size="sm" /> : "FIND EVENTS"}
            </BrutalButton>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {loading ? (
          <Col className="text-center py-5">
            <Spinner animation="grow" variant="dark" size="xl" />
            <p className="fw-black mt-3 text-uppercase">Searching for Live Events...</p>
          </Col>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <EventCard event={event} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <div className="p-5 border border-3 border-dark bg-light brutal-shadow">
              <h3 className="fw-black text-uppercase">No Events Found</h3>
              <p className="mb-0">Try a different area name or city hub.</p>
            </div>
          </Col>
        )}
      </Row>
    </PageContainer>
  );
};

export default Events;