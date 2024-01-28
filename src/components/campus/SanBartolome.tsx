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

interface ContainerProps {
  name: string;
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  const [isNight, setIsNight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");

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

  const handleModelClick = (modelName: string) => {
    setSelectedBuilding(modelName);
    setShowModal(true);
    console.log(`Clicked on ${modelName}`);
  };


  return (
    <>
      <Canvas
      camera={{ fov: 25,  position: [10, 4, 10]}}
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
              onClick={() => handleModelClick("Techvoc")}
            />

            {/* MULTIPURPOSE */}
            <ModelViewer
              modelPath={multipurpose}
              position={[11.9, 1, 16]}
              name="Multipurpose"
              textPosition={[11.9, 3, 16]}
              onClick={() => handleModelClick("Multipurpose")}
            />

            {/* CHINESE B */}
            <ModelViewer
              modelPath={chineseB}
              position={[11.9, 0.65, 10]}
              scale={[1.5, 1.5, 1.5]}
              name="Chinese B"
              textPosition={[11.9, 2.5, 10]}
              onClick={() => handleModelClick("ChineseB")}
            />

            {/* BALLROOM */}
            <ModelViewer
              modelPath={ballroom}
              position={[-17.5, 0.1, 11]}
              scale={[1.5, 1.5, 1.5]}
              name="Ballroom"
              textPosition={[-17.5, 1.5, 11]}
              onClick={() => handleModelClick("Ballroom")}
            />

            {/* CHED */}
            <ModelViewer
              modelPath={ched}
              position={[-18.5, 0.1, 4]}
              scale={[1.5, 1.5, 1.5]}
              name="CHED"
              textPosition={[-18.5, 2, 4]}
              onClick={() => handleModelClick("Ched")}
            />

            {/* YELLOW */}
            <ModelViewer
              modelPath={simon}
              position={[3.1, 1.1, 0]}
              name="Yellow Building"
              textPosition={[3.1, 4.5, 0]}
              onClick={() => handleModelClick("Simon")}
            />

            {/* BELMONTE */}
            <ModelViewer
              modelPath={belmonte}
              position={[10, 2, -11]}
              scale={[2, 2, 2]}
              name="Belmonte Building"
              textPosition={[10, 5.5, -11]}
              onClick={() => handleModelClick("Belmonte")}
            />

            {/* ACADEMIC */}
            <ModelViewer
              modelPath={academic}
              position={[9, 2, -25]}
              scale={[2, 2, 2]}
              name="Academic Building"
              textPosition={[9, 7, -25]}
              onClick={() => handleModelClick("Academic")}
            />

            {/* ADMIN */}
            <ModelViewer
              modelPath={admin}
              position={[-6, 2.1, -11.3]}
              name="Admin Building"
              textPosition={[-6, 6.5, -11.3]}
              onClick={() => handleModelClick("Admin")}
            />

            {/* BAUTISTA */}
            <ModelViewer
              modelPath={bautista}
              position={[-7, 2, -27]}
              scale={[2.5, 2.5, 2.5]}
              name="Bautista Building"
              textPosition={[-7, 7, -27]}
              onClick={() => handleModelClick("Bautista")}
            />
          </SelectToZoom>
        </Bounds>
        <RotatingMesh />
      </Stage>
    </Canvas>
    
    </>
  );
};

export default SanBartolome;