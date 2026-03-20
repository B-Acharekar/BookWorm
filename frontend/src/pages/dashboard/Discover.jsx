import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Form } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BookGrid from '../../components/books/BookGrid';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Discover = () => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { searchResults, searchBooks, loading, myBooks } = useBooks();

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  // 🔥 CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⚡ DEBOUNCED SEARCH (FAST + CLEAN)
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
    }, 250);
  };

  // 🎯 KEYBOARD NAVIGATION
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
      const book = searchResults[activeIndex];
      navigate(`/book/${book.id}`, { state: { book } });
      setShowSuggestions(false);
    }
  };

  const brutalShadow = {
    boxShadow: '10px 10px 0px #000'
  };

  return (
    <PageContainer className="px-2 py-3">

      {/* 🔥 SEARCH HERO */}
      <div className="bg-primary border border-4 border-dark p-4 mb-3 position-relative" style={brutalShadow}>
        <SectionHeader
          title="SEARCH_ENGINE"
          subtitle="TYPE → THINK → DISCOVER"
          align="left"
          className="mb-3 text-white"
        />

        <Form className="position-relative" ref={dropdownRef}>
          <InputGroup className="bg-white border border-4 border-dark p-1">

            <Form.Control
              placeholder="TYPE ANY BOOK..."
              className="border-0 fw-black text-uppercase p-3"
              style={{ fontSize: '1.4rem' }}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length > 2 && setShowSuggestions(true)}
            />

            {query && (
              <button
                type="button"
                className="bg-transparent border-0 px-3"
                onClick={() => setQuery('')}
              >
                <FaTimes />
              </button>
            )}

            <BrutalButton variant="dark" className="px-4">
              <FaSearch />
            </BrutalButton>
          </InputGroup>

          {/* 🔥 MODERN DROPDOWN */}
          {showSuggestions && (
            <div
              className="position-absolute w-100 mt-2 bg-white border border-4 border-dark"
              style={{ ...brutalShadow, zIndex: 999 }}
            >
              {/* ⚡ LOADING SKELETON */}
              {loading && (
                <div className="p-3 fw-bold text-center">
                  ⚡ SEARCHING...
                </div>
              )}

              {!loading && searchResults.slice(0, 6).map((book, index) => (
                <div
                  key={book.id}
                  className={`d-flex align-items-center gap-3 p-3 border-bottom border-2 border-dark ${
                    index === activeIndex ? "bg-warning" : ""
                  }`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    navigate(`/book/${book.id}`, { state: { book } });
                    setShowSuggestions(false);
                  }}
                >
                  <img
                    src={book.cover}
                    width="50"
                    height="70"
                    className="border border-2 border-dark"
                  />

                  <div>
                    <div className="fw-black text-uppercase">
                      {book.title}
                    </div>
                    <div className="small opacity-75">
                      {book.author}
                    </div>
                  </div>
                </div>
              ))}

              {!loading && searchResults.length === 0 && (
                <div className="p-3 text-center fw-bold">
                  NO RESULTS FOUND
                </div>
              )}
            </div>
          )}
        </Form>
      </div>

      {/* 🔥 GRID */}
      <div>
        <BookGrid books={searchResults} myBooks={myBooks} loading={loading} />
      </div>

    </PageContainer>
  );
};

export default Discover;