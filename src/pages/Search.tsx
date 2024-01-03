import React, { Component, ChangeEvent } from "react";
import { IonContent, IonPage } from '@ionic/react';
import Keyboard from "react-simple-keyboard";
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import "react-simple-keyboard/build/css/index.css";
import '../assets/css/search.css';
import Dock from '../components/controls/navigationControls/dock';
import Backbtn from '../components/controls/navigationControls/Backbtn';
import SimonTour from '../components/modals/SimonTourModal';
import OnScreenKeyboard from "../components/keyboard/onScreenKeyboard";

interface SearchProps {
  name: string;
}

interface SearchState {
  layoutName: string;
  input: string;
}

const Search: React.FC<SearchProps> = ({ name }) => {
  const [layoutName, setLayoutName] = React.useState<string>("default");
  const [input, setInput] = React.useState<string>("");

  const keyboardRef = React.useRef<Keyboard | null>(null);
  

  const history = useHistory();
  
  const onChange = (newInput: string) => {
    setInput(newInput);
    console.log("Input changed", newInput);
  };

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") {
      handleShift();
    }
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInput(newInput);
    if (keyboardRef.current) {
      keyboardRef.current.setInput(newInput);
    }
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
                      <input className="input input-bordered bg-white w-[650px] h-16 rounded-2xl text-gray-600 join-item" placeholder="Search..." value={input}
                        onChange={onChangeInput} />
                    </div>
                  </div>
                  {/* <select className="h-16 text-gray-900 bg-white select select-bordered join-item dropdown-content">
                    <option className="py-5">ALL</option>
                    <option className="py-5">BIKE PARKING</option>
                    <option className="py-5">PARKING</option>
                    <option className="py-5">FACULTIES</option>
                    <option className="py-5">ROOMS</option>
                    <option className="py-5">FACILITIES</option>
                  </select> */}
                  <div className="indicator">
                    <button onClick={() => document.getElementById('select_room').showModal()} className="w-20 h-16 text-gray-700 bg-white btn hover:bg-gray-300 rounded-2xl join-item"><Icon icon="wpf:search" className="w-7 h-7" /></button>
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

                <OnScreenKeyboard name={"OnScreenKeyboard"} />
              </div>

             
            </div>
          </div>
        </div>
        <Backbtn name={'Back'} />
        <Dock name={'Dock'} />
        <dialog id="select_room" className="modal">
          <div className="absolute top-0 right-0 min-h-screen p-5 transition-transform duration-300 ease-in-out transform translate-x-0 rounded-r-none modal-box w-96 drawer-overlay ">
            <h3 className="text-3xl font-bold text-center">Details</h3>

            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-0 lg:py-5 mx-auto">

              <div className="grid overflow-hidden border border-gray-200 shadow-sm md:grid-cols-1 rounded-xl dark:border-gray-700">
                <h3 className="text-xl font-bold text-center">IC101</h3>
                <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                    <Icon icon="mdi:information-variant-circle-outline" className="w-10 h-10 text-gray-500" />

                    <div className="grow">
                      <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                        Belmonte Building
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-gray-500 sm:text-2xl">
                        2nd Floor
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          Room: <span className="font-semibold text-gray-800 dark:text-gray-200">IC101</span>
                        </p>

                      </div>
                    </div>
                  </div>

                </a>
                <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                    <Icon icon="pepicons-pop:rewind-time" className="w-10 h-10 text-gray-500" />

                    <div className="grow">
                      <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                        Estimated Time of Arrival ( ETA )
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-gray-500 sm:text-2xl">
                        4:26
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                        </p>

                      </div>
                    </div>
                  </div>
                </a>
                <hr className="m-6 bg-gray-400" />
                <h3 className="text-3xl font-bold text-center">Directions</h3>
                <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                    <Icon icon="mdi:arrow-up-thick" className="w-10 h-10 text-gray-500" />

                    <div className="grow">
                      <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                        Head towards Techvoc Building
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                        </p>

                      </div>
                    </div>
                  </div>
                </a>
                <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                    <Icon icon="mdi:arrow-left-top-bold" className="w-10 h-10 text-gray-500" />

                    <div className="grow">
                      <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                        Head towards Techvoc Building
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                        </p>

                      </div>
                    </div>
                  </div>
                </a>
                <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                    <Icon icon="mdi:arrow-right-top-bold" className="w-10 h-10 text-gray-500" />

                    <div className="grow">
                      <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                        Head towards Techvoc Building
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                        </p>

                      </div>
                    </div>
                  </div>
                </a>
                <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                    <Icon icon="mdi:arrow-up-thick" className="w-10 h-10 text-gray-500" />

                    <div className="grow">
                      <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                        Head towards Techvoc Building
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                        </p>

                      </div>
                    </div>
                  </div>
                </a>


              </div>

              <div className="absolute inset-x-0 mx-6 bottom-5">
                <button onClick={() => document.getElementById('SimonTour').showModal()} className="w-full btn bg-sky-800 rounded-xl">
                  <Icon icon="material-symbols:moved-location-rounded" className="w-8 h-8" />
                  Start Navigation
                </button>
              </div>
            </div>

          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <SimonTour />
      </IonContent>
    </IonPage>
  );
};

export default Search;
