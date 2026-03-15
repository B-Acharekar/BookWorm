import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import EventCard from '../../components/events/EventCard';

const Events = () => {
  const mumbaievents = [
    { id: 1, name: "Kala Ghoda Literature Festival", location: "Kala Ghoda, Port", date: "Feb 1-9, 2026", description: "Mumbai's biggest cultural and literary feast featuring international authors and thinkers." },
    { id: 2, name: "Kitab Khana Author Meet", location: "Fort, Mumbai", date: "Every Saturday", description: "Meet your favorite authors in a classic setting with coffee and books." },
    { id: 3, name: "Crossword Book Sale", location: "Multiple Locations", date: "Ongoing", description: "Flat 50% off on Mumbai's favorite book chain for the entire month." },
    { id: 4, name: "Mumbai LitFest", location: "NCPA, Nariman Point", date: "Nov 15-18", description: "A star-studded literary festival by the sea." }
  ];

  return (
    <PageContainer>
      <SectionHeader 
        title="Mumbai Events" 
        subtitle="Literary gatherings and festivals around the city."
      />
      <Row>
        {mumbaievents.map((event) => (
          <Col md={6} lg={4} key={event.id} className="mb-4">
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default Events;
