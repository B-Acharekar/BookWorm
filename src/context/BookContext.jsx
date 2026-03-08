import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUserBooks, updateBookStatus, removeBook, saveBookToUser } from "../firebase/firestore";
import axios from "axios";

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyBooks();
    } else {
      setMyBooks([]);
    }
  }, [user]);

  const fetchMyBooks = async () => {
    if (!user) return;
    const books = await getUserBooks(user.uid);
    setMyBooks(books);
  };

  const searchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      const formatted = response.data.docs.slice(0, 10).map(book => ({
        id: book.key.split("/").pop(),
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown Author",
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://via.placeholder.com/150",
        publish_year: book.first_publish_year,
        description: book.first_sentence ? book.first_sentence[0] : "No description available."
      }));
      setSearchResults(formatted);
    } catch (error) {
      console.error("Search failed:", error);
    }
    setLoading(false);
  };

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

  const value = {
    myBooks,
    searchResults,
    loading,
    searchBooks,
    addToMyBooks,
    updateStatus
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
