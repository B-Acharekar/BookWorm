import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const bookService = {
  search: (query) => api.get(`/api/books/search?query=${encodeURIComponent(query)}`),
  getDetails: (id) => api.get(`/api/books/book/${id}`),
  getLibrary: (userId) => api.get(`/api/books/library/${userId}`),
  updateStatus: (userId, bookId, status, bookData, isFavorite) => 
    api.post('/api/books/status', { user_id: userId, book_id: bookId, status, book_data: bookData, is_favorite: isFavorite }),
  getReviews: (bookId) => api.get(`/api/books/reviews/${bookId}`),
  addReview: (reviewData) => api.post('/api/books/review', reviewData),
  toggleFavorite: (userId, bookId, isFavorite) => 
    api.post('/api/books/favorite', { user_id: userId, book_id: bookId, is_favorite: isFavorite }),
};

export const agentService = {
  getRecommendations: (userId) => api.get(`/recommendations?user_id=${userId}`),
  getEvents: (location) => api.get(`/events?location=${encodeURIComponent(location)}`),
};

export const adminService = {
  getUsers: () => api.get('/api/admin/users'),
  updateRole: (uid, data) => api.post(`/api/admin/users/${uid}/role`, data),
  getManualEvents: () => api.get('/api/admin/events'),
  createEvent: (data) => api.post('/api/admin/events', data),
  deleteEvent: (eid) => api.delete(`/api/admin/events/${eid}`),
};

export default api;
