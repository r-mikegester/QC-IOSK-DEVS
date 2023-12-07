import React, { Component, ChangeEvent } from "react";
import { IonContent, IonPage } from '@ionic/react';
import Keyboard from "react-simple-keyboard";
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import "react-simple-keyboard/build/css/index.css";
import './style.css';
import Dock from './../components/dock';
import Backbtn from './../components/Backbtn';

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
            <div className=" max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10  sm:py-5">
              <div className="text-center mt-[10px]">
                <h1 className="text-4xl sm:text-6xl font-bold">
                  Search
                </h1>
                <div className="join">
                  <div>
                    <div>
                      <input className="input input-bordered bg-white w-[650px] h-16 rounded-2xl text-gray-600 join-item" placeholder="Search..." value={input}
                        onChange={onChangeInput} />
                    </div>
                  </div>
                  {/* <select className="select bg-white text-gray-900 h-16 select-bordered join-item dropdown-content">
                    <option className="py-5">ALL</option>
                    <option className="py-5">BIKE PARKING</option>
                    <option className="py-5">PARKING</option>
                    <option className="py-5">FACULTIES</option>
                    <option className="py-5">ROOMS</option>
                    <option className="py-5">FACILITIES</option>
                  </select> */}
                  <div className="indicator">
                    <button onClick={handleSearch} className="btn h-16 w-20 bg-white hover:bg-gray-300 rounded-2xl text-gray-700 join-item"><Icon icon="wpf:search" className="w-7 h-7" /></button>
                  </div>
                </div>
                
                <div className="hidden">
                    <ul className="menu bg-white mt-5 w-5/12 mx-auto justify-center lg:menu-horizontal rounded-box">
                 <div>
                  <h2 className="text-gray-900">No Results Found</h2>
                 </div>

                </ul>
                </div>
                <div className="grid grid-cols-1">
                <div className="mt-5 space-x-2">
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">Faculties</div>
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">Facilities</div>
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">Gymnasium</div>
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">Departments</div>
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">SPARD</div>
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">Parking</div>
                <div className="badge badge-lg bg-gray-200  text-gray-900 ">Admin</div>
                
                </div>
              
                </div>
                
                <div className="xl:block inset-x-0 mx-auto w-5/12 fixed bottom-44 justify-center items-center bg-gray-100 hidden p-5 rounded-2xl mt-36">
                  <div className="">
                    <Keyboard name={'Keyboard'}
                      keyboardRef={(r: Keyboard | null) => (keyboardRef.current = r)}
                      layoutName={layoutName}
                      theme={"hg-theme-default hg-layout-default myTheme"}
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
                      buttonTheme={[
                        {
                          class: "hg-red",
                          buttons: ""
                        },
                        {
                          class: "hg-highlight",
                          buttons: "Q q C c U u"
                        }
                      ]}

                    />
                  </div>
                </div>
              </div>

              {/* <div class="flex justify-center items-center sm:h-screen -mt-10">
                <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                  <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 grid-rows-3 gap-3 sm:gap-6">

                    <a class="group flex flex-col row-span-3  bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Events
                            </h3>
                            <p class="text-lg text-gray-500">
                              All upcoming events in the main campus
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a class="group flex flex-col col-span-2  bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Faculties
                            </h3>
                            <p class="text-lg text-gray-500">
                              69 Faculties in total
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Bike parking
                            </h3>
                            <p class="text-lg text-gray-500">
                              bike friendly campus
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a class="group flex flex-col row-span-2 bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Facilities
                            </h3>
                            <p class="text-lg text-gray-500">
                              11 in Total 
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Comfort Rooms
                            </h3>
                            <p class="text-lg text-gray-500">
                              37 in total 
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a class="group flex flex-col col-span-2 bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Courses 
                            </h3>
                            <p class="text-lg text-gray-500">
                              8 courses in total
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a class="group flex flex-col col-span-1  bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                      <div class="p-4 md:p-5">
                        <div class="flex justify-between items-center">
                          <div>
                            <h3 class="group-hover:text-blue-600 font-semibold text-3xl text-gray-800 dark:group-hover:text-gray-400 ">
                              Sports
                            </h3>
                            <p class="text-lg text-gray-500">
                              10 sports
                            </p>
                          </div>
                          <div class="ps-3">
                            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                          </div>
                        </div>
                      </div>
                    </a>

                  

                  </div>

                </div>
              </div> */}
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
