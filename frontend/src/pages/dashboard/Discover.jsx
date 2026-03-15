import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BookGrid from '../../components/books/BookGrid';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaSearch } from 'react-icons/fa';

const Discover = () => {
  const [query, setQuery] = useState('');
  const { searchResults, searchBooks, loading, myBooks } = useBooks();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) searchBooks(query);
  };

  return (
    <PageContainer>
      <div className="brutal-card bg-white mb-5 p-4 p-md-5">
        <SectionHeader 
          title="Global Library" 
          subtitle="Search millions of books instantly."
          align="center"
        />
        <Form onSubmit={handleSearch}>
          <InputGroup className="sharp-corners mb-3">
            <Form.Control
              placeholder="Search by title, author, or genre..."
              className="sharp-corners border-4 border-dark p-3"
              style={{ fontSize: '1.2rem' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <BrutalButton variant="primary" className="ms-3 px-4" type="submit">
              <FaSearch size={24} />
            </BrutalButton>
          </InputGroup>
        </Form>
      </div>

      {searchResults.length > 0 ? (
        <BookGrid books={searchResults} myBooks={myBooks} loading={loading} />
      ) : !loading && (
        <div className="text-center py-5">
          <SectionHeader 
            title="Ready to Explore?" 
            subtitle="Type something above to start your journey."
            align="center"
          />
        </div>
      )}
    </PageContainer>
  );
};

export default Discover;
