import React, { Suspense, useEffect, useState, useTransition } from "react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import SelectToZoom from "./SelectToZoom";
import RotatingMesh from "./RotatingMesh";
import Clouds from "./Clouds";
import openGrounds from "../../../assets/models/others/sb_floor_final.glb";
import techvoc from "../../../assets/models/sb_buildings/techvoc_final.glb";
import multipurpose from "../../../assets/models/sb_buildings/multipurpose_final.glb";
import chineseB from "../../../assets/models/sb_buildings/chineseb_final.glb";
import ched from "../../../assets/models/sb_buildings/ched_final.glb";
import simon from "../../../assets/models/sb_buildings/yellow_final.glb";
import admin from "../../../assets/models/sb_buildings/admin_final.glb";
import bautista from "../../../assets/models/sb_buildings/bautista_final.glb";
import belmonte from "../../../assets/models/sb_buildings/belmonte_final.glb";
import academic from "../../../assets/models/sb_buildings/academic_final.glb";
import ballroom from "../../../assets/models/sb_buildings/ballroom_final.glb";
import urbanFarming from "../../../assets/models/sb_buildings/urbanfarming_final.glb";
import korPhil from "../../../assets/models/sb_buildings/korPhil_final.glb";
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
import { useHistory } from "react-router";
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
  };

  const clickFloor = (floor: string) => {
    setSelectedFloor(floor);
    setSelectedRoom("");
  };

  const selectRoom = (room: string) => {
    setSelectedRoom(room);
  };

  const clickAnimation = (room: string) => {
    const selectedRoomData = roomData[selectedBuilding][selectedFloor]?.find(
      (r) => r.name === room
    );
    console.log(room);
    console.log(selectedRoomData?.modelPath);
    console.log(selectedRoomData?.voice);
    if (selectedRoomData) {
      setAnimation(room);
      if (selectedRoomData.modelPath) {
        setSelectedRoomModel(selectedRoomData.modelPath);
        setSelectedVoice(selectedRoomData.voice);
        // setSelectedShortPath(selectedRoomData.shortPath);
        setIsAnimationActive(true);
      } else {
        setSelectedRoomModel("");
        alert("Model path is empty for this room.");
      }
    } else {
      setSelectedRoomModel("");
      alert("Selected room data not found.");
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

  const clickSB = () => {
    setIsAnimationActive(false);
    setShowModal(false);
    return;
  };
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
          <button
            onClick={clickSB}
            className="absolute z-10 mt-10 btn btn-secondary ml-60"
          >
            Back
          </button>
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
              {/* <Clouds /> */}
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
            <div className="w-full p-6 m-40 shadow-xl bg-base-200 rounded-3xl h-fit">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-center">
                  {selectedBuilding}
                </h2>
                <button
                  onClick={closeModal}
                  className="btn btn-square hover:bg-red-500 hover:text-white"
                >
                  <Icon icon="line-md:close-small" className="w-10 h-10" />
                </button>
              </div>
              <div className="flex justify-center mt-6 space-x-3">
                <div className="px-6 shadow-inner bg-base-300 w-96 rounded-3xl">
                  <div className="flex justify-center py-6 border-b-2 border-base-100">
                    <button className="h-10 btn bg-base-100 btn-block hover:bg-base-200">
                      Overview
                    </button>
                  </div>
                  <div className="h-full overflow-y-auto ">
                    <p className="p-2 text-2xl font-semibold">Floors</p>
                    <div className="grid grid-cols-2 gap-2 ">
                      {selectedBuilding &&
                        [
                          ...Array(
                            buildingsData.find(
                              (building: { name: string }) =>
                                building.name === selectedBuilding
                            )?.floors || 0
                          ),
                        ].map((_, index: number) => (
                          <button
                            key={index}
                            className={`w-full h-10 bg-base-100 btn ${
                              selectedFloor === `${index + 1}`
                                ? "bg-base-content text-base-100"
                                : ""
                            }`}
                            onClick={() => clickFloor(`${index + 1}`)}
                          >
                            {index + 1}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full h-full shadow-inner bg-base-300 rounded-2xl">
                  <div className="flex items-center p-6 pl-0">
                    <div className="w-64 p-6 space-y-2 overflow-y-auto h-96">
                      {selectedBuilding &&
                        selectedFloor &&
                        roomData[selectedBuilding][selectedFloor]?.map(
                          (room, roomIndex) => (
                            <div key={roomIndex} className="flex flex-col">
                              <button
                                className="btn"
                                onClick={() => selectRoom(room.name)}
                              >
                                {room.name}
                              </button>
                            </div>
                          )
                        )}
                    </div>
                    <div className="w-full p-6 shadow-inner bg-base-200 h-96 rounded-2xl">
                      <div className="flex flex-col w-full h-full space-y-3">
                        <div className="collapse collapse-arrow bg-base-100">
                          <input
                            type="radio"
                            name="my-accordion-2"
                            defaultChecked
                          />
                          <div className="text-xl font-medium collapse-title">
                            Details
                          </div>
                          <div className="collapse-content">
                            {selectedBuilding &&
                              selectedFloor &&
                              roomData[selectedBuilding][selectedFloor]
                                ?.filter((room) => room.name === selectedRoom)
                                .map((room, roomIndex) => (
                                  <div key={roomIndex}>
                                    <ul>
                                      {room.details.map(
                                        (detail, detailIndex) => (
                                          <li key={detailIndex}>{detail}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                ))}
                          </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-100">
                          <input type="radio" name="my-accordion-2" />
                          <div className="text-xl font-medium collapse-title">
                            Text Navigation
                          </div>
                          <div className="collapse-content">
                            {selectedBuilding &&
                              selectedFloor &&
                              roomData[selectedBuilding][selectedFloor]
                                ?.filter((room) => room.name === selectedRoom)
                                .map((room, roomIndex) => (
                                  <div key={roomIndex}>
                                    <ul>
                                      {room.textGuide.map(
                                        (guide, guideIndex) => (
                                          <li key={guideIndex}>{guide}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                ))}
                          </div>
                        </div>
                        <button
                          className="btn btn-secondary"
                          onClick={() => clickAnimation(selectedRoom)}
                        >
                          GO TO {selectedRoom}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default SanBartolome;
