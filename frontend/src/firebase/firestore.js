import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const USERS_BOOKS_COLLECTION = "user_books";

export const saveBookToUser = async (userId, bookData, status = "TO READ") => {
  const bookRef = doc(db, USERS_BOOKS_COLLECTION, `${userId}_${bookData.id}`);
  await setDoc(bookRef, {
    userId,
    bookId: bookData.id,
    title: bookData.title,
    author: bookData.author,
    cover: bookData.cover,
    status,
    timestamp: new Date()
  });
};

export const getUserBooks = async (userId) => {
  const q = query(collection(db, USERS_BOOKS_COLLECTION), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateBookStatus = async (userId, bookId, status) => {
  const bookRef = doc(db, USERS_BOOKS_COLLECTION, `${userId}_${bookId}`);
  await updateDoc(bookRef, { status });
};

export const removeBook = async (userId, bookId) => {
  const bookRef = doc(db, USERS_BOOKS_COLLECTION, `${userId}_${bookId}`);
  await deleteDoc(bookRef);
};
