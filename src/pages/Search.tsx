import React, { Component, ChangeEvent, useState, useEffect } from "react";
import { IonContent, IonPage } from '@ionic/react';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import '../assets/css/search.css';
import Dock from '../components/controls/navigationControls/dock';
import Backbtn from '../components/controls/navigationControls/Backbtn';
import OSKeyboard from "../components/keyboard/onScreenKeyboard";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import '../assets/css/keyboard.css';

interface SearchProps {
  name: string;
}

interface SearchState {
  layoutName: string;
  input: string;
}

const Search: React.FC<SearchProps> = ({ name }) => {
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [layoutName, setLayoutName] = useState<string>("default");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    // Perform any setup or side effects here
    // This effect will run once on mount

    // Cleanup function (equivalent to componentWillUnmount)
    return () => {
      // Perform any cleanup here
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const onChange = (newInput: string) => {
    setInput(newInput);
    console.log("Input changed", newInput);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
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


  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/Map');
  };

  const handleSearch = () => {
    // Redirect to the "/Map" route
    history.push('/SanBartolome');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        {/* <h1>Before Removing Search</h1> */}
        <div className="overflow-hidden ">
          <div className="relative overflow-hidden ">
            <div className="max-w-full px-4 py-10 mx-auto sm:px-6 lg:px-8 sm:py-5">
              <div className="text-center mt-[10px]">
                <h1 className="text-4xl font-bold sm:text-6xl">
                  Search
                </h1>
                <div className="join">
                  <div>
                    <div>
                      <input className="input input-bordered bg-white w-[650px] h-16 rounded-2xl text-gray-600 join-item" placeholder="Search..." value={input} onChange={onChangeInput}
                      />
                    </div>
                  </div>

                  <div className="indicator">
                    <button className="w-20 h-16 text-gray-700 bg-white btn hover:bg-gray-300 rounded-2xl join-item"><Icon icon="wpf:search" className="w-7 h-7" /></button>
                  </div>
                </div>

                <div className="hidden">
                  <ul className="justify-center w-5/12 mx-auto mt-5 bg-white menu lg:menu-horizontal rounded-box">
                    <div>
                      <h2 className="text-gray-900">No Results Found</h2>
                    </div>

                  </ul>
                </div>
                <div className="grid grid-cols-1">
                  <div className="mt-5 space-x-2">
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">Faculties</div>
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">Facilities</div>
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">Gymnasium</div>
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">Departments</div>
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">SPARD</div>
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">Parking</div>
                    <div className="text-gray-900 bg-gray-200 badge badge-lg ">Admin</div>

                  </div>

                </div>

                <div className=" mt-20 flex justify-center">
                <Keyboard
                  keyboardRef={(r) => setKeyboard(r)}
                  layoutName={layoutName}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  layout={{
                    default: [
                      // Add the layout you provided here
                      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                      "{tab} q w e r t y u i o p [ ] \\",
                      "{lock} a s d f g h j k l ; ' {enter}",
                      "{shift} z x c v b n m , . / {shift}",
                      "@ {space} .com"
                    ],
                    shift: [
                      // Add the shifted layout here
                      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                      "{tab} Q W E R T Y U I O P { } |",
                      '{lock} A S D F G H J K L : " {enter}',
                      "{shift} Z X C V B N M < > ? {shift}",
                      "@ {space} .com"
                    ]
                  }}
                />
                </div>
              </div>


            </div>
          </div>
        </div>

        <Backbtn name={'Back'} />
        <Dock name={'Dock'} />
      </IonContent>
    </IonPage>
  );
};

export default Search;
