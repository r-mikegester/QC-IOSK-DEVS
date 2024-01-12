import React, { useEffect, useState } from 'react';
import { collection, getFirestore, doc, query, getDocs } from 'firebase/firestore';

// Define the interface for BuildingData
interface BuildingData {
  id: string;
  building: string;
  room: string;
}

const Sample: React.FC = () => {
    const [data, setData] = useState<BuildingData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const db = getFirestore();
          const sanBartolomeRef = collection(db, 'sanBartolome', 'B2kIWlx8iLyIQtZDLRzJ');
          const q = query(sanBartolomeRef);
          const snapshot = await getDocs(q);
          
          snapshot.docs.forEach(doc => {
            console.log('Document ID:', doc.id, ' => Data:', doc.data());
          });
  
          const newData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          } as BuildingData));
  
          setData(newData);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
    
      fetchData();
    }, []);
  
    return (
        //display here the data i fetch from firestore
        <div className="p-2 w-96 h-auto mt-10 flex items-center justify-center">
        {loading ? (
          <div className="text-base-content">Loading...please wait.
          <div className="flex flex-col gap-4 w-52">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div></div>
          
        ) : (
          <div>
            {data.length === 0 ? (
              <p className="text-base-content">No data available</p>
            ) : (
              <div>
                {data.map((doc) => (
                  <div key={doc.id} className="w-96">
                    <p className="text-base-content">{doc.building}</p>
                    <p className="text-base-content">{doc.room}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Sample;
  
