# BookWorm 📚

A full-stack web application for book lovers to discover, track, and share their reading journey with community features and AI-powered recommendations.

[![BookWorm](https://book-worm-theta.vercel.app/icons/icon-512.png)](https://book-worm-theta.vercel.app/)

## 🎯 Overview

BookWorm is a modern platform that combines powerful book discovery with community engagement. Users can:
- 📖 Track their reading progress and maintain personal libraries
- 🤖 Get AI-powered book recommendations
- 🎉 Discover community events and connect with other readers
- 📊 View reading statistics and achievements
- ✨ Explore new books across multiple genres

## 🏗️ Project Structure

```
BookWorm/
├── backend/        # FastAPI backend with AI agents (see backend/README.md)
├── frontend/       # React + Vite frontend (see frontend/README.md)
└── firestore.rules # Firestore security rules
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Firebase account
- Gemini API key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_admin.py
python -m uvicorn app.main:app --reload
```

See [Backend README](./backend/README.md) for detailed setup instructions.

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

See [Frontend README](./frontend/README.md) for detailed setup instructions.

## 🛠️ Tech Stack

**Backend:**
- FastAPI - Modern web framework
- LangGraph - AI agent orchestration
- Google Generative AI (Gemini) - LLM operations
- Firebase Admin - Database & authentication
- Uvicorn - ASGI server

**Frontend:**
- React 19 - UI framework
- Vite - Build tool
- Bootstrap & React-Bootstrap - UI components
- Framer Motion - Animations
- Firebase SDK - Auth & database

**Infrastructure:**
- Firebase Firestore - Database
- Firebase Authentication - User management
- Google Cloud Platform - Hosting ready

## 📋 Features

### Core Features
- ✅ User authentication (Email/Google)
- ✅ Book library management
- ✅ Reading progress tracking
- ✅ Personal dashboard with statistics

### AI Features
- 🤖 Personalized book recommendations
- 🎯 Event suggestions
- 💬 Chat-based book discovery
- 🔄 Reading pattern analysis

### Community Features
- 👥 Community events
- 📚 Shared reading lists
- 💬 Book discussions
- 🎯 Recommendation sharing

## 🚢 Deployment

### Backend Deployment (Render)
See [backend/render.yaml](./backend/render.yaml) for Render deployment configuration.

### Frontend Deployment (Vercel/Firebase)
```bash
npm run build
```

## 🔐 Environment Variables

Create `.env` files in both backend and frontend directories:

**backend/.env:**
```
FIREBASE_CREDENTIALS=path/to/bookworm_firebase_admin.json
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_mongodb_url
```

**frontend/.env:**
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - API endpoints, agents, and services
- [Frontend Documentation](./frontend/README.md) - Components, pages, and state management

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

Built with ❤️ for book lovers everywhere.

---

**Last Updated:** April 2026
