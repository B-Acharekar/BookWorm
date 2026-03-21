import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { bookService } from "../services/api";

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyBooks = useCallback(async () => {
    if (!user) return;
    try {
      const res = await bookService.getLibrary(user.uid);
      setMyBooks(res.data.books);
    } catch (err) {
      console.error("Failed to fetch library:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);

  const searchBooks = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await bookService.search(query);
      // The backend now returns a refined list with 'work_key' as the raw ID
      setSearchResults(res.data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (book, status, isFavorite = null) => {
    if (!user) return;
    try {
      // User requested: Save FULL object
      // { bookId, title, author, cover, status, isFavorite, rating, createdAt, updatedAt }
      const bookId = book.id || book.bookId;
      const bookData = {
        bookId: bookId,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage || book.cover,
        status: status,
        isFavorite: isFavorite !== null ? isFavorite : (book.isFavorite || false),
        rating: book.rating || 0,
        genres: book.genres || [],
        updatedAt: new Date().toISOString()
      };
      
      await bookService.updateStatus(user.uid, bookData.bookId, status, bookData, bookData.isFavorite);
      await fetchMyBooks();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const addToLibrary = async (book, status = "to_read") => {
    await updateStatus(book, status);
  };

  const toggleFavorite = async (bookId, isFavorite) => {
    if (!user) return;
    try {
      await bookService.toggleFavorite(user.uid, bookId, isFavorite);
      await fetchMyBooks();
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  };

  return (
    <BookContext.Provider value={{
      myBooks,
      searchResults,
      loading,
      searchBooks,
      updateStatus,
      addToLibrary,
      toggleFavorite,
      fetchMyBooks
    }}>
      {children}
    </BookContext.Provider>
  );
};