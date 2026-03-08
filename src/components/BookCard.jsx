import React from 'react';
import { motion } from 'framer-motion';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, status }) => {
  const { addToMyBooks } = useBooks();
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.stopPropagation();
    if (!user) {
      loginWithGoogle();
      return;
    }
    if (!status) {
      addToMyBooks(book, 'TO READ');
    }
  };

  return (
    <motion.div 
      className="brutal-card h-100 d-flex flex-column"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
    >
      <div className="mb-3 border border-3 border-dark bg-light" style={{ height: '250px' }}>
        <img 
          src={book.cover} 
          alt={book.title} 
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      <div className="flex-grow-1">
        {status && (
          <span className={`status-badge mb-2 status-${status.toLowerCase().replace(' ', '-')}`}>
            {status}
          </span>
        )}
        <h4 className="mb-1 text-truncate">{book.title}</h4>
        <p className="fw-bold text-muted small mb-3">{book.author}</p>
      </div>
      <button 
        className={`brutal-btn w-100 ${status ? 'brutal-btn-secondary' : 'brutal-btn-primary'}`}
        onClick={handleAction}
      >
        {status ? 'Manage' : 'Add to Read'}
      </button>
    </motion.div>
  );
};

export default BookCard;
