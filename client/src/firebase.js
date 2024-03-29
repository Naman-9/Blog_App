// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-80da8.firebaseapp.com",
  projectId: "blog-mern-80da8",
  storageBucket: "blog-mern-80da8.appspot.com",
  messagingSenderId: "1066317109540",
  appId: "1:1066317109540:web:69bfda1cfb757c6a71bbb1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);