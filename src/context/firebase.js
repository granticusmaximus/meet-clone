// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
  apiKey: "AIzaSyArap6n4gDsB7H_nYh5xnspIwqKLoHjwzQ",
  authDomain: "gwsmeet.firebaseapp.com",
  projectId: "gwsmeet",
  storageBucket: "gwsmeet.firebasestorage.app",
  messagingSenderId: "926586089891",
  appId: "1:926586089891:web:691b1975e23abc32226a16",
  measurementId: "G-3QZ060Q26V"
};

// Initialize Firebase
const app = initializeApp(firebase);
const analytics = getAnalytics(app);