import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Stack, Form, Spinner, Container, Badge } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import { bookService } from '../../services/api';
import PageContainer from '../../components/layout/PageContainer';
import BrutalButton from '../../components/ui/BrutalButton';
import BrutalCard from '../../components/ui/BrutalCard';
import { FaHeart, FaRegHeart, FaBookOpen, FaShoppingCart, FaStar, FaHistory, FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BookDetails = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { myBooks, updateStatus, toggleFavorite } = useBooks();
  const { user } = useAuth();
  
  const book = location.state?.book;
  const existingBook = myBooks.find(b => b.bookId === bookId);
  const [fetchedBook, setFetchedBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchBookDetails = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch book details first (critical)
      const detailsRes = await bookService.getDetails(bookId);
      setFetchedBook(detailsRes.data);
      
      // Fetch reviews independently (non-critical)
      try {
        const reviewsRes = await bookService.getReviews(bookId);
        setReviews(reviewsRes.data.reviews || []);
      } catch (revErr) {
        console.warn("Reviews fetch failed (non-critical):", revErr);
        setReviews([]);
      }
    } catch (err) {
      console.error("Failed to fetch core book data:", err);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId) fetchBookDetails();
  }, [bookId, fetchBookDetails]);

  const currentBook = {
    // Priority: fetchedBook (Deep API) > existingBook (Firestore) > book (Search State)
    ...book,
    ...existingBook,
    ...fetchedBook,
    // Explicit overrides to ensure no undefined property leaks
    id: bookId,
    bookId: bookId,
    title: fetchedBook?.title || book?.title || existingBook?.title || "Not available",
    author: fetchedBook?.author || book?.author || existingBook?.author || "Unknown Author",
    coverImage: fetchedBook?.coverImage || book?.coverImage || existingBook?.coverImage || book?.cover,
    description: fetchedBook?.description || "Description not available.",
    rating: fetchedBook?.rating || existingBook?.rating || 0,
    publishedDate: fetchedBook?.publishedDate || book?.publishedDate || "N/A",
    readLink: fetchedBook?.readLink || book?.readLink,
    buyLink: fetchedBook?.buyLink || book?.buyLink,
    genres: fetchedBook?.genres || book?.genres || []
  };

  console.log("Current Book Data in Details Page:", currentBook);
  const status = existingBook?.status || 'NONE';
  const isFavorite = existingBook?.isFavorite || false;

  const handleStatusChange = async (newStatus) => {
    if (!user) { navigate('/login'); return; }
    await updateStatus(currentBook, newStatus);
  };

  const handleToggleFavorite = async () => {
    if (!user) { navigate('/login'); return; }
    await toggleFavorite(bookId, !isFavorite);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    
    setSubmittingReview(true);
    try {
      await bookService.addReview({
        user_id: user.uid,
        user_name: user.displayName || "Anonymous",
        book_id: bookId,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      setReviewForm({ rating: 5, comment: '' });
      const reviewsRes = await bookService.getReviews(bookId);
      setReviews(reviewsRes.data.reviews || []);
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading && !fetchedBook) {
    return (
      <PageContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" className="text-accent" />
      </PageContainer>
    );
  }

  if (!currentBook.title && !loading) {
     return (
        <PageContainer className="text-center py-5">
          <BrutalCard className="p-5 d-inline-block">
            <h2 className="serif mb-3 h1">Volume Not Found</h2>
            <p className="text-secondary mb-4 lead">The volume you're looking for isn't in our current archives.</p>
            <BrutalButton onClick={() => navigate('/discover')} variant="primary">Return to Discovery</BrutalButton>
          </BrutalCard>
        </PageContainer>
     );
  }

  return (
    <PageContainer>
      <Container className="py-4 py-md-5">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="bg-transparent border-0 text-secondary fw-bold mb-4 d-flex align-items-center gap-2 tracking-widest small"
        >
          <FaChevronLeft size={12} /> BACK
        </motion.button>

        <Row className="g-5">
          {/* LEFT: PREMIUM HERO COVER */}
          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky-top"
              style={{ top: '6rem' }}
            >
              <div className="premium-card overflow-hidden mb-4 shadow-lg border-0" style={{ borderRadius: '40px' }}>
                <img 
                  src={currentBook.coverImage} 
                  alt={currentBook.title} 
                  className="w-100 object-fit-cover shadow-sm" 
                  style={{ height: 'auto', minHeight: '400px' }} 
                />
              </div>

              <div className="d-flex gap-3 mb-4">
                {currentBook.readLink && (
                  <BrutalButton 
                    variant="outline" 
                    className="flex-grow-1 py-3"
                    onClick={() => window.open(currentBook.readLink, '_blank')}
                  >
                    <FaBookOpen className="me-2" /> Read
                  </BrutalButton>
                )}
                {currentBook.buyLink && (
                  <BrutalButton 
                    variant="primary" 
                    className="flex-grow-1 py-3"
                    onClick={() => window.open(currentBook.buyLink, '_blank')}
                  >
                    <FaShoppingCart className="me-2" /> Buy
                  </BrutalButton>
                )}
              </div>

              <BrutalCard className="p-4 bg-surface border-0 shadow-sm" style={{ borderRadius: '24px' }}>
                <h6 className="serif fw-bold mb-3">Shelf Management</h6>
                <Stack gap={3}>
                  {status === 'NONE' ? (
                    <BrutalButton variant="primary" className="w-100 py-3" onClick={() => handleStatusChange('to_read')}>
                      Add to Library
                    </BrutalButton>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                       <div className="d-flex gap-2">
                         <BrutalButton 
                           variant={status === 'reading' ? 'warning' : 'secondary'} 
                           className="flex-grow-1 py-2"
                           onClick={() => handleStatusChange('reading')}
                         >
                           Reading
                         </BrutalButton>
                         <BrutalButton 
                           variant={status === 'completed' ? 'success' : 'secondary'}
                           className="flex-grow-1 py-2"
                           onClick={() => handleStatusChange('completed')}
                         >
                           Done
                         </BrutalButton>
                       </div>
                       <Badge bg="accent" className="bg-opacity-10 text-accent py-2 text-uppercase letter-spacing-wide">
                         Status: {status.replace('_', ' ')}
                       </Badge>
                    </div>
                  )}
                  <BrutalButton 
                    variant={isFavorite ? 'outline' : 'secondary'} 
                    className={`w-100 py-2 ${isFavorite ? 'text-danger border-danger' : ''}`} 
                    onClick={handleToggleFavorite}
                  >
                    {isFavorite ? <><FaHeart className="me-2" /> Unfavorite</> : <><FaRegHeart className="me-2" /> Favorite</>}
                  </BrutalButton>
                </Stack>
              </BrutalCard>
            </motion.div>
          </Col>

          {/* RIGHT: EDITORIAL DETAILS */}
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-5">
{/* GENRE BADGES */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {currentBook.genres?.slice(0, 5).map((g, i) => (
                    <Badge key={i} bg="accent" className="bg-opacity-10 text-accent border-0 px-3 py-2 rounded-pill small fw-bold text-uppercase tracking-wider">
                      {g}
                    </Badge>
                  ))}
                </div>
<h1 className="display-2 serif fw-bold mb-2 tracking-tight line-height-1">{currentBook.title}</h1>
                <h2 className="h4 text-secondary fw-medium mb-4 italic">by {currentBook.author}</h2>
                <div className="d-flex align-items-center gap-5 py-4 border-top border-bottom border-border mb-5">
                  <div>
                    <div className="d-flex align-items-center gap-2 h4 fw-bold mb-0">
                      <FaStar className="text-accent" />
                      {currentBook.rating || 'N/A'}
                    </div>
                    <div className="small text-secondary fw-bold text-uppercase mt-1">Rating</div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 h4 fw-bold mb-0">
                      <FaHistory className="text-accent" />
                      {currentBook.publishedDate || 'N/A'}
                    </div>
                    <div className="small text-secondary fw-bold text-uppercase mt-1">First Published</div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="serif fw-bold mb-3">Synopsis</h4>
                <p className="lead text-text lh-lg" style={{ opacity: 0.85 }}>
                  {currentBook.description}
                </p>
              </div>

              {/* REVIEWS SECTION */}
              <div className="mb-5 pt-4">
                <h4 className="serif fw-bold mb-4">Archive Logs</h4>
                
                <BrutalCard className="mb-5 p-4 bg-surface border-0 shadow-sm" style={{ borderRadius: '24px' }}>
                  <h6 className="fw-bold mb-3 small text-uppercase tracking-wider">Add Your Log Entry</h6>
                  <Form onSubmit={handleReviewSubmit}>
                    <Row className="g-4">
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label className="small fw-bold text-secondary">Rating</Form.Label>
                          <Form.Select 
                            value={reviewForm.rating}
                            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                            className="bg-bg border-0 py-2 fs-6 shadow-none"
                          >
                            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={9}>
                        <Form.Group>
                          <Form.Label className="small fw-bold text-secondary">Comment</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Share your thoughts on this volume..."
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                            required
                            className="bg-bg border-0 py-3 shadow-none"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="text-end mt-4">
                      <BrutalButton type="submit" variant="primary" className="px-5" disabled={submittingReview}>
                        {submittingReview ? "Archiving..." : "Post Review"}
                      </BrutalButton>
                    </div>
                  </Form>
                </BrutalCard>

                <div className="d-flex flex-column gap-4">
                  {reviews.length > 0 ? reviews.map((rev, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="p-4 bg-surface rounded-2xl border border-border"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center gap-2">
                           <div className="bg-accent bg-opacity-10 text-accent rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
                             {rev.userName?.charAt(0) || 'A'}
                           </div>
                           <span className="fw-bold">{rev.userName}</span>
                        </div>
                        <div className="text-accent fw-bold glass px-3 py-1 rounded-full small">
                          <FaStar className="me-1" /> {rev.rating}
                        </div>
                      </div>
                      <p className="mb-0 text-text text-md lh-base" style={{ opacity: 0.8 }}>{rev.comment}</p>
                    </motion.div>
                  )) : (
                    <div className="text-center py-5 bg-bg rounded-2xl text-secondary border border-dashed">
                      No logs found for this volume.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default BookDetails;