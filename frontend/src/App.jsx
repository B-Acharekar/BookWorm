import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts & Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout & UI
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'; // Moved to separate file
import PageContainer from './components/layout/PageContainer';
import SectionHeader from './components/ui/SectionHeader';
import BrutalButton from './components/ui/BrutalButton';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/brutalist.css'; 
import './index.css';

// Lazy Pages
const Landing = lazy(() => import('./pages/public/Landing'));
const Login = lazy(() => import('./pages/public/Login'));
const Signup = lazy(() => import('./pages/public/Signup'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Discover = lazy(() => import('./pages/dashboard/Discover'));
const MyBooks = lazy(() => import('./pages/dashboard/MyBooks'));
const Events = lazy(() => import('./pages/dashboard/Events'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const BookDetails = lazy(() => import('./pages/books/BookDetails'));
const Community = lazy(() => import('./pages/community/community'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/public/AdminLogin'));

/**
 * 3D LOADER COMPONENT
 * Incorporating your Whisk "Infinite Dig" idea
 */
const PageLoader = () => (
  <PageContainer className="d-flex flex-column align-items-center justify-content-center vh-100 bg-paper">
    <div className="loader-container mb-4">
      {/* Replace with your Whisk generated Video/GIF */}
      <img 
        src="/assets/animations/bookworm-dig.gif" 
        alt="Loading..." 
        style={{ width: '120px', filter: 'grayscale(1)' }} 
      />
    </div>
    <SectionHeader 
      title="DECODING CHAPTERS" 
      align="center" 
      className="text-uppercase tracking-tighter"
    />
  </PageContainer>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("App Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <PageContainer className="text-center py-10">
          <div className="premium-card p-5 bg-white border border-rose-500 shadow-lg">
            <h1 className="serif fw-bold text-rose-500">Something went wrong.</h1>
            <p className="text-muted">Please refresh the page or try again later.</p>
            <BrutalButton variant="primary" onClick={() => window.location.reload()}>Refresh</BrutalButton>
          </div>
        </PageContainer>
      );
    }
    return this.props.children;
  }
}

// Helper for Auth Logic to keep JSX clean
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to={adminOnly ? "/login/admin" : "/login"} replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  
  return children;
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <BookProvider>
            <Router>
              <div className="app-wrapper d-flex flex-column min-vh-100">
                <Navbar />
                
                <main className="flex-grow-1">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public */}
                      <Route path="/" element={<Landing />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/login/admin" element={<AdminLogin />} />
                      <Route path="/discover" element={<Discover />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/book/:bookId" element={<BookDetails />} />

                      {/* Protected */}
                      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                      <Route path="/my-books" element={<PrivateRoute><MyBooks /></PrivateRoute>} />
                      <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
                      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                      {/* Admin */}
                      <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />

                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>

                <Footer />
              </div>
            </Router>
          </BookProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const NotFound = () => (
  <PageContainer className="text-center py-10">
    <div className="premium-card shadow-solid d-inline-block p-5 bg-surface border border-4 border-dark overflow-visible">
      <h1 className="display-1 fw-black tracking-tighter mb-4">404</h1>
      <SectionHeader 
        title="LOST IN THE STACKS" 
        subtitle="This page was moved or never written." 
        align="center" 
      />
      <div className="mt-5">
        <BrutalButton variant="primary" className="px-5 py-3" onClick={() => window.location.href = '/'}>
          RETURN TO CATALOGUE
        </BrutalButton>
      </div>
    </div>
  </PageContainer>
);

export default App;