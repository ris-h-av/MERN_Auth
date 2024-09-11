// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e7e47.firebaseapp.com",
  projectId: "mern-auth-e7e47",
  storageBucket: "mern-auth-e7e47.appspot.com",
  messagingSenderId: "631066561396",
  appId: "1:631066561396:web:005791d193a69bd3bfba21"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);