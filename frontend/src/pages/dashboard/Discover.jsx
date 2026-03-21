import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Form, Container, Spinner } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import BookGrid from '../../components/books/BookGrid';
import BrutalButton from '../../components/ui/BrutalButton';
import BrutalCard from '../../components/ui/BrutalCard';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Discover = () => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { searchResults, searchBooks, loading, myBooks } = useBooks();

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.length > 2) {
        searchBooks(value);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % searchResults.length);
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev <= 0 ? searchResults.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const book = searchResults[activeIndex];
      const bookId = book.id || book.work_key;
      navigate(`/book/${bookId}`, { state: { book } });
      setShowSuggestions(false);
    }
  };

  return (
    <PageContainer>
      <Container className="py-5">
        {/* EDITORIAL HERO */}
        <div className="text-center mb-5 py-5">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-3 fw-bold mb-3 text-premium-gradient serif"
          >
            The City Archive
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            className="mx-auto title-underline mb-4"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lead text-secondary max-w-xl mx-auto fw-medium"
          >
            Explore millions of volumes from the Open Library nodes. Structured metadata for the modern reader.
          </motion.p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-2xl mx-auto position-relative mb-5" ref={dropdownRef}>
          <BrutalCard className="p-1 border-0 shadow-lg" style={{ borderRadius: '100px' }}>
            <InputGroup className="border-0 bg-transparent">
              <div className="d-flex align-items-center ps-4 text-accent">
                <FaSearch size={20} />
              </div>
              <Form.Control
                placeholder="Search by title, author, or ISBN..."
                className="border-0 shadow-none px-3 py-3 fs-5 bg-transparent"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => query.length > 2 && setShowSuggestions(true)}
              />
              {query && (
                <button
                  type="button"
                  className="bg-transparent border-0 px-3 text-secondary hover:text-accent transition-colors"
                  onClick={() => setQuery('')}
                >
                  <FaTimes />
                </button>
              )}
              <BrutalButton 
                variant="primary" 
                className="px-5 ms-2 my-1 me-1"
                onClick={() => query.length > 2 && searchBooks(query)}
              >
                Search
              </BrutalButton>
            </InputGroup>
          </BrutalCard>

          {/* SUGGESTIONS DROPDOWN */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="position-absolute w-100 mt-3 bg-surface rounded-2xl shadow-xl overflow-hidden glass"
                style={{ zIndex: 1000, borderRadius: '24px' }}
              >
                {loading ? (
                  <div className="p-5 text-center">
                    <Spinner animation="border" size="sm" className="text-accent me-2" />
                    <span className="text-secondary fw-semibold">Accessing archive...</span>
                  </div>
                ) : (
                  <div className="py-2">
                    {searchResults.length > 0 ? (
                      searchResults.slice(0, 6).map((book, index) => (
                        <div
                          key={book.work_key}
                          className={`d-flex align-items-center gap-3 p-3 transition-colors ${
                            index === activeIndex ? "bg-accent bg-opacity-10" : "hover:bg-bg"
                          }`}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => {
                            const bookId = book.id || book.work_key;
                            navigate(`/book/${bookId}`, { state: { book } });
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              width="40"
                              height="60"
                              className="rounded shadow-sm object-fit-cover bg-light"
                            />
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <div className="fw-bold text-truncate text-text text-sm">{book.title}</div>
                            <div className="small text-secondary text-truncate">{book.author || "Unknown Author"}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-secondary">
                        <p className="mb-0 fw-semibold small text-uppercase tracking-wider">No volumes found</p>
                        <p className="small mb-0">Try another search or check the spelling.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RESULTS GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 pt-4"
        >
          <BookGrid books={searchResults} myBooks={myBooks} loading={loading} />
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default Discover;