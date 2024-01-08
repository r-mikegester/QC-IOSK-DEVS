import {
  OrbitControls,
  Stage,
  Bounds,
  useBounds,
  Html,
  Text,
  Billboard,
  Sparkles,
  Stars,
} from "@react-three/drei";
import {
  Object3D,
  Object3DEventMap,
  Box3,
  Material,
  NormalBufferAttributes,
  BufferGeometry,
  Mesh,
} from "three";
import {
  Selection,
  EffectComposer,
  Outline,
  Select,
} from "@react-three/postprocessing";
import React, { Suspense, useRef, useState, ReactNode, useEffect } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useTranslation } from "react-i18next";
import * as TWEEN from "@tweenjs/tween.js";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import * as THREE from "three";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import locationGLB from '../../assets/models/others/location.glb';
import cloudGLB from '../../assets/Models/clouds/cloud.glb';
import cloud2GLB from '../../assets/Models/clouds/cloud2.glb';
import cloud3GLB from '../../assets/Models/clouds/cloud3.glb';
import cloud4GLB from '../../assets/Models/clouds/cloud4.glb';
import cloud5GLB from '../../assets/Models/clouds/cloud5.glb';
import cloud1GLB from '../../assets/Models/clouds/cloud1.glb';
import metalCasting from '../../assets/models/sb_buildings/og_metalcasting.glb';
import chineseB from '../../assets/models/sb_buildings/og_chineseb.glb';
import techvoc from '../../assets/models/sb_buildings/og_techvoc.glb';
import admin from '../../assets/models/sb_buildings/og_newadmin.glb';
import yellow from '../../assets/models/sb_buildings/og_yellow.glb';
import academic from '../../assets/models/sb_buildings/og_academic.glb';
import belmonte from '../../assets/models/sb_buildings/og_belmonte2.glb';
import bautista from '../../assets/models/sb_buildings/og_bautista2.glb';
import multipurpose from '../../assets/models/sb_buildings/og_multipurpose.glb';
import sbfloor from '../../assets/models/others/sb_final.glb';
import bikerack from '../../assets/models/others/bikerack.glb';

interface ModelProps {
  url: string;
  scale: number;
  name: string;
  mesh?: Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null;
}

interface SelectToZoomProps {
  children: React.ReactNode; // Define the type for 'children' prop
}

interface ContainerProps {
  name: string;
}

interface SelectToZoomProps {
  children: ReactNode;
}

function Model(props: ModelProps) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  // console.log(hovered);

  const gltf = useLoader(GLTFLoader, props.url);
  const isClickableMesh = (name: string) => {
    // Define conditions for meshes that should be clickable
    return name !== "OpenGrounds Flooring"; // Exclude the flooring by its name
    // You can add more conditions or modify this based on the specific properties of your meshes
  };
  const handleClick = () => {
    if (isClickableMesh(props.name)) {
      // console.log("Building clicked!");
      setTimeout(() => {
        const dialogElement = document.getElementById(
          "SelectBuilding"
        ) as HTMLDialogElement | null;
        if (dialogElement) {
          dialogElement.showModal();
        }
      }, 2000);
    }
  };
  return (
    <group>
      {isClickableMesh(props.name) && ( // Render the clickable meshes
        <Select enabled={hovered}>
          <group>
            <primitive
              object={gltf.scene}
              ref={ref}
              {...props}
              onClick={handleClick}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
            />
          </group>
        </Select>
      )}
      {!isClickableMesh(props.name) && ( // Exclude the flooring from being clickable
        <primitive object={gltf.scene} {...props} />
      )}
    </group>
  );
}

