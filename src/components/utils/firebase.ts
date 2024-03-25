// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import firebase from "firebase/compat/app"; // Import firebase from compat
import "firebase/compat/auth"; // Import specific services from compat
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANObsAtf2_q9MDeX6HhVamSji62MIsWAk",
  authDomain: "qc-iosk-a8f26.firebaseapp.com",
  databaseURL:
    "https://qc-iosk-a8f26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qc-iosk-a8f26",
  storageBucket: "qc-iosk-a8f26.appspot.com",
  messagingSenderId: "214553767394",
  appId: "1:214553767394:web:54344b8b3a5510d31e1dbb",
  measurementId: "G-719EHFS9CP",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export services
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebaseConfig;