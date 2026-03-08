import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Badge } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import PageContainer from '../../components/layout/PageContainer';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';
import ReadingStatusToggle from '../../components/books/ReadingStatusToggle';

const BookDetails = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToMyBooks, myBooks, updateStatus } = useBooks();
  const { user, loginWithGoogle } = useAuth();
  
  const book = location.state?.book;
  const existingBook = myBooks.find(b => b.bookId === bookId || b.id === bookId);
  const status = existingBook?.status;

  if (!book && !existingBook) {
    return <PageContainer className="text-center"><h2>Book not found!</h2></PageContainer>;
  }

  const currentBook = book || existingBook;

  const handleStatusChange = (newStatus) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (existingBook) {
      updateStatus(existingBook.bookId || existingBook.id, newStatus);
    } else {
      addToMyBooks(currentBook, newStatus);
    }
  };

  return (
    <PageContainer>
      <BrutalCard className="bg-white overflow-hidden p-0 shadow-none border-dark border-4" hover={false}>
        <Row className="g-0">
          <Col md={5} lg={4}>
            <div className="border-end border-4 border-dark h-100 min-vh-50">
              <img src={currentBook.cover} alt={currentBook.title} className="w-100 h-100 object-fit-cover" />
            </div>
          </Col>
          <Col md={7} lg={8} className="p-4 p-md-5">
            <Badge bg="dark" className="sharp-corners mb-3 px-2 py-2 text-uppercase fw-black">PUBLISHED {currentBook.publish_year || 'UNKNOWN'}</Badge>
            <h1 className="display-3 fw-black mb-1 lh-1 text-uppercase">{currentBook.title}</h1>
            <h3 className="text-muted fw-bold mb-5 text-uppercase">{currentBook.author}</h3>
            
            <div className="brutal-card bg-light mb-5 p-4 border-3 shadow-none">
              <h5 className="text-uppercase fw-black mb-3 fs-3">Description</h5>
              <p className="lead fw-bold text-muted">{currentBook.description || 'No description available for this masterpiece of literature.'}</p>
            </div>

            <div className="brutal-card bg-white border-4 p-4 mb-4">
              <h5 className="text-uppercase fw-black mb-3">Your Progress</h5>
              <ReadingStatusToggle 
                currentStatus={status || 'NONE'} 
                onStatusChange={handleStatusChange} 
              />
            </div>

            <BrutalButton 
              variant="secondary" 
              className="mt-2"
              onClick={() => navigate(-1)}
            >
              Back to library
            </BrutalButton>
          </Col>
        </Row>
      </BrutalCard>
    </PageContainer>
  );
};

export default BookDetails;