const RotatingMesh = () => {
  const meshRef =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);

  // Use useFrame to update rotation and position in every frame
  useFrame((state: { clock: { elapsedTime: number } }, delta: any) => {
    if (meshRef.current) {
      // Rotate around the y-axis
      meshRef.current.rotation.y += 0.05;

      // Float up and down along the y-axis
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.8 + 5; // Adjust amplitude and starting position as needed
    }
  });

  return (
    <mesh ref={meshRef} position={[4, 3, 3]}>
      {/* Assuming Model is a custom component that accepts a mesh prop */}
      <Model
        url={locationGLB}
        scale={1.5}
        name="location"
        mesh={meshRef.current} // Pass the mesh reference to your Model component if needed
      />
    </mesh>
  );
};

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const [isColor1, setIsColor1] = useState(true);
  const [isEnvironment, setIsEnvironment] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [autoRotate, setAutoRotate] = useState(true); // Initial state set to true for autorotation
  const [isEnvironmentTwo, setIsEnvironmentTwo] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);
  const [isCloudOn, setCloudOn] = useState(false);
  const [isStars, setStars] = useState(false);
  const clearWaitingQueue = () => {
    // Easy, right 😎
    toast.clearWaitingQueue();
  };

  // Display a toast message when thins clicked is changed

  // Function to check if the current time is between 6 PM and 4 AM
  const isNightTime = () => {
    const currentDate = new Date();
    const currentHour = parseInt(format(currentDate, "H"), 10); // Extract the current hour (0-23)

    return currentHour >= 18 || currentHour < 4; // 18 is for Nighttime and 4 is for daytime
  };

  // Function to handle the time-based toggle
  const handleTimeBasedToggle = () => {
    const currentTimeInRange = isNightTime();
    if (currentTimeInRange) {
      setIsLoading(true); // Set loading state to true before changing to night mode

      // Simulate a delay for the transition to night mode using setTimeout
      setTimeout(() => {
        setIsColor1(false); // Set color 2 when in the specified time range
        setIsEnvironment(false);
        // setIsEnvironmentTwo(false); // Modify environment settings as needed
        setIsLoading(false);
        // console.log('Night Mode Activated'); // Set loading state to false after transitioning
      }, 0); // Adjust the delay time as needed (in milliseconds)
    } else {
      setIsLoading(true); // Set loading state to true before changing back to day mode

      // Simulate a delay for the transition back to day mode using setTimeout
      setTimeout(() => {
        setIsColor1(true); // Set color 1 when outside the specified time range
        setIsEnvironment(true);
        // setIsEnvironmentTwo(true); // Modify environment settings as needed
        setIsLoading(false);
        // console.log("Day Mode Activated"); // Set loading state to false after transitioning
      }, 0); // Adjust the delay time as needed (in milliseconds)
    }
  };

  // useEffect to continuously check and toggle based on time changes
  useEffect(() => {
    const interval = setInterval(() => {
      handleTimeBasedToggle(); // Check and toggle based on time at regular intervals
    }, 3000); // Check every minute (adjust as needed)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array to run only on initial mount

  return (
    <>
      <div className="join absolute top-5 right-96">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="tooltip tooltip-bottom join-item bg-base-100 text-base-content z-50 flex p-2 flex-col items-center gap-1 justify-center rounded-xl border border-gray-800 hover:bg-base-300 duration-200 ease-in-out"
          data-tip={t(autoRotate ? "Stop Rotation" : "Start Rotation")}
        >
          {/* {autoRotate ? "Stop Rotation" : "Start Rotation"} */}
          {autoRotate ? (
            <Icon
              icon="gravity-ui:arrows-rotate-right-slash"
              className="w-8 h-8"
            />
          ) : (
            <Icon icon="gravity-ui:arrows-rotate-right" className="w-8 h-8" />
          )}
        </button>
        <button
          onClick={() => setIsEnvironmentTwo(!isEnvironmentTwo)}
          className="tooltip tooltip-bottom join-item bg-base-100 text-base-content z-50 flex p-2 flex-col items-center gap-1 justify-center rounded-xl border border-gray-800 hover:bg-base-300 duration-200 ease-in-out"
          data-tip={t(isEnvironmentTwo ? "Lights On" : "Lights Off")}
        >
          {isEnvironmentTwo ? (
            <Icon icon="line-md:lightbulb" className="w-8 h-8" />
          ) : (
            <Icon icon="line-md:lightbulb-off" className="w-8 h-8" />
          )}
        </button>
        <button
          name="cloud"
          onClick={() => setCloudOn(!isCloudOn)}
          className="tooltip tooltip-bottom join-item bg-base-100 text-base-content z-50 flex p-2 flex-col items-center gap-1 justify-center rounded-xl border border-gray-800 hover:bg-base-300 duration-200 ease-in-out"
          data-tip={t(isCloudOn ? "Clouds On" : "Clouds Off")}
        >
          {/* {autoRotate ? "Stop Rotation" : "Start Rotation"} */}
          {isCloudOn ? (
            <Icon icon="tabler:cloud" className="w-8 h-8" />
          ) : (
            <Icon icon="tabler:cloud-off" className="w-8 h-8" />
          )}
        </button>
        <button
          name="nightmodeswitch"
          onClick={() => setIsNightMode(!isNightMode)}
          className="tooltip tooltip-bottom join-item bg-base-100 text-base-content z-50 flex p-2 flex-col items-center gap-1 justify-center rounded-xl border border-gray-800 hover:bg-base-300 duration-200 ease-in-out"
          data-tip={t(isNightMode ? "Night Mode" : "Day Mode")}
        >
          {/* {autoRotate ? "Stop Rotation" : "Start Rotation"} */}
          {isNightMode ? (
            <Icon
              icon="material-symbols:nights-stay-outline-rounded"
              className="w-8 h-8"
            />
          ) : (
            <Icon
              icon="material-symbols:partly-cloudy-day-outline-rounded"
              className="w-8 h-8"
            />
          )}
        </button>

        <button
          name="stars"
          onClick={() => setStars(!isStars)}
          className="tooltip tooltip-bottom join-item bg-base-100 text-base-content z-50 flex p-2 flex-col items-center gap-1 justify-center rounded-xl border border-gray-800 hover:bg-base-300 duration-200 ease-in-out"
          data-tip={t(isStars ? "Stars On" : "Stars Off")}
        >
          {/* {autoRotate ? "Stop Rotation" : "Start Rotation"} */}
          {isStars ? (
            <Icon icon="tabler:stars" className="w-8 h-8" />
          ) : (
            <Icon icon="tabler:stars-off" className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Conditionally render the loading spinner based on the isLoading state */}
      {isLoading && (
        <div className="loading-spinner">
          {/* Add your loading spinner component here */}
          <h1 className="absolute inset-0 z-50 text-green-500">Loading...</h1>
          {/* Replace SpinnerComponent with your actual loading spinner */}
        </div>
      )}

      <Canvas
        frameloop="demand"
        orthographic
        dpr={[1, 2]}
        camera={{ fov: 75, position: [10, 10, 10], zoom: 20 }}
        className={
          isNightMode
            ? "bg-gradient-to-tr from-sky-900 to-sky-400"
            : "bg-gradient-to-tr from-stone-950 to-cyan-950"
        }
        style={{ position: "absolute" }}
      >
        <OrbitControls
          makeDefault
          minAzimuthAngle={0}
          maxAzimuthAngle={Math.PI / 0}
          minPolarAngle={Math.PI / 25}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={true}
          zoomSpeed={3}
          autoRotate={autoRotate} // Set autoRotate to the state value to toggle autorotation
          autoRotateSpeed={0.4}
          minZoom={5}
          maxZoom={60}
        />

        <Suspense fallback={null}>
          {isCloudOn ? null : (
            <>
              <mesh position={[10, 20, -60]}>
                <Model // BACK
                  url={cloudGLB}
                  scale={1.5}
                  name={"cloud"}
                />
              </mesh>
              <mesh position={[0, 20, 20]}>
                <Model // LEFT
                  url={cloud1GLB}
                  scale={1.2}
                  name={"cloud1"}
                />
              </mesh>
              <mesh position={[40, 20, -30]}>
                <Model // RIGHT
                  url={cloud2GLB}
                  scale={1.3}
                  name={"cloud2"}
                />
              </mesh>
              <mesh position={[-20, 20, 70]}>
                <Model // FRONT
                  url={cloud3GLB}
                  scale={1.2}
                  name={"cloud3"}
                />
              </mesh>
              <mesh position={[30, 20, 50]}>
                <Model // FRONT RIGHT
                  url={cloud4GLB}
                  scale={1.4}
                  name={"cloud4"}
                />
              </mesh>
              <mesh position={[-30, 20, -40]}>
                <Model // BACK LEFT
                  url={cloud5GLB}
                  scale={1}
                  name={"cloud5"}
                />
              </mesh>
            </>
          )}
          <Bounds fit clip observe margin={1.2}>
            {isNightMode ? null : (
              <>
                {/* <directionalLight position={[0, 0, 10]} intensity={20} /> */}
                {/* <hemisphereLight position={[0, 0, 10]} intensity={10} /> */}

                {/* <spotLight
                    position={[0, 10, -20]}
                    angle={Math.PI / 4}
                    penumbra={0.1}
                    intensity={500}
                  />
                  <pointLight position={[10, 10, -60]} intensity={100} /> */}
                {isStars ? null : (
                  <Stars
                    radius={40} // Adjust the radius based on your scene size
                    depth={50} // Adjust the depth based on your scene size
                    count={50} // Adjust the count based on the number of sparkles you want
                    factor={0} // Adjust the factor to control the distribution of sparkles
                    saturation={0} // Adjust the saturation to control the color of sparkles
                  />
                )}
                {/* <Sparkles
                    color="orange"
                    count={500}
                    noise={1}
                    opacity={1}
                    size={10}
                    speed={3}
                    scale={[500, 250, 500]}
                  /> */}
              </>
            )}
            <Stage
              environment={isNightMode ? "city" : "night"}
              adjustCamera
              shadows
            >
              {/* <ambientLight intensity={0.5} /> */}
              {/* <spotLight position={[10, 10, 100]} angle={0.15} penumbra={1} intensity={0} /> */}
              {/* <pointLight position={[-10, -10, -10]} /> */}
              {isEnvironmentTwo ? null : (
                <>
                  {/* BELMONTE */}
                  <rectAreaLight
                    position={[10, 4, -80]}
                    intensity={3}
                    width={20}
                    height={15}
                    rotation={[0, 1.57, 0]}
                  />
                  <rectAreaLight
                    position={[17.5, 4, -80]}
                    intensity={3}
                    width={20}
                    height={15}
                    rotation={[0, 4.72, 0]}
                  />

                  {/* ACADEMIC */}
                  <rectAreaLight
                    position={[9, 5, -108]}
                    intensity={3}
                    width={25}
                    height={20}
                    rotation={[0, 1.57, 0]}
                  />
                  <rectAreaLight
                    position={[15, 5, -108]}
                    intensity={3}
                    width={25}
                    height={20}
                    rotation={[0, 4.72, 0]}
                  />

                  {/* BAUTISTA */}
                  <rectAreaLight
                    position={[-20, 5, -108]}
                    intensity={3}
                    width={25}
                    height={20}
                    rotation={[0, 1.24, 0]}
                  />

                  {/* ADMIN */}
                  <rectAreaLight
                    position={[-21, 6, -80]}
                    intensity={3}
                    width={15}
                    height={15}
                    rotation={[0, 1.24, 0]}
                  />

                  {/* YELLOW */}
                  <rectAreaLight
                    position={[0, 6, -53.57]}
                    intensity={3}
                    width={40}
                    height={15}
                    rotation={[0, 6.28, 0]}
                  />

                  {/* TECHVOC */}
                  <rectAreaLight
                    position={[-8, 3, -19]}
                    intensity={3}
                    width={20}
                    height={8}
                    rotation={[0, 3.15, 0]}
                  />
                  <rectAreaLight
                    position={[-8, 3, -41]}
                    intensity={3}
                    width={20}
                    height={8}
                    rotation={[0, 6.28, 0]}
                  />
                  <rectAreaLight
                    position={[-19, 3, -30]}
                    intensity={3}
                    width={20}
                    height={6}
                    rotation={[0, 1.56, 0]}
                  />
                  <rectAreaLight
                    position={[3, 3, -30]}
                    intensity={3}
                    width={20}
                    height={6}
                    rotation={[0, 4.72, 0]}
                  />

                  {/* <pointLight position={[10, 12, -110]} intensity={300} /> */}
                </>
              )}
              <Selection>
                <EffectComposer multisampling={10} autoClear={false}>
                  <Outline blur edgeStrength={100} width={1500} />
                </EffectComposer>

                <SelectToZoom>
                  {/* <mesh position={[-39.5, 4.2, -37.5]} rotation={[0, -1.6, 0]} scale={1.5}>
                  <Model url="/src/assets/models/sb_buildings/og_ballroom.glb" scale={1.9} name={"Ballroom"} />
                </mesh> */}

                  <mesh
                    position={[-43, 3, -49.9]}
                    rotation={[0, 0.01, 0]}
                    scale={1.5}
                  >
                    <Model
                      url={metalCasting}
                      scale={1.9}
                      name={"MetalCasting"}
                    />
                    <Billboard follow position={[0, 3, 0]}>
                      <Text
                        fontSize={1}
                        rotation={[0.5, 12.3, 0]}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        CHED
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[17, 5.9, -38.5]}
                    rotation={[0, 1.57, 0]}
                    scale={2}
                  >
                    <Model
                      url={chineseB}
                      scale={1.9}
                      name={"ChineseB"}
                    />
                    <Billboard follow position={[0, 1.5, 0]}>
                      <Text
                        fontSize={1}
                        rotation={[0.5, -8, 0]}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Chinese B
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[-19, 3, -19]}
                    rotation={[0, -0, 0]}
                    scale={0.185}
                  >
                    <Model
                      url={techvoc}
                      scale={1.9}
                      name={"TechVoc"}
                    />
                    <Billboard follow position={[60, 40, -60]}>
                      <Text
                        fontSize={10}
                        rotation={[0, -12, 0]}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        {t("Techvoc Building")}
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[-2.6, 0.1, -3.4]}
                    rotation={[0, -6.3, 0]}
                    scale={1.7}
                  >
                    <Model
                      url={admin}
                      scale={1.12}
                      name={"Admin"}
                    />
                    <Billboard follow position={[-9.5, 10, -45]}>
                      <Text
                        fontSize={1}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Admin Building
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[-0.3, 0.27, 2.5]}
                    rotation={[0, 6.28, 0]}
                    scale={1.1}
                  >
                    <Model
                      url={yellow}
                      scale={1.9}
                      name={"Yellow"}
                    />
                    <Billboard follow position={[0, 11.5, -55]}>
                      <Text
                        fontSize={1.5}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Yellow Building
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[11, 0.49, -108]}
                    rotation={[0, -1.57, 0]}
                    scale={2.3}
                  >
                    <Model
                      url={academic}
                      scale={1.9}
                      name={"Academic"}
                    />
                    <Billboard follow position={[0, 8, 0]}>
                      <Text
                        rotation={[0.5, 8, 0]}
                        fontSize={0.8}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Academic Building
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[18, 1, -71]}
                    rotation={[0, 1.57, 0]}
                    scale={2.3}
                  >
                    <Model
                      url={belmonte}
                      scale={1.9}
                      name={"Belmonte"}
                    />
                    <Billboard follow position={[4, 6, -1]}>
                      <Text
                        rotation={[0.5, -8, 0]}
                        fontSize={0.8}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Belmonte Building
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh
                    position={[-19.5, 7.24, -112]}
                    rotation={[0, 0, 0]}
                    scale={2.3}
                  >
                    <Model
                      url={bautista}
                      scale={2}
                      name={"Bautista"}
                    />
                    <Billboard follow position={[-1, 7, 0]}>
                      <Text
                        fontSize={0.8}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Bautista Building
                      </Text>
                    </Billboard>
                  </mesh>
                  <mesh position={[17.5, 3.7, -26]} rotation={[0, 3.14, 0]}>
                    <Model
                      url={multipurpose}
                      scale={1.9}
                      name={"Multipurpose"}
                    />
                    <Billboard follow position={[-1, 6, -1]}>
                      <Text
                        fontSize={1.5}
                        rotation={[1, 28, 0]}
                        outlineColor="#000000"
                        outlineOpacity={1}
                        outlineWidth="20%"
                      >
                        Multipurpose Building
                      </Text>
                    </Billboard>
                  </mesh>
                </SelectToZoom>
              </Selection>
              <RotatingMesh />
              {/* <Html position={[4, 21, 3]} className="-z-[1000]">
                <div
                  className="backdrop-blur-lg bg-slate-900/40 text-lg py-2 px-4 rounded-2xl -z-[1000]"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                    transition: "background-color 0.3s ease",
                    fontSize: `30px`, // Adjust the multiplier as needed
                    whiteSpace: "nowrap",
                    zIndex: "-9999", // Adjust the z-index value as needed
                  }}
                >
                  {t("You are here")}
                </div>
              </Html> */}

              <mesh position={[0, 0, 0]}>
                <Model
                  url={sbfloor}
                  scale={2}
                  name={"OpenGrounds Flooring"}
                />
              </mesh>
              <mesh position={[0, 0, 0]} rotation={[0, 0.01, 0]} scale={2}>
                <Model
                  url={bikerack}
                  scale={1}
                  name={"BikeRack"}
                />
                <Billboard follow position={[2, 1, -52]}>
                  <Text
                    fontSize={0.3}
                    rotation={[0, 12.3, 0]}
                    outlineColor="#000000"
                    outlineOpacity={1}
                    outlineWidth="20%"
                  >
                    Bike Parking
                  </Text>
                </Billboard>
              </mesh>
            </Stage>
          </Bounds>
        </Suspense>
      </Canvas>
    </>
  );
};

function SelectToZoom({ children }: SelectToZoomProps) {
  const api = useBounds();
  const { camera } = useThree();

  const handleZoom = (e: {
    stopPropagation: () => void;
    delta: number;
    object: Object3D<Object3DEventMap> | Box3 | undefined;
  }) => {
    e.stopPropagation();

    if (e.delta <= 2) {
      const targetPosition = new THREE.Vector3(0, 0, -30);

      const tween = new TWEEN.Tween(camera.position)
        .to(targetPosition, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          api.refresh(e.object).fit();
        })
        .start();
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    TWEEN.update();
  };
  animate();

  const handlePointerMissed = (e: { button: number }) => {
    if (e.button === 0) {
      api.refresh().fit();
    }
  };

  return (
    <group onClick={handleZoom} onPointerMissed={handlePointerMissed}>
      {children}
    </group>
  );
}
export default SanBartolome;
