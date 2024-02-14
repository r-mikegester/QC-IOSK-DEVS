import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Clouds from "../Clouds";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import animation from "../../../../assets/animation/yellow/animation.glb";
import * as THREE from "three";
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
  roomName: string;
  modelPath: string;
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
      <primitive object={scene} />
    </>
  );
};

const Animation: React.FC<ContainerProps> = ({ name, roomName, modelPath }) => {
  const { scene, cameras } = useGLTF(modelPath) as GLTF;
  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const history = useHistory();

  const clickMap = () => {
    history.go(0);
    history.push("/SanBartolome");
  };

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

  return (
    <>
      <h1 className=" absolute z-10 ml-96 mt-10">{roomName}</h1>
      <button
        onClick={handleCameraSwitch}
        className="btn btn-secondary absolute z-10 ml-20 mt-10"
      >
        Switch Camera
      </button>
      <button
        onClick={clickMap}
        className="btn btn-secondary absolute z-10 ml-60 mt-10"
      >
        Back
      </button>

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
      </Canvas>
    </>
  );
};

export default Animation;
