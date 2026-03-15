import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BookGrid from '../../components/books/BookGrid';
import BrutalCard from '../../components/ui/BrutalCard';

const MyBooks = () => {
  const { myBooks } = useBooks();

  const filterBooks = (status) => myBooks.filter(book => book.status === status);

  return (
    <PageContainer>
      <SectionHeader 
        title="My Library" 
        subtitle="Manage your personal reading collection."
      />

      <BrutalCard className="bg-white p-0 overflow-hidden shadow-none border-dark border-4">
        <Tabs
          defaultActiveKey="reading"
          id="my-books-tabs"
          className="mb-0 border-bottom border-4 border-dark bg-light fw-black text-uppercase fs-5"
          fill
        >
          <Tab eventKey="reading" title={`READING (${filterBooks('READING').length})`}>
            <div className="p-4 p-md-5">
                <BookGrid books={filterBooks('READING')} myBooks={myBooks} />
            </div>
          </Tab>
          <Tab eventKey="to-read" title={`TO READ (${filterBooks('TO READ').length})`}>
            <div className="p-4 p-md-5">
                <BookGrid books={filterBooks('TO READ')} myBooks={myBooks} />
            </div>
          </Tab>
          <Tab eventKey="completed" title={`COMPLETED (${filterBooks('COMPLETED').length})`}>
            <div className="p-4 p-md-5">
                <BookGrid books={filterBooks('COMPLETED')} myBooks={myBooks} />
            </div>
          </Tab>
        </Tabs>
      </BrutalCard>
    </PageContainer>
  );
};

export default MyBooks;
