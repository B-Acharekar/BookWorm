import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrutalCard from '../ui/BrutalCard';
import { Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BookCard = ({ book, status }) => {
  const navigate = useNavigate();
  console.log("Book Data in BookCard:", book);
  // 1. Standardized IDs and Covers
  // Checking multiple common keys to ensure compatibility with all data sources
  const bookId = book.id || book.bookId || book.work_key || book.book_id || book._id;
  const coverUrl = book.coverImage || book.cover;

  // 2. Define displayStatus (using prop first, then book object)
  const displayStatus = status || book.status;

  const handleNavigate = () => {
    // FIX: Passing the book object in state so the Detail page has data immediately 
    // This prevents "flicker" while the full details fetch in the background
    navigate(`/book/${bookId}`, { state: { book } });
  };

  return (
    <BrutalCard 
      onClick={handleNavigate}
      className="h-100 d-flex flex-column border-0 shadow-sm p-0 bg-surface group overflow-hidden pointer" 
      style={{ borderRadius: '24px', cursor: 'pointer' }}
    >
      <div 
        className="position-relative overflow-hidden" 
        style={{ height: '320px' }}
      >
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={coverUrl} 
          alt={book.title} 
          className="w-100 h-100 object-fit-cover shadow-sm bg-bg"
          loading="lazy"
        />
        
        {/* TOP OVERLAYS */}
        <div className="position-absolute top-0 w-100 p-3 d-flex justify-content-between align-items-start">
          {displayStatus && displayStatus !== 'NONE' && (
            <Badge bg="accent" className="bg-opacity-90 text-white shadow-sm px-3 py-2 border-0 rounded-full small fw-bold text-uppercase tracking-wider">
              {String(displayStatus).replace('_', ' ')}
            </Badge>
          )}
          {book.rating > 0 && (
            <div className="glass px-2 py-1 rounded-full d-flex align-items-center gap-1 shadow-sm text-text fw-bold small">
              <FaStar size={12} className="text-accent" /> {book.rating}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex-grow-1 d-flex flex-column">
        <h5 
          className="serif fw-bold mb-1 text-truncate line-height-1" 
          title={book.title} 
          style={{ fontSize: '1.25rem' }}
        >
          {book.title}
        </h5>
        <p className="text-secondary small mb-0 text-truncate italic opacity-75">
          by {book.author || "Unknown Author"}
        </p>
        
        {book.genres && book.genres.length > 0 && (
          <div className="mt-3 pt-3 border-top border-border">
             <span 
               className="small text-uppercase fw-bold text-accent tracking-widest" 
               style={{ fontSize: '0.65rem' }}
             >
                {/* Show only the first primary genre */}
                {book.genres[0]}
             </span>
          </div>
        )}
      </div>
    </BrutalCard>
  );
};

export default BookCard;