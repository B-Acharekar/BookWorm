import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import BookCard from './BookCard';

const BookGrid = ({ books, myBooks = [], loading = false }) => {
  // AGGRESSIVE LOADING STATE
  if (loading) return (
    <div className="d-flex flex-column align-items-center justify-content-center border border-5 border-dark bg-dark text-warning p-5 mb-4" 
         style={{ boxShadow: '10px 10px 0px 0px #000', minHeight: '300px' }}>
      <div className="display-4 fw-black mb-3 blink text-uppercase">Initialising_Scan...</div>
      <div className="w-100 bg-secondary" style={{ height: '10px' }}>
        <div className="bg-warning h-100" style={{ width: '60%', transition: 'width 2s ease-in-out' }}></div>
      </div>
      <p className="mt-3 fw-bold small opacity-75">ACCESSING_GLOBAL_DATABASE_NODE_77</p>
    </div>
  );

  // NO RESULTS STATE
  if (!loading && books.length === 0) {
    return (
      <div className="border border-4 border-dark p-4 bg-white text-center" style={{ boxShadow: '8px 8px 0px 0px #000' }}>
        <h2 className="fw-black text-uppercase m-0">[SYSTEM_ERROR]: NO_VOLUMES_FOUND</h2>
      </div>
    );
  }

  return (
    /* g-0: Removes all Bootstrap gutters for that tight, "No Whitespace" look.
      The border-top on the Row prevents double-borders with the search area.
    */
    <div className="border-top border-4 border-dark">
      <Row className="g-0"> 
        {books.map((book) => {
          const myBook = myBooks.find(b => b.bookId === book.id || b.id === book.id);
          return (
            /* xs={12} : Full width on phones for vertical "strip" design
               sm={6}  : 2-column on small tablets
               lg={4}  : 3-column on large desktops
            */
            <Col xs={12} sm={6} lg={4} key={book.id} className="border-bottom border-end border-4 border-dark p-0 overflow-hidden">
              <BookCard 
                book={book} 
                status={myBook?.status} 
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default BookGrid;