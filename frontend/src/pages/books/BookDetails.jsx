import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import axios from 'axios';
import { useBooks } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import PageContainer from '../../components/layout/PageContainer';
import BrutalButton from '../../components/ui/BrutalButton';
import ReadingStatusToggle from '../../components/books/ReadingStatusToggle';

const BookDetails = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToMyBooks, myBooks, updateStatus } = useBooks();
  const { user } = useAuth();
  
  const book = location.state?.book;
  const existingBook = myBooks.find(b => b.bookId === bookId || b.id === bookId);
    const [fetchedBook, setFetchedBook] = useState(null);
  const [loading, setLoading] = useState(false);

// ✅ FETCH FROM BACKEND
  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/books/book/${bookId}`
        );
        setFetchedBook(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

const currentBook = {
  ...book,
  ...existingBook,
  ...fetchedBook
};

  if (!currentBook || loading) {
    return (
      <PageContainer className="text-center p-5">
        <h2>LOADING_DATA_STREAM...</h2>
      </PageContainer>
    );
  }

  const handleStatusChange = (newStatus) => {
    if (!user) { navigate('/login'); return; }

    if (existingBook) {
      updateStatus(existingBook.bookId || existingBook.id, newStatus);
    } else {
      addToMyBooks(currentBook, newStatus);
    }
  };

  // Tighter shadows for mobile to prevent overflow
  const brutalShadow = { boxShadow: 'clamp(6px, 1vw, 12px) clamp(6px, 1vw, 12px) 0px 0px #000' };
  const intenseShadow = { boxShadow: '4px 4px 0px 0px #000' };

  return (
    <PageContainer className="px-2 px-md-4 py-0"> {/* Removed vertical padding */}
      {/* HEADER: COMPACT & RESPONSIVE */}
      <div className="position-relative mb-3 mb-md-4 pt-4 mt-2">
        <div 
          className="bg-danger text-white p-1 d-inline-block border border-3 border-dark position-absolute"
          style={{ transform: 'rotate(-1deg)', top: '0', left: '10px', zIndex: 10, ...intenseShadow }}
        >
          <span className="fw-black text-uppercase small px-1">DATA_STREAM_{currentBook.publish_year}</span>
        </div>
        
        <div className="bg-white border border-4 border-dark p-3 p-md-4" style={brutalShadow}>
          <h1 className="display-3 display-md-1 fw-black text-uppercase mb-0 lh-1" style={{ letterSpacing: '-2px' }}>
            {currentBook.title}
          </h1>
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 mt-2">
            <h2 className="bg-warning text-dark px-2 py-1 fw-black text-uppercase border border-3 border-dark mb-0 fs-4 fs-md-2">
              {currentBook.author}
            </h2>
            <div className="fw-black text-uppercase border-bottom border-4 border-dark fs-6 fs-md-4">
              {currentBook.genre} • {currentBook.rating}★
            </div>
          </div>
        </div>
      </div>

      <Row className="g-3 g-md-4"> {/* Tightened gap */}
        {/* LEFT: COVER & LINKS */}
        <Col xs={12} lg={4}>
          <div className="border border-4 border-dark bg-white mb-3" style={brutalShadow}>
            <img 
              src={currentBook.cover} 
              alt={currentBook.title} 
              className="w-100 object-fit-cover" 
              style={{ filter: 'contrast(1.1)', height: 'auto', maxHeight: '500px' }} 
            />
          </div>

          <div className="p-3 border border-4 border-dark bg-info text-dark mb-3" style={brutalShadow}>
            <h5 className="fw-black text-uppercase mb-3 border-bottom border-2 border-dark">ACCESS_PROTOCOL</h5>
            <div className="d-grid gap-2"> {/* Grid for mobile-first stacking */}
              <BrutalButton variant="dark" className="py-2 fw-black" onClick={() => window.open(currentBook.buy_link, '_blank')}>
                BUY_NOW
              </BrutalButton>
              <BrutalButton variant="white" className="py-2 fw-black border-4" onClick={() => window.open(currentBook.read_online_link, '_blank')}>
                READ_ONLINE
              </BrutalButton>
            </div>
          </div>
        </Col>

        {/* RIGHT: DATA BLOCKS */}
        <Col xs={12} lg={8}>
          <Stack gap={3}>
            {/* MANIFESTO / DESCRIPTION */}
            <div className="p-3 border border-4 border-dark bg-white" style={brutalShadow}>
              <h4 className="fw-black text-uppercase small border-bottom border-2 border-dark mb-2">DESCRIPTION</h4>
              <p className="fs-6 fs-md-5 fw-bold lh-sm text-dark text-uppercase mb-0">
                {currentBook.description || 'MISSING_DATA_FIELD'}
              </p>
            </div>

            {/* SPECS GRID */}
            <Row className="g-2 g-md-3">
              <Col xs={6}>
                <div className="p-2 p-md-3 border border-4 border-dark bg-success text-white h-100" style={intenseShadow}>
                  <h6 className="fw-black text-uppercase x-small mb-1">REL_DATE</h6>
                  <p className="fs-4 fw-black mb-0">{currentBook.publish_year}</p>
                </div>
              </Col>
              <Col xs={6}>
                <div className="p-2 p-md-3 border border-4 border-dark bg-white h-100" style={intenseShadow}>
                  <h6 className="fw-black text-uppercase x-small mb-1">PUB_CO</h6>
                  <p className="fw-black text-uppercase mb-0 truncate-text" style={{fontSize: '0.9rem'}}>{currentBook.publications}</p>
                </div>
              </Col>
            </Row>

            {/* ADAPTATION */}
            {currentBook.movie_adaptation && (
              <div className="p-3 border border-4 border-dark bg-dark text-warning" style={brutalShadow}>
                <h6 className="fw-black text-uppercase x-small mb-1 text-muted">VISUAL_ADAPTATION</h6>
                <p className="fs-4 fw-black text-uppercase mb-0">{currentBook.movie_adaptation}</p>
              </div>
            )}

            {/* STATUS LOG - NO RADIUS */}
            <div className="p-3 border border-4 border-dark bg-white" style={{ ...brutalShadow, borderStyle: 'double' }}>
              <h5 className="fw-black text-uppercase mb-3 small">
                <span className="bg-dark text-white px-1 me-2">LOG</span> PROGRESS_STATUS
              </h5>
              <ReadingStatusToggle 
                currentStatus={status || 'NONE'} 
                onStatusChange={handleStatusChange} 
              />
            </div>

            <div className="mb-4 mt-2">
              <BrutalButton 
                variant="secondary" 
                className="w-100 w-md-auto px-4" 
                onClick={() => navigate(-1)}
              >
                ← BACK_TO_LIBRARY
              </BrutalButton>
            </div>
          </Stack>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default BookDetails;