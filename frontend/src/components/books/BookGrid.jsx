import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BookCard from './BookCard';

const BookGrid = ({ books, myBooks = [], loading = false }) => {
  if (loading) return (
    <div className="text-center py-5">
      <h3 className="fw-black">SEARCHING SHELVES...</h3>
    </div>
  );

  return (
    <Row>
      {books.map((book) => {
        const myBook = myBooks.find(b => b.bookId === book.id || b.id === book.id);
        return (
          <Col md={6} lg={4} key={book.id}>
            <BookCard book={book} status={myBook?.status} />
          </Col>
        );
      })}
    </Row>
  );
};

export default BookGrid;
