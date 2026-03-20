import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getUserBooks, updateBookStatus, saveBookToUser } from "../firebase/firestore";
import axios from "axios";

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchMyBooks();
    else setMyBooks([]);
  }, [user]);

  const fetchMyBooks = async () => {
    const books = await getUserBooks(user.uid);
    setMyBooks(books);
  };

  // 🔥 BACKEND SEARCH (UPGRADED)
  const searchBooks = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/books/search?query=${query}`
      );

      const formatted = res.data.results.map(book => ({
        id: book.work_key.split("/").pop(),
        work_key: book.work_key,

        title: book.title,
        author: book.author,
        cover: book.cover || "https://via.placeholder.com/150",

        publish_year: book.publish_year,
        rating: book.rating || null,

        // ❌ NO description here (search API doesn’t give it)
      }));

      setSearchResults(formatted);

    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToMyBooks = async (book, status) => {
    if (!user) return;
    await saveBookToUser(user.uid, book, status);
    fetchMyBooks();
  };

  const updateStatus = async (bookId, status) => {
    if (!user) return;
    await updateBookStatus(user.uid, bookId, status);
    fetchMyBooks();
  };

  return (
    <BookContext.Provider value={{
      myBooks,
      searchResults,
      loading,
      searchBooks,
      addToMyBooks,
      updateStatus
    }}>
      {children}
    </BookContext.Provider>
  );
};