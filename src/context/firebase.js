import { initializeApp } from "firebase/app";
const firebase = {
  apiKey: "AIzaSyArap6n4gDsB7H_nYh5xnspIwqKLoHjwzQ",
  authDomain: "gwsmeet.firebaseapp.com",
  projectId: "gwsmeet",
  storageBucket: "gwsmeet.firebasestorage.app",
  messagingSenderId: "926586089891",
  appId: "1:926586089891:web:691b1975e23abc32226a16",
  measurementId: "G-3QZ060Q26V"
};

const app = initializeApp(firebase);

export { app };