import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Firebase

interface CountDisplayProps {
  collectionName: string;
}
const CountDisplay: React.FC<CountDisplayProps> = ({ collectionName }) => {
    const [count, setCount] = useState<number | null>(null);
  
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
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, 'Visitors');
        const querySnapshot = await getDocs(collectionRef);
        const countValue = querySnapshot.size;

        setCount(countValue);
      } catch (error) {
        console.error('Error fetching document count:', error);
      }
    };

    fetchData();
  }, [db, collectionName]);

  return (
    <div>
      <h2>Number of Documents in {collectionName}</h2>
      <p>{count !== null ? count : 'Loading...'}</p>
    </div>
  );
};

export default CountDisplay;
