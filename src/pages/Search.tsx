import React, { useState, ChangeEvent, useRef, Suspense } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "react-simple-keyboard/build/css/index.css";
import Backbtn from "../components/navigation/Backbtn";
import "../assets/css/search.css";
import "../assets/css/keyboard.css";
import KeyboardWrapper from "./keyboard/Keyboard";
import { roomData } from "../data/roomData";
import Animation from "../components/campus/sanBartolome/animation/Animation";
import SideBar from "../components/sidebar/sidebarLayout";
import Loading from "../pages/loading";

export interface KeyboardRef {
  setInput: (input: string) => void;
  // Add other methods if needed
}

const SearchTab: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedModelPath, setSelectedModelPath] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const keyboard = useRef<KeyboardRef | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setInput(input);
    keyboard.current?.setInput(input);

    // Find matching room names
    const matchingRooms = Object.values(roomData).flatMap((building) =>
      Object.values(building).flatMap((rooms) =>
        rooms.filter(
          (room) =>
            room.name.toLowerCase().includes(input) ||
            room.buildingName.toLowerCase().includes(input) ||
            (room.officeName && room.officeName.toLowerCase().includes(input))
        )
      )
    );

    setSuggestions(matchingRooms);
  };

  const handleSearchBarClick = () => {
    setIsClicked(true);
  };

  const handleSearchBarBlur = () => {
    setIsClicked(false);
  };

  const handleRoomButtonClick = (
    roomName: string,
    buildingName: string,
    floorNumber: string,
    officeName: string
  ) => {
    // Find the matching room
    let selectedRoomModelPath = "";
    let selectedRoomVoice = "";
    let building = "";
    let floor = "";
    let office = null;
    Object.entries(roomData).forEach(([building, floors]) => {
      Object.entries(floors).forEach(([floor, rooms]) => {
        rooms.forEach((room) => {
          if (room.name === roomName) {
            selectedRoomModelPath = room.modelPath;
            selectedRoomVoice = room.voice;
            building = room.buildingName;
            floor = floor; // Assuming the floor number is a single-digit string
            office = room.officeName;
          }
        });
      });
    });

    if (selectedRoomModelPath) {
      console.log("Selected room:", roomName);
      console.log("Model path:", selectedRoomModelPath);
      setSelectedModelPath(selectedRoomModelPath); // Update selected model path state
      setSelectedVoice(selectedRoomVoice);
      setSelectedBuilding(buildingName);
      setSelectedFloor(floorNumber);
      setSelectedOffice(officeName);
      setSelectedRoom(roomName);
      setIsAnimationActive(true);
    } else {
      console.log("Model path not found for the selected room.");
    }
  };

  const clickSearch = () => {
    setIsAnimationActive(false);

    return;
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <>
          {selectedModelPath && isAnimationActive ? (
            <>
              <Suspense fallback={<Loading />}>
                <Animation
                  name={""}
                  roomName={"selectedRoom"}
                  modelPath={selectedModelPath}
                  voice={selectedVoice}
                  shortPath={"selectedShortPath"}
                  roomData={roomData}
                  selectedBuilding={selectedBuilding}
                  selectedFloor={selectedFloor}
                  selectedRoom={selectedRoom}
                />
                <button
                  onClick={clickSearch}
                  className="absolute z-10 mt-10 btn btn-secondary ml-60"
                >
                  Back
                </button>
              </Suspense>
            </>
          ) : (
            <>
              <div className="h-screen overflow-hidden">
                <div className="relative overflow-hidden ">
                  <div className="max-h-screen px-4 mx-auto max-w-screen sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center w-screen h-screen text-center mt-72">
                      <h1 className="w-screen text-4xl font-bold text-center text-white sm:text-6xl">
                        Search
                      </h1>
                      

                      <div className="z-50 flex-col items-center justify-center w-screen h-screen ">
                        <div className="flex items-start justify-center w-screen space-x-3 ">
                          <div className="flex flex-col w-5/12 space-y-3 ">
                          <div className="w-full">
                            <input
                              value={input}
                              placeholder={
                                "Tap on the virtual keyboard to start"
                              }
                              onChange={(e) => onChangeInput(e)}
                              onClick={handleSearchBarClick}
                              onBlur={handleSearchBarBlur}
                              className="z-50 w-full h-16 p-5 text-black bg-white outline-none rounded-3xl"
                            />
                          </div>  
                          
                        <div className="w-full">
                          <div className="w-auto h-auto ">
                            <KeyboardWrapper
                              keyboardRef={keyboard}
                              onChange={setInput}
                            />
                          </div>
                        </div>
                          </div>
                          {input && (
                          <div className="w-96">
                            <div className="h-auto p-3 bg-white w-96 rounded-3xl">
                              {suggestions.length > 0 ? (
                                <div className="w-full py-6 overflow-auto h-96">
                                  <h1 className="text-black">Result:</h1>
                                  <ul className="px-1 space-y-1">
                                    {suggestions.map((room, index) => (
                                      <li key={index} className="space-">
                                        <button
                                          className=" btn btn-block btn-secondary"
                                          onClick={() =>
                                            handleRoomButtonClick(
                                              room.name,
                                              room.buildingName,
                                              room.floorNumber,
                                              room.officeName
                                            )
                                          }
                                        >
                                          {room.name} - {room.buildingName} -{" "}
                                          {""}
                                          {room.floorNumber} Floor
                                          {room.officeName && (
                                            <> - Office: {room.officeName}</>
                                          )}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <div className="w-full py-6 overflow-auto h-96">
                                  <h1 className="text-black">
                                    No rooms found.
                                  </h1>
                                  <h1 className="text-black">
                                    Enter another entry.
                                  </h1>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Backbtn name={"Back"} /> */}
            </>
          )}

          <div className="absolute top-0 left-0 z-50 ">
            <SideBar />
          </div>
         
        </>
      </IonContent>
    </IonPage>
  );
};

export default SearchTab;
