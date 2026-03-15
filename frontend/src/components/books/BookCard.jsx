import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BrutalCard from '../ui/BrutalCard';
import BrutalButton from '../ui/BrutalButton';

const BookCard = ({ book, status, showManage = true }) => {
  const navigate = useNavigate();

  return (
    <BrutalCard className="h-100">
      <div 
        className="mb-3 border border-3 border-dark bg-dark overflow-hidden position-relative" 
        style={{ height: '280px', cursor: 'pointer' }}
        onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
      >
        {/* LAYER 1: The "Ambient" Background (Fills the gaps for weird resolutions) */}
        <img 
          src={book.cover} 
          alt="" 
          className="position-absolute w-100 h-100 object-fit-cover opacity-50"
          style={{ filter: 'blur(15px)', transform: 'scale(1.1)' }}
        />

        {/* LAYER 2: The Actual Cover (Preserves original aspect ratio) */}
        <img 
          src={book.cover} 
          alt={book.title} 
          className="position-relative w-100 h-100 object-fit-contain"
          loading="lazy"
          style={{ zIndex: 1 }}
        />
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-2">
          {status && (
            <span className={`status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
              {status}
            </span>
          )}
        </div>
        <h4 className="fw-black mb-1 line-clamp-2">{book.title}</h4>
        <p className="fw-bold text-muted small mb-3">{book.author}</p>
      </div>
      
      {showManage && (
        <BrutalButton 
          variant="secondary" 
          className="w-100" 
          onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
        >
          Manage
        </BrutalButton>
      )}
    </BrutalCard>
  );
};

export default BookCard;