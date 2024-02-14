import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Clouds from "../Clouds";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import animation from "../../../../assets/animation/yellow/animation.glb";
import * as THREE from "three";
import { useHistory } from "react-router";
import { Icon } from "@iconify/react";

interface ContainerProps {
  buildingName: string;
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

const Animation: React.FC<ContainerProps> = ({ buildingName, roomName, modelPath }) => {
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
      <div className="relative w-full h-full">
        <div className="absolute z-10 w-96 top-5 ">
          <div className="flex items-center justify-center w-screen space-x-3">

            <div role="tablist" className="p-3 space-x-3 tabs bg-base-300 tabs-boxed">
              <a role="tab" className="tab btn " onClick={clickMap}><Icon icon="typcn:arrow-back-outline" className="w-8 h-8" />Back to Map</a>
              <a role="tab" className="border-none tab btn tab-active">
                <div className="flex flex-col space-x-3">
                  <p>{buildingName}</p>
                  <p>{roomName}</p>
                </div>
              </a>
              <a role="tab" className="tab btn" onClick={handleCameraSwitch}> <Icon icon="f7:camera-rotate" className="w-8 h-8" />Switch Camera</a>
            </div>
          </div>
        </div>
      </div>


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
