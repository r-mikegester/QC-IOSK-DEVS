import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore"; // Added Firestore type
import firebaseConfig, { db } from "../utils/firebase";
import { IonContent, IonPage } from '@ionic/react';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Backbtn from '../components/navigation/Backbtn';
import Dock from '../components/navigation/dock';
import '../assets/css/search.css';
import '../assets/css/keyboard.css';

const SearchTab: React.FC = () => {
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null); // Added Keyboard type  const [layoutName, setLayoutName] = useState<string>("default");
  const [input, setInput] = useState<string>("");
  const [layoutName, setLayoutName] = useState<string>("default");
  const history = useHistory();
  const firestore: Firestore = getFirestore(initializeApp(firebaseConfig)); // Added Firestore type
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const joinRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const firestore = getFirestore(firebaseApp);

    // Perform any setup or side effects here
    // This effect will run once on mount

    // Cleanup function (equivalent to componentWillUnmount)
    return () => {
      // Perform any cleanup here
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Check if the clicked element is inside the "join" class
      if (joinRef.current && joinRef.current.contains(event.target as Node)) {
        // Clicked inside "join" class, keep the dropdown visible
        setIsDropdownOpen(true);
      } else {
        // Clicked outside "join" class, hide the dropdown
        setIsDropdownOpen(false);
      }
    };

    // Add the click event listener to the document
    document.addEventListener("click", handleDocumentClick);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const onChange = (newInput: string) => {
    setInput(newInput);
    console.log("Input changed", newInput);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{enter}") handleSearch();
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInput(newInput);
    if (keyboard) keyboard.setInput(newInput);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = async () => {
    try {
      // Check if there is a non-empty search term
      if (input.trim() !== "") {
        // Query data from Firestore using the current value of 'input'
        const querySnapshot = await getDocs(collection(db, "Buildings"));
        const searchTerm = input.toLowerCase(); // Convert search term to lowercase for case-insensitive comparison

        // Flag to check if any matching result is found
        let isMatchFound = false;

        querySnapshot.forEach((doc) => {
          // Access the "name" field from the document data
          const buildingName = doc.data().name.toLowerCase(); // Convert building name to lowercase

          // Check if the building name contains the search term
          if (buildingName.includes(searchTerm)) {
            // Log all fields of the matching document
            console.log(`${doc.id} => Data: `, doc.data());
            isMatchFound = true;
          }
        });

        // If no matching result is found, log an error message
        if (!isMatchFound) {
          console.log("No matching name found");
        }
      } else {
        console.log("Please enter a search term");
      }
    } catch (error) {
      console.error("Error querying Firestore:", error);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <div className="overflow-hidden ">
          <div className="relative overflow-hidden ">
            <div className="max-w-full px-4 py-10 mx-auto sm:px-6 lg:px-8 sm:py-5">
              <div className="text-center mt-[10px]">
                <h1 className="text-4xl font-bold text-white sm:text-6xl">
                  Search
                </h1>
                <div className="join" ref={joinRef} onClick={handleDropdownToggle}>
                  <div>
                    <div>
                      <input className="input input-bordered placeholder-shown:text-base-content outline-none ring-0 bg-base-100 w-[650px] h-16 rounded-2xl text-base-content join-item" placeholder="Search..." value={input} onChange={onChangeInput}
                      />
                    </div>
                  </div>

                  <div className="indicator">
                    <button className="w-20 h-16 text-base-content bg-base-100 btn hover:bg-base-300 rounded-2xl join-item" onClick={handleSearch}><Icon icon="wpf:search" className="w-7 h-7" /></button>
                  </div>
                </div>
                {isDropdownOpen && (
                  <>
                    <div className="z-50 flex justify-center w-full h-auto px-6 py-2">
                      <div className="w-[730px] py-2 bg-base-100 rounded-2xl">

                        <div className="grid grid-cols-1">
                          <div className="mt-5 space-x-2">
                            <div className="text-base-content bg-base-300 badge badge-lg ">Faculties</div>
                            <div className="text-base-content bg-base-300 badge badge-lg ">Facilities</div>
                            <div className="text-base-content bg-base-300 badge badge-lg ">Gymnasium</div>
                            <div className="text-base-content bg-base-300 badge badge-lg ">Departments</div>
                            <div className="text-base-content bg-base-300 badge badge-lg ">SPARD</div>
                            <div className="text-base-content bg-base-300 badge badge-lg ">Parking</div>
                            <div className="text-base-content bg-base-300 badge badge-lg ">Admin</div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="hidden">
                  <ul className="justify-center w-5/12 mx-auto mt-5 bg-white menu lg:menu-horizontal rounded-box">
                    <div>
                      <h2 className="text-base-content">No Results Found</h2>
                    </div>

                  </ul>
                </div>


              </div>
              <div className="py-20">
                <div>
                  <div className="flex justify-center ">
                  


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Backbtn name={'Back'} />
        <Dock name={'Dock'} />
      </IonContent>
    </IonPage >
  );
};

export default SearchTab;