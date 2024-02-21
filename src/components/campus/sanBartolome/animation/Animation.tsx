import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Clouds from "../Clouds";
import { Bounds, Stage, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import animation from "../../../../assets/animation/yellow/animation.glb";
import * as THREE from "three";
import { useHistory } from "react-router";
import ModelViewer from "../ModelViewer";
import openGrounds from "../../../../assets/models/others/sb_final2.glb";
import techvoc from "../../../../assets/models/sb_buildings/og_techvoc2.glb";
import multipurpose from "../../../../assets/models/sb_buildings/og_multipurpose2.glb";
import chineseB from "../../../../assets/models/sb_buildings/og_chineseb2.glb";
import ched from "../../../../assets/models/sb_buildings/og_metalcasting2.glb";
import simon from "../../../../assets/models/sb_buildings/og_yellow2.glb";
import admin from "../../../../assets/models/sb_buildings/og_admin2.glb";
import bautista from "../../../../assets/models/sb_buildings/og_bautista2.glb";
import belmonte from "../../../../assets/models/sb_buildings/og_belmonte2.glb";
import academic from "../../../../assets/models/sb_buildings/og_academic2.glb";
import ballroom from "../../../../assets/models/sb_buildings/og_ballroom2.glb";
import landscape from "../../../../assets/models/others/landscape.glb";

interface ContainerProps {
  name: string;
  roomName: string;
  modelPath: string;
  voice: string;
  shortPath: string;
}

const AnimatedModelViewer = ({ modelPath, mixer }: any) => {
  const { scene, animations, cameras } = useGLTF(modelPath) as GLTF;

  useEffect(() => {
    if (animations) {
      const animationAction = mixer.clipAction(animations[0]); // Assuming there's only one animation
      animationAction.setLoop(THREE.LoopOnce); // Set the loop to play only once
      animationAction.clampWhenFinished = true; // Keep the last frame displayed after the animation finishes
      animationAction.play();
      console.log("Animation Name:", animations[0].name);

      animationAction.onFinish = () => {
        // Stop the animation when it finishes playing
        animationAction.stop();
      };
    }
  }, [animations, mixer]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return (
    <>
      <primitive object={scene} position={[3.4, -2, 29.3]} />
    </>
  );
};

const Animation: React.FC<ContainerProps> = ({
  name,
  roomName,
  modelPath,
  voice,
  shortPath,
}) => {
  const { scene, cameras } = useGLTF(modelPath, shortPath) as GLTF;

  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [currentPath, setCurrentPath] = useState(modelPath);

  const handleCameraSwitch = () => {
    setActiveCameraIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  // const handlePathSwitch = () => {
  //   if (mixerRef.current) {
  //     mixerRef.current.stopAllAction(); // Stop all animation actions
  //   }

  //   setCurrentPath((prevPath) =>
  //     prevPath === modelPath ? shortPath : modelPath
  //   );
  // };

  // Audio playback logic
  useEffect(() => {
    const audio = new Audio(voice);
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [voice]);

  const gltfCamera =
    cameras && cameras.length > 0
      ? (cameras[activeCameraIndex] as THREE.PerspectiveCamera)
      : null;

  if (!mixerRef.current) {
    mixerRef.current = new THREE.AnimationMixer(scene);
  }

  return (
    <>
      <h1 className=" absolute z-10 ml-96 mt-10">{roomName}</h1>
      <button
        onClick={handleCameraSwitch}
        className="btn btn-secondary absolute z-10 ml-20 mt-10"
      >
        Switch Camera
      </button>
      {/* <button
        onClick={handlePathSwitch}
        className="btn btn-secondary absolute z-10 ml-20 mt-32"
      >
        {currentPath === modelPath ? "Short Path" : "Model Path"}
      </button> */}

      <Canvas
        className={"bg-gradient-to-tr from-sky-900 to-sky-400"}
        style={{ position: "absolute" }}
        camera={gltfCamera as THREE.PerspectiveCamera}
      >
        <ambientLight intensity={2} />
        <Clouds />
        <AnimatedModelViewer
          modelPath={modelPath}
          mixer={mixerRef.current}
          activeCameraIndex={activeCameraIndex}
          cameras={cameras}
        />

        {/* SB FLOORING */}
        <ModelViewer modelPath={openGrounds} position={[0, 0, 0]} />
        {/* BUILDINGS */}
        {/* TECHVOC */}
        <ModelViewer
          modelPath={techvoc}
          position={[-1, 0.6, 15]}
          scale={[2.2, 2.2, 2.2]}
          textPosition={[-1, 3, 15]}
        />
        {/* MULTIPURPOSE */}
        <ModelViewer
          modelPath={multipurpose}
          position={[11.9, 1, 16]}
          textPosition={[11.9, 3, 16]}
        />
        {/* CHINESE B */}
        <ModelViewer
          modelPath={chineseB}
          position={[11.9, 0.65, 10]}
          scale={[1.5, 1.5, 1.5]}
          textPosition={[11.9, 2.5, 10]}
        />
        {/* BALLROOM */}
        <ModelViewer
          modelPath={ballroom}
          position={[-17.5, 0.1, 11]}
          scale={[1.5, 1.5, 1.5]}
          textPosition={[-17.5, 1.5, 11]}
        />
        {/* CHED */}
        <ModelViewer
          modelPath={ched}
          position={[-18.5, 0.1, 4]}
          scale={[1.5, 1.5, 1.5]}
          textPosition={[-18.5, 2, 4]}
        />
        {/* YELLOW */}
        <ModelViewer
          modelPath={simon}
          position={[3.1, 1.1, 0]}
          textPosition={[3.1, 4.5, 0]}
        />
        {/* BELMONTE */}
        <ModelViewer
          modelPath={belmonte}
          position={[10, 2, -11]}
          scale={[2, 2, 2]}
          textPosition={[10, 5.5, -11]}
        />
        {/* ACADEMIC */}
        <ModelViewer
          modelPath={academic}
          position={[9, 2, -25]}
          scale={[2, 2, 2]}
          textPosition={[9, 7, -25]}
        />
        {/* ADMIN */}
        <ModelViewer
          modelPath={admin}
          position={[-6, 2.1, -11.3]}
          textPosition={[-6, 6.5, -11.3]}
        />
        {/* BAUTISTA */}
        <ModelViewer
          modelPath={bautista}
          position={[-7, 2, -27]}
          scale={[2.5, 2.5, 2.5]}
          textPosition={[-7, 7, -27]}
        />
      </Canvas>
    </>
  );
};

export default Animation;
