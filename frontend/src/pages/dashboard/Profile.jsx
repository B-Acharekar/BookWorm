import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BookContext';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaEdit, FaBook, FaHeart, FaCheckCircle } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();
  const { myBooks } = useBooks();

  const stats = [
    { label: 'Books Read', value: myBooks.filter(b => b.status === 'completed').length, icon: <FaCheckCircle /> },
    { label: 'Favorites', value: myBooks.filter(b => b.isFavorite).length, icon: <FaHeart /> },
    { label: 'Total Volumes', value: myBooks.length, icon: <FaBook /> },
  ];

  return (
    <PageContainer>
      <Container className="py-5">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-5 pt-4">
            <motion.h1 className="display-4 fw-bold mb-3 serif">Researcher Profile</motion.h1>
            <div className="mx-auto title-underline mb-4" />
          </div>

          <BrutalCard className="bg-surface p-5 border-0 shadow-lg text-center overflow-hidden position-relative" style={{ borderRadius: '40px' }}>
            {/* PROFILE HEADER */}
            <div className="mb-5 position-relative" style={{ zIndex: 10 }}>
              <div className="position-relative d-inline-block mb-4">
                <motion.img 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  src={user?.photoURL || 'https://via.placeholder.com/150'} 
                  alt={user?.displayName} 
                  className="rounded-circle shadow-lg border-0 bg-light" 
                  style={{ width: '160px', height: '160px', objectFit: 'cover' }} 
                />
                <div className="position-absolute bottom-0 end-0 bg-accent text-white p-2 rounded-circle shadow-sm border border-3 border-white">
                  <FaEdit size={14} />
                </div>
              </div>
              
              <h1 className="serif fw-bold mb-1 display-5">{user?.displayName}</h1>
              <p className="text-secondary fw-medium mb-0 opacity-75">{user?.email}</p>
            </div>

            {/* STATS GRID */}
            <Row className="g-4 mb-5 px-md-4">
              {stats.map((stat, i) => (
                <Col key={i} xs={4}>
                  <div className="p-3 bg-bg rounded-3xl border border-border">
                    <div className="text-accent mb-2 h4">{stat.icon}</div>
                    <div className="h3 fw-bold mb-0 serif">{stat.value}</div>
                    <div className="small text-secondary text-uppercase fw-bold tracking-tighter" style={{ fontSize: '0.65rem' }}>{stat.label}</div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* ACTIONS */}
            <div className="d-flex justify-content-center gap-3">
                <BrutalButton variant="primary" className="px-5 py-3">
                  Edit Profile
                </BrutalButton>
                <BrutalButton variant="secondary" className="px-5 py-3 bg-white border-border text-text d-flex align-items-center gap-2" onClick={logout}>
                  <FaSignOutAlt /> Sign Out
                </BrutalButton>
            </div>

            {/* DECORATION */}
            <div className="position-absolute bottom-0 right-0 p-5 opacity-10 text-accent" style={{ pointerEvents: 'none', zIndex: 1 }}>
               <FaBook size={200} />
            </div>
          </BrutalCard>
        </motion.div>
      </Container>
    </PageContainer>
  );
};

export default Profile;
