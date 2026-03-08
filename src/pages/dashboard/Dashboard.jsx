import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BookGrid from '../../components/books/BookGrid';
import EventCard from '../../components/events/EventCard';
import BrutalCard from '../../components/ui/BrutalCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { myBooks } = useBooks();

  const readingBooks = myBooks.filter(b => b.status === 'READING');
  const upcomingEvents = [
    { id: 1, name: "Kala Ghoda LitFest", location: "Kala Ghoda", date: "Feb 1-9, 2026", description: "Mumbai's biggest cultural and literary feast." },
    { id: 2, name: "Kitab Khana Author Meet", location: "Fort, Mumbai", date: "Every Sat", description: "Meet your favorite authors in a classic setting." }
  ];

  return (
    <PageContainer>
      <div className="mb-5 brutal-card bg-primary text-white" style={{ backgroundColor: 'var(--primary-green)' }}>
        <h1 className="fw-black mb-0 text-uppercase">Welcome back, {user?.displayName?.split(' ')[0]}!</h1>
        <p className="lead fw-bold mb-0 opacity-75 text-uppercase">You have {readingBooks.length} books in progress.</p>
      </div>

      <Row>
        <Col lg={8}>
          <SectionHeader 
            title="Continue Reading" 
            subtitle="Pick up where you left off."
          />
          {readingBooks.length > 0 ? (
            <BookGrid books={readingBooks.slice(0, 2)} myBooks={myBooks} />
          ) : (
            <BrutalCard className="text-center py-5 mb-5 bg-white">
              <h3 className="fw-black">NO ACTIVE BOOKS</h3>
              <p className="fw-bold text-muted">Go to the library to start your next adventure!</p>
            </BrutalCard>
          )}

          <SectionHeader 
            title="Popular Collections" 
            subtitle="What Mumbai is reading right now."
            className="mt-5"
          />
          <Row>
             <Col md={12}>
                <BrutalCard className="bg-accent text-dark mb-4" style={{ backgroundColor: 'var(--accent-yellow)' }}>
                    <h4 className="fw-black mb-1">MUMBAI CLASSICS</h4>
                    <p className="mb-0 fw-bold">Discover literature set in the heart of the city.</p>
                </BrutalCard>
             </Col>
          </Row>
        </Col>

        <Col lg={4}>
          <SectionHeader 
            title="Events" 
            subtitle="Don't miss out."
          />
          <div className="d-flex flex-column gap-4">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
