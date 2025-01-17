// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "counceling-app.firebaseapp.com",
  projectId: "counceling-app",
  storageBucket: "counceling-app.firebasestorage.app",
  messagingSenderId: "89078978684",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-DDRKNDGJ9F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);