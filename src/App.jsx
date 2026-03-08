import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/brutalist.css';
import './index.css';

import BrutalButton from './components/ui/BrutalButton';
import Navbar from './components/layout/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import PageContainer from './components/layout/PageContainer';
import SectionHeader from './components/ui/SectionHeader';

// Lazy loading pages for performance
const Landing = lazy(() => import('./pages/public/Landing'));
const Login = lazy(() => import('./pages/public/Login'));
const Signup = lazy(() => import('./pages/public/Signup'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Discover = lazy(() => import('./pages/dashboard/Discover'));
const MyBooks = lazy(() => import('./pages/dashboard/MyBooks'));
const Events = lazy(() => import('./pages/dashboard/Events'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const BookDetails = lazy(() => import('./pages/books/BookDetails'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <PageContainer className="text-center">
      <SectionHeader title="VERIFYING ACCESS..." align="center" />
    </PageContainer>
  );

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// Loading State
const PageLoader = () => (
  <PageContainer className="text-center py-5">
    <SectionHeader title="LOADING CHAPTER..." align="center" />
  </PageContainer>
);

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="app-wrapper d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/events" element={<Events />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/book/:bookId" element={<BookDetails />} />

                  {/* 404 Route */}
                  <Route path="*" element={
                    <PageContainer className="text-center">
                      <div className="brutal-card d-inline-block p-5 bg-white">
                        <h1 className="display-1 fw-black">404</h1>
                        <SectionHeader title="PAGE LOST" align="center" subtitle="The book you're looking for isn't in this library." />
                        <BrutalButton variant="primary" onClick={() => window.location.href = '/'}>Go Home</BrutalButton>
                      </div>
                    </PageContainer>
                  } />
                </Routes>
              </Suspense>
            </main>
            <footer className="py-5 border-top border-4 border-dark bg-white">
              <PageContainer className="text-center">
                <p className="fw-black mb-0 text-uppercase fs-4">© 2026 BOOKWORM MUMBAI</p>
                <p className="text-muted fw-bold small text-uppercase mt-2">Built for the city of books.</p>
              </PageContainer>
            </footer>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
