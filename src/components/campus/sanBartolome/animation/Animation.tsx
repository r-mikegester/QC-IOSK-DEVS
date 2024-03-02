import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Clouds from "../Clouds";
import {
  Bounds,
  CameraControls,
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import animation from "../../../../assets/animation/yellow/animation.glb";
import * as THREE from "three";
import { useHistory } from "react-router";
import ModelViewer from "../ModelViewer";
import openGrounds from "../../../../assets/models/others/sb_floor_final2.glb";
import techvoc from "../../../../assets/models/sb_buildings/techvoc_final.glb";
import multipurpose from "../../../../assets/models/sb_buildings/multipurpose_final.glb";
import chineseB from "../../../../assets/models/sb_buildings/chineseb_final.glb";
import ched from "../../../../assets/models/sb_buildings/ched_final.glb";
import simon from "../../../../assets/models/sb_buildings/yellow_final.glb";
import admin from "../../../../assets/models/sb_buildings/admin_final.glb";
import bautista from "../../../../assets/models/sb_buildings/bautista_final.glb";
import belmonte from "../../../../assets/models/sb_buildings/belmonte_final.glb";
import academic from "../../../../assets/models/sb_buildings/academic_final.glb";
import ballroom from "../../../../assets/models/sb_buildings/ballroom_final.glb";
import urbanFarming from "../../../../assets/models/sb_buildings/urbanfarming_final.glb";
import korPhil from "../../../../assets/models/sb_buildings/korPhil_final.glb";
import landscape from "../../../../assets/models/others/landscape.glb";

interface RoomData {
  name: string;
  textGuide: string[];
}

interface ContainerProps {
  name: string;
  roomName: string;
  modelPath: string;
  voice: string;
  shortPath: string;
  roomData: Record<string, Record<string, RoomData[]>>;
  selectedBuilding: string;
  selectedFloor: string;
  selectedRoom: string;
}

const AnimatedModelViewer = ({ modelPath, mixer }: any) => {
  const { scene, animations, cameras } = useGLTF(modelPath) as GLTF;

  // useEffect(() => {
  //   if (animations) {
  //     const animationAction = mixer.clipAction(animations[0]); // Assuming there's only one animation
  //     animationAction.setLoop(THREE.LoopOnce); // Set the loop to play only once
  //     animationAction.clampWhenFinished = true; // Keep the last frame displayed after the animation finishes
  //     animationAction.play();
  //     console.log("Animation Name:", animations[0].name);

  //     animationAction.onFinish = () => {
  //       // Stop the animation when it finishes playing
  //       animationAction.stop();
  //     };
  //   }
  // }, [animations, mixer]);

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
      <primitive object={scene} position={[0, 0, 0]} />
    </>
  );
};

