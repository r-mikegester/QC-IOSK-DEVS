import React, { Suspense, useEffect, useState, useTransition } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import SelectToZoom from "./SelectToZoom";
import RotatingMesh from "./RotatingMesh";
import Clouds from "./Clouds";
import openGrounds from "../../../assets/models/others/sb_floor_cfinal.glb";
import techvoc from "../../../assets/models/draco/cTechVoc.glb";
import multipurpose from "../../../assets/models/draco/cMultiPurpose.glb";
import chineseB from "../../../assets/models/draco/cChineseB.glb";
import ched from "../../../assets/models/draco/cChed.glb";
import simon from "../../../assets/models/draco/cYellow.glb";
import admin from "../../../assets/models/draco/cAdmin.glb";
import bautista from "../../../assets/models/draco/cBautista.glb";
import belmonte from "../../../assets/models/draco/cBelmonte.glb";
import academic from "../../../assets/models/draco/cAcademic.glb";
import ballroom from "../../../assets/models/draco/cBallroom.glb";
import urbanFarming from "../../../assets/models/draco/cUrbanFarming.glb";
import korPhil from "../../../assets/models/draco/cKOREAPHIL.glb";
import landscape from "../../../assets/models/others/landscape.glb";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig, { db } from "../../utils/firebase";
import { initializeApp } from "firebase/app";
import Animation from "./animation/Animation";
import IB101 from "../../../assets/animation/yellow/101a.glb";
import IB102 from "../../../assets/animation/yellow/102.glb";
import IB103 from "../../../assets/animation/yellow/103a.glb";
import IB101Voice from "../../../assets/audio/voice101a.mp3";
import { roomData } from "../../../data/roomData";
import IL401a from "../../../assets/animation/academic/Academic-IL401a.glb";


interface ContainerProps {
  name: string;
}
interface RoomData {
  [key: number]: string[]; // Key is a number, value is an array of strings
}
interface BuildingsData {
  name: string;
  floors: number;
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {

  // Create DRACO loader instance with the decoder path
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  dracoLoader.setDecoderConfig({ type: 'js' }); // Specify the type of decoder (js or wasm)

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader); // Pass the DRACOLoader instance

  const [isNight, setIsNight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [buildingData, setBuildingData] = useState<any>(null); // State to store building data
  const firestore = getFirestore(initializeApp(firebaseConfig));
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [animation, setAnimation] = useState("");
  const [selectedRoomModel, setSelectedRoomModel] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedShortPath, setSelectedShortPath] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [showOverview, setShowOverview] = useState(false); // State to toggle overview
  const [modalContent, setModalContent] = useState("");
  const [showError, setErrorModal] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      const isNightTime = currentHour >= 18 || currentHour < 6;

