// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3Vw5bEhgPGQrFep4aAD0VZL-qbwBYNMw",
  authDomain: "gapapa-80493.firebaseapp.com",
  projectId: "gapapa-80493",
  storageBucket: "gapapa-80493.appspot.com",
  messagingSenderId: "192499395686",
  appId: "1:192499395686:web:e20a39daedd90de46d11a7",
  measurementId: "G-VB4GWZWTL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };