import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import {
  Bounds,
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  Stage,
  Stars,
  useGLTF,
} from "@react-three/drei";
import SelectToZoom from "./SelectToZoom";
import RotatingMesh from "./RotatingMesh";
import Clouds from "./Clouds";
import openGrounds from "../../../assets/models/others/sb_final2.glb";
import techvoc from "../../../assets/models/sb_buildings/og_techvoc2.glb";
import multipurpose from "../../../assets/models/sb_buildings/og_multipurpose2.glb";
import chineseB from "../../../assets/models/sb_buildings/og_chineseb2.glb";
import ched from "../../../assets/models/sb_buildings/og_metalcasting2.glb";
import simon from "../../../assets/models/sb_buildings/og_yellow2.glb";
import admin from "../../../assets/models/sb_buildings/og_admin2.glb";
import bautista from "../../../assets/models/sb_buildings/og_bautista2.glb";
import belmonte from "../../../assets/models/sb_buildings/og_belmonte2.glb";
import academic from "../../../assets/models/sb_buildings/og_academic2.glb";
import ballroom from "../../../assets/models/sb_buildings/og_ballroom2.glb";
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
import firebaseConfig, { db } from "../../../utils/firebase";
import { initializeApp } from "firebase/app";
import { useHistory } from "react-router";
import Animation from "./animation/Animation";
import IB101 from "../../../assets/animation/yellow/101a.glb";
import IB102 from "../../../assets/animation/yellow/102.glb";
import IB103 from "../../../assets/animation/yellow/103a.glb";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { roomData } from "../../../data/roomData";

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

const AnimatedModelViewer = ({ modelPath, mixer }: any) => {
  const { scene, animations, cameras } = useGLTF(modelPath) as GLTF;

  useEffect(() => {
    if (animations) {
      animations.forEach((clip: THREE.AnimationClip) => {
        const action = mixer.clipAction(clip);
        action.play();
        console.log("Animation Name:", clip.name);
      });
    }
  }, [animations, cameras, mixer]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return (
    <>
      <primitive object={scene} position={[3, -2, 29]} />
    </>
  );
};

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

  const { scene, cameras } = useGLTF(IB101) as GLTF;
  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const history = useHistory();

  const handleCameraSwitch = () => {
    setActiveCameraIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  const gltfCamera =
    cameras && cameras.length > 0
      ? (cameras[activeCameraIndex] as THREE.PerspectiveCamera)
      : null;

  if (!mixerRef.current) {
    mixerRef.current = new THREE.AnimationMixer(scene);
  }

  const clickMap = () => {
    history.go(0);
  };

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

    // Fetch the corresponding document data from Firestore
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
    if (selectedRoomData) {
      setAnimation(room);
      if (selectedRoomData.modelPath) {
        setSelectedRoomModel(selectedRoomData.modelPath);
        setShowModal(false);
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

  const roomData: Record<
    string,
    Record<
      string,
      {
        name: string;
        modelPath: string;
        details: string[];
        textGuide: string[];
      }[]
    >
  > = {
    "Simon Building": {
      "1": [
        {
          name: "IB101a",
          modelPath: IB101,
          details: ["Room Info WEW", "Room Info WEW"],
          textGuide: ["Text Guide WEW: 1asdasdasdasdWEW", "Room Info 2 WEW"],
        },
      ],
      "2": [
        {
          name: "IB201f",
          modelPath: IB102,
          details: ["Room Info 1", "Room Info 2"],
          textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
        },
      ],
    },
  };

  return (
    <>
      <button
        onClick={handleCameraSwitch}
        className="btn btn-secondary absolute z-10 ml-20 mt-10"
      >
        Switch Camera
      </button>
      <button
        className="btn btn-secondary absolute z-10 ml-60 mt-10"
        onClick={clickMap}
      >
        Back
      </button>

      <Canvas
        camera={gltfCamera as THREE.PerspectiveCamera}
        className={"bg-gradient-to-tr from-sky-900 to-sky-400"}
        style={{ position: "absolute" }}
      >
        <ambientLight intensity={2} />
        {selectedRoomModel ? null : (
          <OrbitControls
            minPolarAngle={Math.PI / 6} // vertical rotation
            maxPolarAngle={Math.PI / 2.5} // vertical rotation
            enablePan={true}
            zoomSpeed={1} // based sa touchpad
            autoRotate={true}
            autoRotateSpeed={0.3}
            enableZoom={true}
            minDistance={40}
            maxDistance={90}
          />
        )}

        {/* <Clouds /> */}
        {selectedRoomModel && animation && (
          <AnimatedModelViewer
            modelPath={selectedRoomModel}
            mixer={mixerRef.current}
            activeCameraIndex={activeCameraIndex}
            cameras={cameras}
          />
        )}

        {/* SB FLOORING */}
        <ModelViewer modelPath={openGrounds} position={[0, 0, 0]} />
        {/* <ModelViewer modelPath={landscape} position={[0, -14, 25]} /> */}

        {/* BUILDINGS */}
        {/* TECHVOC */}
        <ModelViewer
          modelPath={techvoc}
          position={[-1, 1, 15]}
          scale={[2.2, 2.2, 2.2]}
          name={selectedRoomModel ? "" : "Techvoc"}
          textPosition={[-1, 3, 15]}
          onClick={() => handleModelClick("Techvoc Building")}
        />

        {/* MULTIPURPOSE */}
        <ModelViewer
          modelPath={multipurpose}
          position={[11.9, 1, 16]}
          name={selectedRoomModel ? "" : "Multipurpose"}
          textPosition={[11.9, 3, 16]}
          onClick={() => handleModelClick("Multipurpose Building")}
        />

        {/* CHINESE B */}
        <ModelViewer
          modelPath={chineseB}
          position={[11.9, 0.65, 10]}
          scale={[1.5, 1.5, 1.5]}
          name={selectedRoomModel ? "" : "Chinese B"}
          textPosition={[11.9, 2.5, 10]}
          onClick={() => handleModelClick("ChineseB Building")}
        />

        {/* BALLROOM */}
        <ModelViewer
          modelPath={ballroom}
          position={[-17.5, 0.1, 11]}
          scale={[1.5, 1.5, 1.5]}
          name={selectedRoomModel ? "" : "Ballroom"}
          textPosition={[-17.5, 1.5, 11]}
          onClick={() => handleModelClick("Ballroom Building")}
        />

        {/* CHED */}
        <ModelViewer
          modelPath={ched}
          position={[-18.5, 0.1, 4]}
          scale={[1.5, 1.5, 1.5]}
          name={selectedRoomModel ? "" : "CHED"}
          textPosition={[-18.5, 2, 4]}
          onClick={() => handleModelClick("Ched Building")}
        />

        {/* YELLOW */}
        <ModelViewer
          modelPath={simon}
          position={[3.1, 1.1, 0]}
          name={selectedRoomModel ? "" : "Simon Building"}
          textPosition={[3.1, 4.5, 0]}
          onClick={() => handleModelClick("Simon Building")}
        />

        {/* BELMONTE */}
        <ModelViewer
          modelPath={belmonte}
          position={[10, 2, -11]}
          scale={[2, 2, 2]}
          name={selectedRoomModel ? "" : "Belmonte Building"}
          textPosition={[10, 5.5, -11]}
          onClick={() => handleModelClick("Belmonte Building")}
        />

        {/* ACADEMIC */}
        <ModelViewer
          modelPath={academic}
          position={[9, 2, -25]}
          scale={[2, 2, 2]}
          name={selectedRoomModel ? "" : "Academic Building"}
          textPosition={[9, 7, -25]}
          onClick={() => handleModelClick("Academic Building")}
        />

        {/* ADMIN */}
        <ModelViewer
          modelPath={admin}
          position={[-6, 2.1, -11.3]}
          name={selectedRoomModel ? "" : "Admin Building"}
          textPosition={[-6, 6.5, -11.3]}
          onClick={() => handleModelClick("Admin Building")}
        />

        {/* BAUTISTA */}
        <ModelViewer
          modelPath={bautista}
          position={[-7, 2, -27]}
          scale={[2.5, 2.5, 2.5]}
          name={selectedRoomModel ? "" : "Bautista Building"}
          textPosition={[-7, 7, -27]}
          onClick={() => handleModelClick("Bautista Building")}
        />

        <RotatingMesh />
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
                                  {room.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>{detail}</li>
                                  ))}
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
                                  {room.textGuide.map((guide, guideIndex) => (
                                    <li key={guideIndex}>{guide}</li>
                                  ))}
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
  );
};

export default SanBartolome;
