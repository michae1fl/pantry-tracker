// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfE-Po5JVHJ8SXtSxxlc0P5ErcQcA0tdA",
  authDomain: "pantry-tracker-489e8.firebaseapp.com",
  projectId: "pantry-tracker-489e8",
  storageBucket: "pantry-tracker-489e8.appspot.com",
  messagingSenderId: "250149608318",
  appId: "1:250149608318:web:def18f172c26a653f9712f",
  measurementId: "G-TYGG2277YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}