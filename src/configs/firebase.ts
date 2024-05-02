// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBOWx0o3xs65FXi8FcjjJolIN0YcC_gosY",
  authDomain: "quick-eats-app-1bce5.firebaseapp.com",
  projectId: "quick-eats-app-1bce5",
  storageBucket: "quick-eats-app-1bce5.appspot.com",
  messagingSenderId: "427003913746",
  appId: "1:427003913746:web:6adea5b879d118ceb09acb",
  measurementId: "G-J8HZR16QTQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);