      setIsNight(isNightTime);
    };

    checkTime();

    const intervalId = setInterval(checkTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModelClick = async (modelName: string) => {
    setSelectedBuilding(modelName);
    setShowModal(true);
    console.log(`Clicked on ${modelName}`);

    try {
      const buildingsCollection = collection(firestore, "Buildings");
      const buildingQuery = query(
        buildingsCollection,
        where("buildingName", "==", modelName)
      );
      const buildingDoc = await getDocs(buildingQuery);

      if (!buildingDoc.empty) {
        const data = buildingDoc.docs[0].data();
        console.log(`${modelName} Documents Found!!`);
        setBuildingData({ ...data, id: buildingDoc.docs[0].id }); // Include document ID in the data
      } else {
        console.warn("Document not found");
      }
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsAnimationActive(false);
    setErrorModal(false);
  };

  const clickFloor = (floor: string) => {
    setSelectedFloor(floor);
    setSelectedRoom("");
    setShowOverview(false); // Hide overview when floor is clicked
  };

  const selectRoom = (room: string) => {
    setSelectedRoom(room);
  };

  const clickAnimation = (room: string) => {
    const selectedRoomData = roomData[selectedBuilding][selectedFloor]?.find(
      (r) => r.name === room
    );

    if (selectedRoomData) {
      setAnimation(room);
      if (selectedRoomData.modelPath) {
        setSelectedRoomModel(selectedRoomData.modelPath);
        setSelectedVoice(selectedRoomData.voice);
        setIsAnimationActive(true);
      } else {
        // Show modal with appropriate message
        setModalContent("Model path is empty for this room.");
        setErrorModal(true);
      }
    } else {
      // Show modal with appropriate message
      setModalContent("Selected room data not found.");
      setErrorModal(true);
    }
  };

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


  const handleOverviewClick = () => {
    setShowOverview(true); // Toggle the showOverview state
  };
  const handleFloorsClick = () => {
    setShowOverview(false); // Toggle the showOverview state
  };

  const selectedBuildingData = buildingsData.find(building => building.name === selectedBuilding);


  return (
    <>
      {selectedRoomModel && animation && isAnimationActive ? (
        <>
          <Animation
            name={""}
            roomName={selectedRoom}
            modelPath={selectedRoomModel}
            voice={selectedVoice}
            shortPath={selectedShortPath}
            roomData={roomData}
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedRoom={selectedRoom}
          />

        </>
      ) : (
        <>
          <Canvas
            camera={{
              fov: 50,
              position: isAnimationActive ? [80, 40, 80] : [80, 40, 80], // Change camera position based on animation activity
            }}
            className={
              isNight
                ? "bg-gradient-to-tr from-stone-950 to-cyan-950"
                : "bg-gradient-to-tr from-sky-900 to-sky-400"
            }
            style={{ position: "absolute" }}
          >
            <OrbitControls
              minPolarAngle={Math.PI / 6} // vertical rotation
              maxPolarAngle={Math.PI / 2.5} // vertical rotation
              enablePan={true}
              zoomSpeed={1} // based sa touchpad
              autoRotate={true}
              autoRotateSpeed={0.3}
              enableZoom={true}
              minDistance={50}
              maxDistance={100}
            />

            <Stage shadows environment={isNight ? "night" : "city"}>
              {isNight ? (
                <>
                  {/* <directionalLight
                    intensity={1}
                    position={[30, 30, 30]}
                  /> */}
                  <Stars radius={50} depth={30} count={100} factor={3} />
                </>
              ) : null}
              <Clouds />
              {/* SB FLOORING */}
              <ModelViewer modelPath={openGrounds} position={[0, 0, 0]} />
              <ModelViewer modelPath={landscape} position={[-20, -16, 40]} />
              {/* <ModelViewer modelPath={IL401a} position={[3.4, -2, 28.5]} /> */}

              {/* TECHVOC */}
              <ModelViewer
                modelPath={techvoc}
                position={[-3.5, -0.95, 34]}
                scale={[2.2, 2, 2]}
                name="Techvoc"
                textPosition={[-3.5, 2, 34]}
                onClick={() => handleModelClick("Techvoc Building")}
              />
              {/* MULTIPURPOSE */}
              <ModelViewer
                modelPath={multipurpose}
                position={[10.5, -0.25, 34]}
                name="Multipurpose"
                textPosition={[10.5, 2, 34]}
                onClick={() => handleModelClick("Multipurpose Building")}
              />
              {/* CHINESE B */}
              <ModelViewer
                modelPath={chineseB}
                position={[10.5, -0.64, 28]}
                scale={[1.7, 1.7, 1.7]}
                name="Chinese B"
                textPosition={[10.5, 1, 28]}
                onClick={() => handleModelClick("ChineseB Building")}
              />

              {/* YELLOW */}
              <ModelViewer
                modelPath={simon}
                position={[0.3, -0.5, 16.5]}
                name="Simon Building"
                textPosition={[0.3, 3, 16.5]}
                onClick={() => handleModelClick("Simon Building")}
              />

              {/* BALLROOM */}
              <ModelViewer
                modelPath={ballroom}
                position={[-20.5, -1.4, 30.5]}
                scale={[1.7, 1.7, 1.7]}
                name="Ballroom"
                textPosition={[-20.5, 0.5, 30.5]}
                onClick={() => handleModelClick("Ballroom Building")}
              />

              {/* CHED */}
              <ModelViewer
                modelPath={ched}
                position={[-21, -0.5, 21.6]}
                scale={[1, 1, 1]}
                name="CHED"
                textPosition={[-21, 1.5, 21.6]}
                onClick={() => handleModelClick("Ched Building")}
              />

              {/* BELMONTE */}
              <ModelViewer
                modelPath={belmonte}
                position={[7, 1, 5.8]}
                scale={[2, 2, 2]}
                name="Belmonte Building"
                textPosition={[7, 4.5, 5.8]}
                onClick={() => handleModelClick("Belmonte Building")}
              />

              {/* ACADEMIC */}
              <ModelViewer
                modelPath={academic}
                position={[6.5, 1.6, -8]}
                scale={[2.2, 2.2, 2.2]}
                name="Academic Building"
                textPosition={[6.5, 5.5, -8]}
                onClick={() => handleModelClick("Academic Building")}
              />

              {/* ADMIN */}
              <ModelViewer
                modelPath={admin}
                position={[-8.7, 0.2, 6.5]}
                scale={[1.1, 1.1, 1.1]}
                name="Admin Building"
                textPosition={[-8.7, 4.5, 6.5]}
                onClick={() => handleModelClick("Admin Building")}
              />

              {/* BAUTISTA */}
              <ModelViewer
                modelPath={bautista}
                position={[-9.45, -2.8, -8.55]}
                scale={[2.4, 2.4, 2.4]}
                name="Bautista Building"
                textPosition={[-9.45, 6, -8.55]}
                onClick={() => handleModelClick("Bautista Building")}
              />

              {/* URBAN FARMING */}
              <ModelViewer
                modelPath={urbanFarming}
                position={[-1, -2.9, -25]}
                scale={[4, 4, 4]}
                name="Urban Farming"
                textPosition={[-1, 0, -25]}
                onClick={() => handleModelClick("Urban Farming")}
              />

              {/* KORPHIL */}
              <ModelViewer
                modelPath={korPhil}
                position={[-33, -5.5, -5]}
                scale={[1, 1, 1]}
                name="KorPhil Building"
                textPosition={[-33, 1, -5]}
                onClick={() => handleModelClick("KorPhil Building")}
              />

              {/* <RotatingMesh /> */}
            </Stage>
          </Canvas>
          <Modal
            className="flex items-center justify-center w-screen h-screen bg-black/60 text-base-content"
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="Building Information"
          >
            <div className="w-5/12 py-0 pl-0 transition-all duration-150 ease-in-out shadow-xl m-80 bg-base-100 rounded-3xl h-fit">
              <div className="relative flex justify-center space-x-3">
                <div className="w-20 h-full px-3 mr-2 shadow-lg rounded-3xl">
                  <div className="flex flex-col justify-center py-3 space-y-3 border-b-2 border-base-100">

                    {/* Conditionally render the "Building Details" button if more than one floor */}
                    {selectedBuildingData && selectedBuildingData.floors > 1 && (
                      <>
                        <button
                          onClick={handleFloorsClick}
                          className={`h-10 btn  hover:bg-base-content hover:text-base-300 ${!showOverview ? "bg-transparent btn-block shadow-none text-lg text-base-content" : ""}`}
                        >
                          Floors
                        </button>
                      </>
                    )}
                  </div>
                  {showOverview ? (
                    <div className="h-full overflow-y-auto">
                      <p className="p-2 text-2xl font-semibold">Directories</p>
                      <p className="p-2 text-base">Gymnasium</p>
                      <p className="p-2 text-base">Rooms: </p>
                      <p className="p-2 text-base">Area: </p>
                    </div>
                  ) : (
                    <div>
                      {selectedBuildingData && selectedBuildingData.floors > 1 && !showOverview && (
                        <div className="h-full overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2 my-3">
                            {selectedBuilding &&
                              Array.from(
                                { length: selectedBuildingData.floors },
                                (_, index) => (
                                  <button
                                    key={index}
                                    className={`w-full h-10 bg-bsase-100 btn ${selectedFloor === `${index + 1}` ? "bg-base-content text-base-100" : "hover:bg-base-200"
                                      }`}
                                    onClick={() => clickFloor(`${index + 1}`)}
                                  >
                                    {index + 1}
                                  </button>
                                )
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="absolute w-20 h-full px-3 transition-all duration-150 ease-in-out shadow-inner -left-3 bg-base-300 rounded-3xl">
                  <div className="flex flex-col justify-center py-5 space-y-3 border-b-2 border-base-200">

                    {/* Conditionally render the "Building Details" button if more than one floor */}
                    {selectedBuildingData && selectedBuildingData.floors > 1 && (
                      <>
                        <button
                          onClick={showOverview ? handleFloorsClick : handleOverviewClick}
                          className={` btn h-16  w-full bg-transparent btn-square shadow-none ${!showOverview ? "bg-transparent btn-square shadow-none font-semibold text-base-content" : ""}`}
                        >
                          {showOverview ? (
                            // Render back icon here
                            <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                          ) : (
                            // Render floor icon here
                            <Icon icon="tabler:box-multiple" className={`w-10 h-10`} />
                          )}

                        </button></>
                    )}
                  </div>
                  {showOverview ? (
                    <div className="h-full overflow-y-auto">

                    </div>
                  ) : (
                    <div className="overflow-auto h-full">


                      {selectedBuildingData && selectedBuildingData.floors > 1 && !showOverview && (
                        <div className="h-full overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2 my-5">

                            {selectedBuilding &&
                              Array.from(
                                { length: selectedBuildingData.floors },
                                (_, index) => (
                                  <button
                                    key={index}
                                    className={`w-full h-10 bg-base-100 btn text-2xl ${selectedFloor === `${index + 1}` ? "bg-base-content text-base-100" : "hover:bg-base-200"
                                      }`}
                                    onClick={() => clickFloor(`${index + 1}`)}
                                  >
                                    {index + 1}
                                  </button>
                                )
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full space-y-3 transition-all duration-150 ease-in-out">
                  <div className="flex items-center justify-between w-full ">
                    <button
                      onClick={handleOverviewClick}
                      className={` rounded-xl text-3xl p-2 font-bold mx-2 mt-4 h-14 hover:bg-base-300 ${showOverview ? "hover:bg-transparent text-base-content w-full mt-4 h-14 mx-4" : ""}`}
                    >
                      {selectedBuilding}
                    </button>
                    <button
                      onClick={closeModal}
                      className="mt-5 mr-5 btn btn-square hover:bg-red-500 hover:text-white"
                    >
                      <Icon icon="line-md:close-small" className="w-10 h-10" />
                    </button>
                  </div>

                  <div className="flex items-start justify-center w-full h-full transition-all duration-150 ease-in-out ">
                    {!showOverview && (
                      <div className="flex flex-col justify-between h-auto bg-base-200 space-y- rounded-3xl">
                        <h1 className="text-2xl font-semibold text-center">Rooms</h1>
                        <div className="w-64 p-3 pb-4 space-y-2 overflow-y-auto h-96 overflow-cli bg-base-300 rounded-2xl">
                          {!selectedFloor && (
                            <div className="flex flex-col items-center justify-center w-full p-6 text-lg text-center text-base-content">
                              <Icon icon="typcn:warning-outline" className="w-10 h-10" />
                              <h1>Please select a desired floor from the sidebar on the left</h1>
                            </div>
                          )}
                          {selectedBuilding &&
                            selectedFloor &&
                            roomData[selectedBuilding][selectedFloor]?.map((room, roomIndex) => (
                              <div key={roomIndex} className="flex flex-col">
                                <button className="btn" onClick={() => selectRoom(room.name)}>
                                  {room.name}
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    {showOverview ? (
                      <div className="w-full h-full duration-150 ease-in-out bg-base-100 rounded-2xl">
                        <div className="flex items-center p-6 pt-0 pl-0">
                          <div className="w-full p-6 shadow-inner bg-base-200 h-96 rounded-2xl">
                            <div className="flex w-full h-full space-x-3 ">
                              <div className="flex items-center justify-center w-full h-5 rounded-2xl ">
                                <h1 className="text-3xl font-semibold text-base-content">Details</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-auto m-6 mt-0 shadow-inner bg-base-300 rounded-2xl">

                        <div className="flex flex-col items-center p-0">


                          <div className="w-full p-6 shadow-inner bg-base-200 h-[375px] rounded-2xl">
                            <div className="relative flex flex-col w-full h-full space-y-3">
                              <div className="text-base-content">

                                {selectedBuilding &&
                                  selectedFloor &&
                                  roomData[selectedBuilding][selectedFloor]
                                    ?.filter((room) => room.name === selectedRoom)
                                    .map((room, roomIndex) => (
                                      <div key={roomIndex}>
                                        <ul>
                                          <h1 className="mb-5 -mt-0 font-bold text-center">Details</h1>
                                          {room.details.map((detail, detailIndex) => (
                                            <li key={detailIndex}>{detail}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}

                              </div>

                            </div>
                          </div>
                          <div className="w-full p-3">
                            <button
                              className=" btn btn-secondary btn-block"
                              onClick={() => clickAnimation(selectedRoom)}
                            >
                              Get Direction {selectedRoom}
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            className="flex items-center justify-center w-screen h-screen transition-all duration-150 ease-in-out bg-black/60"
            isOpen={showError}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Alert"
          >
            <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
              <p className="text-3xl text-center">{modalContent}</p>
              <div className="flex justify-center space-x-3 mt-14">

                <button
                  onClick={closeModal}
                  className="btn bg-base-300"
                >
                  <Icon icon="line-md:close-small" className="w-10 h-10" /> Close
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}

    </>
  );
};

export default SanBartolome;
