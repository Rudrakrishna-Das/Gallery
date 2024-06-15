// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "galleryapp-18751.firebaseapp.com",
  projectId: "galleryapp-18751",
  storageBucket: "galleryapp-18751.appspot.com",
  messagingSenderId: "955278684033",
  appId: "1:955278684033:web:09fe907f0b086e927ec280",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
