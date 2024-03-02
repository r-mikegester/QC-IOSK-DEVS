import React, {
  useState,
  ChangeEvent,
  useRef,
  Suspense,
  useEffect,
} from "react";
import { IonContent, IonPage } from "@ionic/react";
import "react-simple-keyboard/build/css/index.css";
import Backbtn from "../components/navigation/Backbtn";
import Dock from "../components/navigation/dock";
import "../assets/css/search.css";
import "../assets/css/keyboard.css";
import KeyboardWrapper from "./keyboard/Keyboard";
import { roomData } from "../data/roomData";
import Animation from "../components/campus/sanBartolome/animation/Animation";
import SideBar from "../components/sidebar/sidebarLayout";
import WidgetPanel from "../components/widgets/widgetPanel";
import Loading from "../components/loading";

export interface KeyboardRef {
  setInput: (input: string) => void;
  // Add other methods if needed
}

interface BuildingsData {
  name: string;
  floors: number;
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

  useEffect(() => {
    // Find matching room names whenever input changes
    const matchingRooms = Object.values(roomData).flatMap((building) =>
      Object.values(building).flatMap((rooms) =>
        rooms.filter((room) =>
          room.name.toLowerCase().includes(input.toLowerCase())
        )
      )
    );

    setSuggestions(matchingRooms);
  }, [input]);

  // Define building data
  const buildingsData: BuildingsData[] = [
    { name: "Belmonte Building", floors: 4 },
    { name: "Bautista Building", floors: 9 },
    { name: "Techvoc Building", floors: 2 },
    { name: "Ched Building", floors: 2 },
    { name: "Simon Building", floors: 2 },
    { name: "Admin Building", floors: 5 },
    { name: "Academic Building", floors: 7 },
    { name: "Ballroom Building", floors: 1 },
    { name: "Admin Building", floors: 1 },
    { name: "Multipurpose Building", floors: 1 },
    { name: "ChineseB Building", floors: 1 },
    // Add more buildings as needed
  ];

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setInput(input);
    keyboard.current?.setInput(input);

    // Find matching room names
    const matchingRooms = Object.values(roomData).flatMap((building) =>
      Object.values(building).flatMap((rooms) =>
        rooms.filter((room) =>
          room.name.toLowerCase().includes(input.toLowerCase())
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

  const handleRoomButtonClick = (roomName: string) => {
    // Find the matching room
    let selectedRoomModelPath = "";
    let selectedRoomVoice = "";
    let buildingName = "";
    let floorNumber = "";
    Object.entries(roomData).forEach(([building, floors]) => {
      Object.entries(floors).forEach(([floor, rooms]) => {
        rooms.forEach((room) => {
          if (room.name === roomName) {
            selectedRoomModelPath = room.modelPath;
            selectedRoomVoice = room.voice;
            buildingName = room.buildingName;
            floorNumber = floor; // Assuming the floor number is a single-digit string
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
              <Suspense fallback={<Loading name={""} />}>
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
                  className="btn btn-secondary absolute z-10 ml-60 mt-10"
                >
                  Back
                </button>
              </Suspense>
            </>
          ) : (
            <>
              <div className="overflow-hidden ">
                <div className="relative overflow-hidden ">
                  <div className="max-w-full px-4 py-10 mx-auto sm:px-6 lg:px-8 sm:py-5">
                    <div className="text-center mt-[10px]">
                      <h1 className="text-4xl font-bold text-white sm:text-6xl">
                        Search
                      </h1>
                      <br />

                      <div>
                        <input
                          value={input}
                          placeholder={"Tap on the virtual keyboard to start"}
                          onChange={(e) => onChangeInput(e)}
                          onClick={handleSearchBarClick}
                          onBlur={handleSearchBarBlur}
                          className="text-black bg-white"
                        />
                        <br />
                        <br />
                        {input && (
                          <div className="bg-white w-full">
                            {suggestions.length > 0 ? (
                              <div className="w-full py-6 h-56 overflow-auto">
                                <h1 className="text-black">Result:</h1>
                                <ul className="flex gap-4 flex-wrap p-6 justify-center">
                                  {suggestions.map((room, index) => (
                                    <li key={index}>
                                      <button
                                        className="btn btn-secondary w-24"
                                        onClick={() =>
                                          handleRoomButtonClick(room.name)
                                        }
                                      >
                                        {room.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="w-full py-6 h-56 overflow-auto">
                                <h1 className="text-black">No rooms found.</h1>
                                <h1 className="text-black">
                                  Enter another entry.
                                </h1>
                              </div>
                            )}
                          </div>
                        )}

                        <br />
                        <br />
                        <KeyboardWrapper
                          keyboardRef={keyboard}
                          onChange={setInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Backbtn name={"Back"} />
            </>
          )}

          <div className="absolute top-0 left-0 z-50 ">
            <SideBar />
          </div>
          <div className="absolute top-0 right-0 z-50 ">
            <WidgetPanel name={""} />
          </div>

          <Dock name={"Dock"} />
        </>
      </IonContent>
    </IonPage>
  );
};

export default SearchTab;
