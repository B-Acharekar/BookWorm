# BookWorm Frontend 🎨

React + Vite frontend for BookWorm, a modern platform for book discovery, tracking, and community engagement.

![Frontend UI](https://via.placeholder.com/1200x400?text=BookWorm+Frontend+Interface)

## 📱 Overview

A responsive, fast, and modern web application built with React and Vite. Features a brutalist design aesthetic with smooth animations and offline support.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── pages/              # Route pages
│   │   ├── public/         # Login, signup, landing
│   │   ├── dashboard/      # Main app pages
│   │   ├── books/          # Book detail views
│   │   ├── admin/          # Admin panels
│   │   └── community/      # Community features
│   ├── components/         # Reusable components
│   │   ├── books/          # Book-related components
│   │   ├── events/         # Event components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI primitives
│   ├── context/            # React context (Auth, Theme, Books)
│   ├── firebase/           # Firebase config & utilities
│   ├── services/           # API service (axios)
│   ├── styles/             # Global styles & brutalist CSS
│   ├── assets/             # Images & media
│   ├── App.jsx
│   └── main.jsx
├── public/                 # Static assets
│   ├── service-worker.js   # PWA service worker
│   └── icons/              # App icons
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:8000
```

3. **Start development server:**
```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📦 Dependencies

**Core:**
- `react` ^19.2.0 - UI framework
- `react-dom` ^19.2.0 - React DOM renderer
- `react-router-dom` ^7.13.1 - Routing

**UI & Styling:**
- `bootstrap` ^5.3.8 - CSS framework
- `react-bootstrap` ^2.10.10 - Bootstrap components
- `framer-motion` ^12.35.1 - Animations
- `react-icons` ^5.6.0 - Icon library

**Backend Integration:**
- `firebase` ^12.10.0 - Firebase SDK
- `axios` ^1.13.6 - HTTP client

**Build & Development:**
- `vite` ^7.3.1 - Build tool
- `eslint` ^9.39.1 - Linting
- `@vitejs/plugin-react` - Vite React plugin

## 🎨 Design System

### Brutalist Aesthetic
Located in `styles/brutalist.css` - minimal, functional design with:
- High contrast
- Bold typography
- Minimal decoration
- Raw, honest UI

### Components

**Layout:**
- `Navbar` - Top navigation
- `Footer` - Footer section
- `PageContainer` - Page wrapper
- `SectionHeader` - Section titles

**UI Primitives:**
- `BrutalButton` - Primary button style
- `BrutalCard` - Card container
- `ThemeToggle` - Dark/light mode toggle

**Feature Components:**
- `BookCard` - Book preview card
- `BookGrid` - Grid of books
- `ReadingStatusToggle` - Progress tracker
- `EventCard` - Event listing

## 🔐 Authentication

Handled via Firebase Authentication (`firebase/auth.js`):
- Email/password signup & login
- Google OAuth integration
- Session persistence
- Protected routes

See `context/AuthContext.jsx` for auth state management.

## 📚 State Management

**Context API:**
- `AuthContext` - User authentication & profile
- `BookContext` - User library & books
- `ThemeContext` - Dark/light theme

## 🔗 API Integration

API service in `services/api.js`:

```javascript
import api from '@/services/api';

// Example requests
await api.get('/books');
await api.post('/recommendations', { preferences });
await api.put(`/books/${id}`, { status: 'reading' });
```

Base URL configured via `VITE_API_BASE_URL` environment variable.

## 🛠️ Development

### Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### ESLint Configuration

Config in `eslint.config.js` with rules for:
- React best practices
- React Hooks validation
- React Refresh compatibility

Extend for TypeScript support as needed.

## 📱 PWA Features

- Service worker (`public/service-worker.js`)
- Offline support
- App manifest (`public/manifest.json`)
- Installable as web app

## 🧪 Testing

Consider adding:
- Vitest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Firebase Hosting
```bash
firebase deploy --only hosting
```

### Environment Variables
Set these in hosting platform:
- `VITE_FIREBASE_*` - Firebase credentials
- `VITE_API_BASE_URL` - Backend URL

## 🔗 Related Documentation

- [Main Project README](../README.md)
- [Backend Documentation](../backend/README.md)
- [Firebase Config](./src/firebase/firebaseConfig.js)

## 🐛 Troubleshooting

**CORS Issues:**
- Check backend CORS configuration
- Verify frontend URL in backend

**Firebase Auth Issues:**
- Confirm Firebase credentials in `.env`
- Check authentication methods in Firebase Console
- Ensure domain is whitelisted

**Build Issues:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

**Frontend Version:** 1.0.0  
**Built with:** React 19 + Vite 7  
**Last Updated:** April 2026
