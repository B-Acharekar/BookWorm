import React from 'react';
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import BookCard from './BookCard';
import SectionHeader from '../ui/SectionHeader';
import { motion } from 'framer-motion';

const BookGrid = ({ books, myBooks = [], loading, title, subtitle }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" className="text-accent" />
        <p className="mt-3 text-secondary serif italic">Reading the volumes...</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-5 bg-bg rounded-2xl border border-dashed">
        <p className="text-secondary serif mb-0">No volumes found in this section of the archive.</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-4">
      {title && <SectionHeader title={title} subtitle={subtitle} />}
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Row className="g-4 g-lg-5">
          {books.map((book) => {
            const libBook = myBooks.find(b => b.bookId === (book.work_key || book.id));
            return (
              <Col key={book.work_key || book.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div variants={item} className="h-100">
                  <BookCard book={book} status={libBook?.status} />
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </motion.div>
    </div>
  );
};

export default BookGrid;