const Animation: React.FC<ContainerProps> = ({
  name,
  roomName,
  modelPath,
  voice,
  shortPath,
  roomData,
  selectedBuilding,
  selectedFloor,
  selectedRoom,
}) => {
  const { scene, cameras } = useGLTF(modelPath, shortPath) as GLTF;

  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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
    let timeoutId: any;

    const audio = audioRef.current;
    if (audio && voice) {
      timeoutId = setTimeout(() => {
        audio.src = voice;
        audio
          .play()
          .catch((error) => console.error("Audio play error:", error));
      }, 1000); // Delay audio playback by 2 seconds
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts before audio starts playing
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = ""; // Reset the audio source
      }
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
      <h1 className="absolute z-10 mt-10  ml-96">{roomName}</h1>
      <button
        onClick={handleCameraSwitch}
        className="absolute z-10 mt-10 ml-20 btn btn-secondary"
      >
        Switch Camera
      </button>
      {/* <button
        onClick={handlePathSwitch}
        className="absolute z-10 mt-32 ml-20 btn btn-secondary"
      >
        {currentPath === modelPath ? "Short Path" : "Model Path"}
      </button> */}
      <div className="absolute z-10 ml-20 collapse bg-base-200 mt-28">
        <input type="checkbox" />
        <div className="text-xl font-medium collapse-title">
          Click to show directions
        </div>
        <div className="collapse-content">
          {selectedBuilding &&
            selectedFloor &&
            selectedRoom &&
            roomData[selectedBuilding][selectedFloor]?.map(
              (room, roomIndex) => {
                if (room.name === selectedRoom) {
                  return (
                    <div key={roomIndex}>
                      <ul className="steps steps-vertical">
                        {room.textGuide.map((guide, guideIndex) => (
                          <li key={guideIndex} className="step step-primary">
                            {guide}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              }
            )}
        </div>
      </div>
      <Canvas
        className={"bg-gradient-to-tr from-sky-900 to-sky-400"}
        style={{ position: "absolute" }}
        camera={gltfCamera as THREE.PerspectiveCamera}
      >
        <OrbitControls
          target={[0, -20, 25]}
          enablePan={true}
          enableZoom={false}
          enableRotate={false}
          camera={cameras[1]}
        />
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
        {/* <ModelViewer
          modelPath={techvoc}
          position={[-3.5, -0.95, 34]}
          scale={[2.2, 2, 2]}
          textPosition={[-3.5, 2, 34]}
        /> */}
        {/* MULTIPURPOSE */}
        {/* <ModelViewer
          modelPath={multipurpose}
          position={[10.5, -0.25, 34]}
          textPosition={[10.5, 2, 34]}
        /> */}
        {/* CHINESE B */}
        {/* <ModelViewer
          modelPath={chineseB}
          position={[10.5, -0.64, 28]}
          scale={[1.7, 1.7, 1.7]}
          textPosition={[10.5, 1, 28]}
        /> */}

        {/* YELLOW */}
        {/* <ModelViewer
          modelPath={simon}
          position={[0.3, -0.5, 16.5]}
          textPosition={[0.3, 3, 16.5]}
        /> */}

        {/* BALLROOM */}
        {/* <ModelViewer
          modelPath={ballroom}
          position={[-20.5, -1.4, 30.5]}
          scale={[1.7, 1.7, 1.7]}
          textPosition={[-20.5, 0.5, 30.5]}
        /> */}

        {/* CHED */}
        {/* <ModelViewer
          modelPath={ched}
          position={[-21, -0.5, 21.6]}
          scale={[1, 1, 1]}
          textPosition={[-21, 1.5, 21.6]}
        /> */}

        {/* BELMONTE */}
        {/* <ModelViewer
          modelPath={belmonte}
          position={[7, 1, 5.8]}
          scale={[2, 2, 2]}
          textPosition={[7, 4.5, 5.8]}
        /> */}

        {/* ACADEMIC */}
        {/* <ModelViewer
          modelPath={academic}
          position={[6.5, 1.6, -8]}
          scale={[2.2, 2.2, 2.2]}
          textPosition={[6.5, 5.5, -8]}
        /> */}

        {/* ADMIN */}
        {/* <ModelViewer
          modelPath={admin}
          position={[-8.7, 0.2, 6.5]}
          scale={[1.1, 1.1, 1.1]}
          textPosition={[-8.7, 4.5, 6.5]}
        /> */}

        {/* BAUTISTA */}
        {/* <ModelViewer
          modelPath={bautista}
          position={[-9.45, -2.8, -8.55]}
          scale={[2.4, 2.4, 2.4]}
          textPosition={[-9.45, 6, -8.55]}
        /> */}

        {/* URBAN FARMING */}
        {/* <ModelViewer
          modelPath={urbanFarming}
          position={[-1, -2.9, -25]}
          scale={[4, 4, 4]}
          textPosition={[-1, 0, -25]}
        /> */}

        {/* KORPHIL */}
        {/* <ModelViewer
          modelPath={korPhil}
          position={[-33, -5.5, -5]}
          scale={[1, 1, 1]}
          textPosition={[-33, 1, -5]}
        /> */}
      </Canvas>
      <audio ref={audioRef} src={voice} />
    </>
  );
};

export default Animation;
