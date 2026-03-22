import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BookContext';
import { agentService } from '../../services/api';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BookGrid from '../../components/books/BookGrid';
import EventCard from '../../components/events/EventCard';
import BrutalCard from '../../components/ui/BrutalCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const { myBooks, loading: booksLoading } = useBooks();
  const [recommendations, setRecommendations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      const [recoRes, eventRes] = await Promise.all([
        agentService.getRecommendations(user.uid),
        agentService.getEvents("Mumbai")
      ]);
      setRecommendations(recoRes.data.recommendations || []);
      setEvents((eventRes.data.events || eventRes.data).slice(0, 3));
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const readingBooks = myBooks.filter(b => b.status === 'reading');
  const completedBooks = myBooks.filter(b => b.status === 'completed');
  const favoriteBooks = myBooks.filter(b => b.isFavorite);

  return (
    <PageContainer>
      <Container className="py-5">
        {/* PREMIUM HERO HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 p-5 shadow-lg position-relative overflow-hidden text-center animate-fade-in" 
          style={{ 
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5 pointer-events-none" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)' }}></div>
          
          <div className="position-relative" style={{ zIndex: 2 }}>
            <span className="small text-uppercase fw-bold text-accent tracking-widest mb-3 d-block serif italic" style={{ fontSize: '0.8rem' }}>Member Library Access</span>
            <h1 className="fw-bold mb-3 display-4 serif text-gradient">Welcome back, {user?.displayName?.split(' ')[0] || 'Reader'}</h1>
            <div className="mx-auto title-underline mb-4" style={{ height: '3px', width: '30px', background: 'var(--accent)', borderRadius: '10px' }} />
            <p className="lead text-muted mx-auto max-w-lg fw-medium">
              {readingBooks.length > 0 
                ? `You possess ${readingBooks.length} active volume${readingBooks.length > 1 ? 's' : ''} in your current rotation.` 
                : "Your personal archive is awaiting a new addition."}
            </p>
          </div>
        </motion.div>

        <Row className="g-5">
          <Col lg={8}>
            {/* CONTINUE READING */}
            <div className="mb-5 pb-4">
              <SectionHeader 
                title="Active Volumes" 
                subtitle="Items currently in your specialized reading logs."
                className="mb-4"
              />
              {booksLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" className="text-accent" />
                </div>
              ) : readingBooks.length > 0 ? (
                <BookGrid books={readingBooks} myBooks={myBooks} />
              ) : (
                <div className="text-center py-5 bg-bg rounded-3xl border border-dashed">
                  <h5 className="serif mb-2">Archive Idle</h5>
                  <p className="text-secondary small mb-0">Discover new works to initialize your logs.</p>
                </div>
              )}
            </div>

            {/* COMPLETED */}
            {completedBooks.length > 0 && (
              <div className="mb-5 pb-4">
                <SectionHeader 
                  title="Completed Archive" 
                  subtitle="Volumes successfully processed and cataloged."
                  className="mb-4"
                />
                <BookGrid books={completedBooks} myBooks={myBooks} />
              </div>
            )}

            {/* RECOMMENDATIONS */}
            <div className="mb-5">
              <SectionHeader 
                title="Literary Curator" 
                subtitle="Personalized recommendations from the archive nodes."
                className="mb-4"
              />
              {loadingData ? (
                <div className="text-center py-5">
                  <Spinner animation="border" className="text-accent" />
                </div>
              ) : recommendations.length > 0 ? (
                <BookGrid books={recommendations} myBooks={myBooks} />
              ) : (
                <div className="text-center py-5 bg-bg rounded-3xl border border-border">
                  <p className="mb-0 small fw-bold text-secondary text-uppercase tracking-widest">Initialising neural profile...</p>
                </div>
              )}
            </div>
          </Col>

          <Col lg={4}>
            {/* FAVORITES PREVIEW */}
            <div className="mb-5 pb-4">
              <SectionHeader 
                title="Premier Works" 
                subtitle="Your most valued volumes."
                className="mb-4"
              />
              <div className="d-flex flex-column gap-4">
                {favoriteBooks.length > 0 ? (
                  favoriteBooks.slice(0, 4).map(book => (
                    <motion.div 
                      key={book.bookId} 
                      whileHover={{ x: 5 }}
                      className="d-flex gap-3 align-items-center p-2 rounded-2xl hover:bg-bg transition-all"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/book/${book.bookId || book.id || book.work_key}`)}
                    >
                      <img src={book.coverImage || book.cover} alt={book.title} width="60" height="90" className="rounded-xl shadow-sm object-fit-cover bg-light" />
                      <div className="overflow-hidden">
                        <h6 className="serif fw-bold mb-0 text-truncate">{book.title}</h6>
                        <p className="small text-secondary mb-0 text-truncate italic opacity-75">{book.author}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 bg-bg rounded-2xl border border-border text-center">
                     <p className="text-secondary small mb-0 fw-bold text-uppercase tracking-tighter">No favorited volumes</p>
                  </div>
                )}
              </div>
            </div>

            {/* FIELD EVENTS */}
            <div>
              <SectionHeader 
                title="Local Nodes" 
                subtitle="Upcoming literary activations in your sector."
                className="mb-4"
              />
              <div className="d-flex flex-column gap-3">
                {loadingData ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" size="sm" className="text-accent" />
                  </div>
                ) : events.length > 0 ? (
                  events.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))
                ) : (
                  <p className="text-secondary small px-1 italic">Scanning for local nodes...</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
