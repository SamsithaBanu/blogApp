// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogapp-ad139.firebaseapp.com",
  projectId: "blogapp-ad139",
  storageBucket: "blogapp-ad139.firebasestorage.app",
  messagingSenderId: "138679173680",
  appId: "1:138679173680:web:86daeb1f29ce2e7f7ba3f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);