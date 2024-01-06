// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);