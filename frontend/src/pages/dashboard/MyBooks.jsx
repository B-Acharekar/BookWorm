import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BookGrid from '../../components/books/BookGrid';
import { motion } from 'framer-motion';

const MyBooks = () => {
  const { myBooks } = useBooks();

  const filterBooks = (status) => myBooks.filter(book => book.status === status);
  const favoriteBooks = myBooks.filter(book => book.isFavorite);

  return (
    <PageContainer>
      <Container className="py-5">
        <div className="text-center mb-5 py-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-3 fw-bold mb-3 text-premium-gradient serif"
          >
            Your Private Library
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            className="mx-auto title-underline mb-4"
          />
          <p className="lead text-secondary max-w-xl mx-auto fw-medium">
            A curated record of your literary expeditions and active research logs.
          </p>
        </div>

        <div className="premium-tabs-wrapper pt-2">
          <Tabs
            defaultActiveKey="reading"
            id="my-books-tabs"
            className="justify-content-center border-0 mb-5 custom-premium-tabs"
          >
            <Tab 
              eventKey="reading" 
              title={
                <div className="d-flex flex-column align-items-center">
                  <span className="serif fw-bold">Reading</span>
                  <span className="small opacity-50">{filterBooks('reading').length}</span>
                </div>
              }
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                <BookGrid 
                  books={filterBooks('reading')} 
                  myBooks={myBooks} 
                  subtitle="Volumes currently under active review."
                />
              </motion.div>
            </Tab>
            
            <Tab 
              eventKey="to-read" 
              title={
                <div className="d-flex flex-column align-items-center">
                  <span className="serif fw-bold">Queue</span>
                  <span className="small opacity-50">{filterBooks('to_read').length}</span>
                </div>
              }
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                <BookGrid 
                  books={filterBooks('to_read')} 
                  myBooks={myBooks} 
                  subtitle="Future research objectives."
                />
              </motion.div>
            </Tab>

            <Tab 
              eventKey="completed" 
              title={
                <div className="d-flex flex-column align-items-center">
                  <span className="serif fw-bold">Archived</span>
                  <span className="small opacity-50">{filterBooks('completed').length}</span>
                </div>
              }
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                <BookGrid 
                  books={filterBooks('completed')} 
                  myBooks={myBooks} 
                  subtitle="Volumes successfully cataloged."
                />
              </motion.div>
            </Tab>

            <Tab 
              eventKey="favorites" 
              title={
                <div className="d-flex flex-column align-items-center">
                  <span className="serif fw-bold">Premier</span>
                  <span className="small opacity-50">{favoriteBooks.length}</span>
                </div>
              }
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                <BookGrid 
                  books={favoriteBooks} 
                  myBooks={myBooks} 
                  subtitle="Highly valued volumes in your collection."
                />
              </motion.div>
            </Tab>
          </Tabs>
        </div>
      </Container>
      
      <style>{`
        .custom-premium-tabs .nav-link {
          color: var(--text-light);
          border: none !important;
          padding: 1rem 2rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .custom-premium-tabs .nav-link.active {
          color: var(--accent) !important;
          background: transparent !important;
        }
        .custom-premium-tabs .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 3px;
          background: var(--accent);
          border-radius: 10px;
        }
        .custom-premium-tabs .nav-item:hover .nav-link {
          color: var(--text);
        }
      `}</style>
    </PageContainer>
  );
};

export default MyBooks;
