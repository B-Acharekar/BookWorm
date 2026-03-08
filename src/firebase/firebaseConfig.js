import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with actual Firebase config from USER or environment variables
const firebaseConfig = {
  apiKey: "AIzaSyD_Z3WJXCvhuV09AuP13w1BdKnoHQxYsO0",
  authDomain: "simple-app-5892c.firebaseapp.com",
  projectId: "simple-app-5892c",
  storageBucket: "simple-app-5892c.firebasestorage.app",
  messagingSenderId: "137420687739",
  appId: "1:137420687739:web:6289e41799aba88fe155de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
