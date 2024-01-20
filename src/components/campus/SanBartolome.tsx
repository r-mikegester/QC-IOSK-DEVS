import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import SelectToZoom from "./SelectToZoom";
import RotatingMesh from "./RotatingMesh";
import Clouds from "./Clouds";

interface ContainerProps {
  name: string;
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  const [isNight, setIsNight] = useState(false);

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
    console.log(`Clicked on ${modelName}`);
  };

  return (
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
        autoRotateSpeed={1}
        enableZoom={true}
        minDistance={50}
        maxDistance={200}
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
          modelPath="/src/assets/Models/others/sb_final2.glb"
          position={[0, 0, 0]}
        />
        <ModelViewer
          modelPath="/src/assets/Models/others/landscape.glb"
          position={[0, -14, 25]}
        />
        {/* BUILDINGS */}
        <Bounds fit clip observe margin={2}>
          <SelectToZoom>
            {/* TECHVOC */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_techvoc2.glb"
              position={[-1, 1, 15]}
              scale={[2.2, 2.2, 2.2]}
              name="Techvoc"
              textPosition={[-1, 3, 15]}
              onClick={() => handleModelClick("TECHVOC")}
            />

            {/* MULTIPURPOSE */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_multipurpose2.glb"
              position={[11.9, 1, 16]}
              name="Multipurpose"
              textPosition={[11.9, 3, 16]}
            />

            {/* CHINESE B */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_chineseb2.glb"
              position={[11.9, 0.65, 10]}
              scale={[1.5, 1.5, 1.5]}
              name="Chinese B"
              textPosition={[11.9, 2.5, 10]}
            />

            {/* BALLROOM */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_ballroom2.glb"
              position={[-17.5, 0.1, 11]}
              scale={[1.5, 1.5, 1.5]}
              name="Ballroom"
              textPosition={[-17.5, 1.5, 11]}
            />

            {/* CHED */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_metalcasting2.glb"
              position={[-18.5, 0.1, 4]}
              scale={[1.5, 1.5, 1.5]}
              name="CHED"
              textPosition={[-18.5, 2, 4]}
            />

            {/* YELLOW */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_yellow2.glb"
              position={[3.1, 1.1, 0]}
              name="Yellow Building"
              textPosition={[3.1, 4.5, 0]}
            />

            {/* BELMONTE */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_belmonte2.glb"
              position={[10, 2, -11]}
              scale={[2, 2, 2]}
              name="Belmonte Building"
              textPosition={[10, 5.5, -11]}
            />

            {/* ACADEMIC */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_academic2.glb"
              position={[9, 2, -25]}
              scale={[2, 2, 2]}
              name="Academic Building"
              textPosition={[9, 7, -25]}
            />

            {/* ADMIN */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_admin2.glb"
              position={[-6, 2.1, -11.3]}
              name="Admin Building"
              textPosition={[-6, 6.5, -11.3]}
            />

            {/* BAUTISTA */}
            <ModelViewer
              modelPath="/src/assets/models/sb_buildings/og_bautista2.glb"
              position={[-7, 2, -27]}
              scale={[2.5, 2.5, 2.5]}
              name="Bautista Building"
              textPosition={[-7, 7, -27]}
            />
          </SelectToZoom>
        </Bounds>
        <RotatingMesh />
      </Stage>
    </Canvas>
  );
};

export default SanBartolome;