# BookWorm Backend 🚀

FastAPI backend for BookWorm, featuring AI-powered agents for recommendations, events, and chat capabilities.

![Backend Architecture](https://via.placeholder.com/1200x400?text=BookWorm+Backend+Architecture)

## 📐 Architecture

The backend is organized around AI agents that power different aspects of the application:

```
backend/
├── app/
│   ├── agents/           # LangGraph-based AI agents
│   │   ├── router.py     # Main request router
│   │   ├── graph.py      # Agent orchestration
│   │   ├── recommendation_agent.py
│   │   └── events_agent.py
│   ├── routes/           # API endpoints
│   │   ├── admin.py
│   │   ├── books.py
│   │   └── recommendation_routes.py
│   ├── services/         # External service integrations
│   │   ├── firebase_service.py
│   │   ├── gemini_service.py
│   │   └── openlibrary_service.py
│   ├── models/           # Data models & schemas
│   ├── prompts/          # AI agent prompts
│   └── config.py
├── requirements.txt
├── render.yaml          # Render deployment config
└── init_admin.py        # Admin initialization script
```

## 🔧 Setup

### Prerequisites
- Python 3.8+
- Firebase project credentials
- Gemini API key

### Installation

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
Create `.env` file:
```env
FIREBASE_CREDENTIALS=./bookworm_firebase_admin.json
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_mongodb_url
BACKEND_URL=http://localhost:8000
```

5. **Initialize admin:**
```bash
python init_admin.py
```

6. **Run development server:**
```bash
python -m uvicorn app.main:app --reload
```

Server runs at `http://localhost:8000`

## 📡 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book details
- `POST /api/books` - Add book to library
- `PUT /api/books/{id}` - Update reading status
- `DELETE /api/books/{id}` - Remove from library

### Recommendations
- `POST /api/recommendations` - Get AI recommendations
- `GET /api/recommendations/trending` - Get trending recommendations
- `POST /api/recommendations/save` - Save recommendation

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Admin
- `POST /api/admin/users` - Manage users
- `GET /api/admin/stats` - Get application stats

## 🤖 AI Agents

### Recommendation Agent
Powered by LangGraph, analyzes user reading history and preferences to provide personalized book recommendations.

**Prompt:** `prompts/recommendation_prompt.txt`
- Considers reading history
- Analyzes genre preferences
- Suggests new books
- Ranks by relevance

### Events Agent
Suggests community events based on user interests and reading patterns.

**Prompt:** `prompts/events_prompt.txt`
- Analyzes user interests
- Suggests relevant events
- Recommends event types
- Considers time preferences

### Router Agent
Intelligent request router that directs queries to appropriate agents.

**Prompt:** `prompts/chat_prompt.txt`
- Understands user intent
- Routes to correct agent
- Maintains conversation context

## 🔗 Services

### Firebase Service (`services/firebase_service.py`)
- User authentication
- Firestore database operations
- Real-time listeners
- Cloud storage integration

### Gemini Service (`services/gemini_service.py`)
- LLM API integration
- Prompt engineering
- Response parsing
- Token management

### OpenLibrary Service (`services/openlibrary_service.py`)
- Book metadata retrieval
- ISBN lookups
- Author information
- Cover image fetching

## 🗄️ Data Models

See `models/schemas.py` for complete schema definitions:

- `User` - User profile and preferences
- `Book` - Book information and metadata
- `ReadingStatus` - Book list entry with progress
- `Event` - Community events
- `Recommendation` - AI-generated recommendations
- `ReviewRating` - Book reviews and ratings

## 🚀 Deployment

### Render Deployment

Configuration in `render.yaml`:

```bash
render deploy
```

Or push to trigger automatic deployment if connected to GitHub.

### Environment Setup on Render
1. Add `FIREBASE_CREDENTIALS` as secret
2. Add `GEMINI_API_KEY` as environment variable
3. Set `PYTHON_VERSION=3.9`

## 📊 Monitoring

API Documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🐛 Troubleshooting

**Firebase Connection Issues:**
- Verify credentials JSON path
- Check Firestore rules in `firestore.rules`

**Gemini API Issues:**
- Confirm API key is active
- Check rate limits
- Verify quota usage in GCP console

**Port Already in Use:**
```bash
python -m uvicorn app.main:app --reload --port 8001
```

## 🔒 Security

- Firebase authentication required for protected routes
- Admin-only routes require elevated permissions
- API keys stored in environment variables
- CORS configured for frontend domain

## 📝 Contributing

When adding new features:
1. Create agent in `agents/` if adding AI capability
2. Add service in `services/` for external integrations
3. Create routes in `routes/` for new endpoints
4. Update models in `models/` if adding data structures
5. Update prompts in `prompts/` for AI changes

## 🔗 Related Documentation

- [Main Project README](../README.md)
- [Frontend Documentation](../frontend/README.md)
- [Firebase Rules](../firestore.rules)

---

**Backend Version:** 1.0.0  
**Last Updated:** April 2026
