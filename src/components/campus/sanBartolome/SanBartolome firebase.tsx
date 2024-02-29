import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import SelectToZoom from "./SelectToZoom";
import RotatingMesh from "./RotatingMesh";
import Clouds from "./Clouds";
import openGrounds from '../../assets/models/others/sb_final2.glb';
import techvoc from '../../assets/models/sb_buildings/og_techvoc2.glb';
import multipurpose from '../../assets/models/sb_buildings/og_multipurpose2.glb';
import chineseB from '../../assets/models/sb_buildings/og_chineseb2.glb';
import ched from '../../assets/models/sb_buildings/og_metalcasting2.glb';
import simon from '../../assets/models/sb_buildings/og_yellow2.glb';
import admin from '../../assets/models/sb_buildings/og_admin2.glb';
import bautista from '../../assets/models/sb_buildings/og_bautista2.glb';
import belmonte from '../../assets/models/sb_buildings/og_belmonte2.glb';
import academic from '../../assets/models/sb_buildings/og_academic2.glb';
import ballroom from '../../assets/models/sb_buildings/og_ballroom2.glb';
import landscape from '../../assets/models/others/landscape.glb';
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import firebaseConfig, { db } from "../../utils/firebase";
import { initializeApp } from "firebase/app";
interface ContainerProps {
  name: string;
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  const [isNight, setIsNight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [buildingData, setBuildingData] = useState<any>(null); // State to store building data
  const firestore = getFirestore(initializeApp(firebaseConfig));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingsCollection = collection(firestore, "Buildings");
        const buildingsSnapshot = await getDocs(buildingsCollection);

        const buildingData = buildingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Store the fetched data in the state
        setBuildingData(buildingData);
      } catch (error) {
        console.error("Error fetching data from Firebase Firestore:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount


  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      const isNightTime = currentHour >= 18 || currentHour < 6;

      setIsNight(isNightTime);
    };

    checkTime();

    const intervalId = setInterval(checkTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModelClick = async (modelName: string) => {
    setSelectedBuilding(modelName);
    setShowModal(true);
    console.warn(`Clicked on ${modelName}`.toUpperCase());

    // Fetch the corresponding document data from Firestore
    try {
      const buildingsCollection = collection(firestore, "Buildings");
      const buildingQuery = query(buildingsCollection, where("buildingName", "==", modelName));
      const buildingDoc = await getDocs(buildingQuery);

      if (!buildingDoc.empty) {
        const data = buildingDoc.docs[0].data();
        console.log(`${modelName} DOCUMENTS FOUND.`.toUpperCase());
        setBuildingData({ ...data, id: buildingDoc.docs[0].id }); // Include document ID in the data
        console.log(`${modelName} data:`.toUpperCase(), { ...data, id: buildingDoc.docs[0].id });

        // console.log("Data before update:", { ...data, id: buildingDoc.docs[0].id });

        setBuildingData({ ...data, id: buildingDoc.docs[0].id }); // Include document ID in the data

        // Log data after updating state
        // console.log("Data after update:", { ...data, id: buildingDoc.docs[0].id });
        console.warn("FETCHING DOCUMENT COMPLETED SUCCESSFULLY! ");
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

  return (
    <>
      <Canvas
        camera={{ fov: 25, position: [10, 4, 10] }}
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
          maxDistance={120}
        />
        <Clouds />
        <Stage environment={isNight ? "night" : "city"}>
          {isNight ? (
            <>
              <directionalLight castShadow intensity={2} position={[0, 0, 0]} />
              <Stars radius={20} depth={50} count={50} factor={3} />
            </>
          ) : null}
          {/* SB FLOORING */}
          <ModelViewer
            modelPath={openGrounds}
            position={[0, 0, 0]}
          />
          <ModelViewer
            modelPath={landscape}
            position={[0, -14, 25]}
          />
          {/* BUILDINGS */}
          <Bounds fit clip observe margin={2}>
            <SelectToZoom>
              {/* TECHVOC */}
              <ModelViewer
                modelPath={techvoc}
                position={[-1, 1, 15]}
                scale={[2.2, 2.2, 2.2]}
                name="Techvoc"
                textPosition={[-1, 3, 15]}
                onClick={() => handleModelClick("Techvoc Building")}
              />

              {/* MULTIPURPOSE */}
              <ModelViewer
                modelPath={multipurpose}
                position={[11.9, 1, 16]}
                name="Multipurpose"
                textPosition={[11.9, 3, 16]}
                onClick={() => handleModelClick("Multipurpose Building")}
              />

              {/* CHINESE B */}
              <ModelViewer
                modelPath={chineseB}
                position={[11.9, 0.65, 10]}
                scale={[1.5, 1.5, 1.5]}
                name="Chinese B"
                textPosition={[11.9, 2.5, 10]}
                onClick={() => handleModelClick("ChineseB Building")}
              />

              {/* BALLROOM */}
              <ModelViewer
                modelPath={ballroom}
                position={[-17.5, 0.1, 11]}
                scale={[1.5, 1.5, 1.5]}
                name="Ballroom"
                textPosition={[-17.5, 1.5, 11]}
                onClick={() => handleModelClick("Ballroom Building")}
              />

              {/* CHED */}
              <ModelViewer
                modelPath={ched}
                position={[-18.5, 0.1, 4]}
                scale={[1.5, 1.5, 1.5]}
                name="CHED"
                textPosition={[-18.5, 2, 4]}
                onClick={() => handleModelClick("Ched Building")}
              />

              {/* YELLOW */}
              <ModelViewer
                modelPath={simon}
                position={[3.1, 1.1, 0]}
                name="Yellow Building"
                textPosition={[3.1, 4.5, 0]}
                onClick={() => handleModelClick("Simon Building")}
              />

              {/* BELMONTE */}
              <ModelViewer
                modelPath={belmonte}
                position={[10, 2, -11]}
                scale={[2, 2, 2]}
                name="Belmonte Building"
                textPosition={[10, 5.5, -11]}
                onClick={() => handleModelClick("Belmonte Building")}
              />

              {/* ACADEMIC */}
              <ModelViewer
                modelPath={academic}
                position={[9, 2, -25]}
                scale={[2, 2, 2]}
                name="Academic Building"
                textPosition={[9, 7, -25]}
                onClick={() => handleModelClick("Academic Building")}
              />

              {/* ADMIN */}
              <ModelViewer
                modelPath={admin}
                position={[-6, 2.1, -11.3]}
                name="Admin Building"
                textPosition={[-6, 6.5, -11.3]}
                onClick={() => handleModelClick("Admin Building")}
              />

              {/* BAUTISTA */}
              <ModelViewer
                modelPath={bautista}
                position={[-7, 2, -27]}
                scale={[2.5, 2.5, 2.5]}
                name="Bautista Building"
                textPosition={[-7, 7, -27]}
                onClick={() => handleModelClick("Bautista Building")}
              />
            </SelectToZoom>
          </Bounds>
          <RotatingMesh />
        </Stage>
      </Canvas>

      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60 text-base-content"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Building Information"
      >
        {buildingData && buildingData.id ? ( // Check if buildingData and buildingData.id are not null
          <div className="w-full p-6 m-40 shadow-xl bg-base-100 rounded-3xl h-fit">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-center">{selectedBuilding}</h2>
              <button onClick={closeModal} className="btn btn-square hover:bg-red-500 hover:text-white">
                <Icon icon="line-md:close-small" className="w-10 h-10" />
              </button>
            </div>

            {Array.isArray(buildingData.floors) && buildingData.floors.length > 0 ? (
              <div>
                <p className="p-2 text-2xl font-semibold">Floors</p>
                <div className="grid grid-cols-2 gap-2">
                  {buildingData.floors.map((floor: string, index: number) => (
                    <button key={index} className="w-full h-10 bg-base-100 btn">
                      {floor}
                    </button>
                  ))}
                </div>
                {/* Additional building information can be displayed here */}
                {/* For example, you can display room information */}
                <div>
                  <p className="p-2 text-2xl font-semibold">Rooms</p>
                  <div className="w-64 p-6 space-y-2 overflow-y-auto h-96">
                    {Array.isArray(buildingData.rooms) && buildingData.rooms.length > 0 ? (
                      buildingData.rooms.map((room: string, index: number) => (
                        <button key={index} className="w-full bg-base-100 btn">
                          {room}
                        </button>
                      ))
                    ) : (
                      <p>No room data available.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p>No data available for this building.</p>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <div className="p-1 mx-auto mr-3 shadow-xl w-96 bg-base-100 rounded-xl h-fit">
              <div className="flex justify-center pt-2 text-2xl">
                <p className="font-semibold"> Loading building data</p>
                <Icon icon="eos-icons:three-dots-loading" className="w-10 h-10" />

              </div>

            </div> <button onClick={closeModal} className=" btn btn-square hover:bg-red-500 hover:text-white">
              <Icon icon="line-md:close-small" className="w-10 h-10" />
            </button>
          </div>
        )}
      </Modal>






    </>
  );
};

export default SanBartolome;