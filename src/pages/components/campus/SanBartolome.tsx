import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useRef, useState, ReactNode } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Stage, Bounds, useBounds, Cloud, Html, Text, Billboard } from "@react-three/drei";
import { Selection, EffectComposer, Outline, Select } from "@react-three/postprocessing";
import { Object3D, Object3DEventMap, Box3 } from "three";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";
import Loading from '../loading';
import './style.css';
interface ModelProps {
  url: string;
  scale: number;
  name: string;
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
  console.log(hovered);

  const gltf = useLoader(GLTFLoader, props.url);
  const isClickableMesh = (name: string) => {
    // Define conditions for meshes that should be clickable
    return name !== "OpenGrounds Flooring"; // Exclude the flooring by its name
    // You can add more conditions or modify this based on the specific properties of your meshes
  };
  const handleClick = () => {
    if (isClickableMesh(props.name)) {
      console.log("Building clicked!");
      setTimeout(() => {
        const dialogElement = document.getElementById('SelectBuilding') as HTMLDialogElement | null;
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

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  return (
    <Canvas
      frameloop="demand"
      orthographic
      dpr={[1, 2]}
      camera={{ fov: 75, position: [10, 10, 10], zoom: 20 }}
      className="bg-gradient-to-tr from-sky-900 to-sky-400"
      style={{ "position": "absolute" }}>
      {/* <Text 
        position={[10, 4, 10]}
        fontSize={2}
        color="white"
        anchorX='center'
        anchorY='bottom'
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="justify"
        font="https://fonts.gstatic.com/s/sawarabimincho/v3/6ae64e8e54fd2ee4bc10d49ad54ac18c.ttf" // You can replace this with your own font URL
      >
        Yellow Building
      </Text> */}
      <OrbitControls
        makeDefault
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 0}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 6}
        enableZoom={true}
        enablePan={true}
        zoomSpeed={3}
        autoRotate={true}
        autoRotateSpeed={0.4}
        minZoom={5}
        maxZoom={60}
      />

      <Suspense fallback={null}>
        <mesh position={[12.8, -40, -69.9]} rotation={[0, 4.1, 0]} scale={1.7}>
          <Model url="/src/models/clouds/cloud.glb" scale={1.9} name={"clouds"} />
        </mesh>
        <mesh position={[12.8, -20, 9.9]} rotation={[0, 9, 20]} scale={1.7}>
          <Model url="/src/models/clouds/cloud2.glb" scale={1.9} name={"clouds2"} />
        </mesh>
        <mesh position={[-35.8, -10, 9.9]} rotation={[0, 6.5, 0]} scale={1.7}>
          <Model url="/src/models/clouds/cloud3.glb" scale={1.9} name={"clouds3"} />
        </mesh>
        <mesh position={[-35.8, -10, 10.9]} rotation={[0, 6.5, 0]} scale={1.7}>
          <Model url="/src/models/clouds/cloudies.glb" scale={1.9} name={"clouds3"} />
        </mesh>
        <Bounds fit clip observe margin={1.2}>
          <Stage environment={"city"} adjustCamera shadows>
            {/* <ambientLight intensity={0.5} /> */}
            {/* <spotLight position={[10, 10, 100]} angle={0.15} penumbra={1} intensity={0} /> */}
            {/* <pointLight position={[-10, -10, -10]} /> */}
            <Selection>
              <EffectComposer multisampling={10} autoClear={false}>
                <Outline
                  blur
                  edgeStrength={100}
                  width={1500}
                />
              </EffectComposer>
              {/* <mesh position={[-39.5, 4.2, -37.5]} rotation={[0, -1.6, 0]} scale={1.5}>
              <Model url="/og_ballroom.glb" scale={1.9} name={"Ballroom"} />
            </mesh> */}<SelectToZoom>

                <mesh position={[-43, 3, -49.9]} rotation={[0, 0.01, 0]} scale={1.5}>
                  <Model url="/src/models/sb_buildings/og_metalcasting.glb" scale={1.9} name={"MetalCasting"} />
                  <Billboard  className="bgb bg-blue-500 rounded-md p-2" follow position={[0, 3, 0]}>
                    <Text   fontSize={1} rotation={[0.5, 12.3, 0]} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%">
                      CHED
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[17, 5.9, -38.5]} rotation={[0, 1.57, 0]} scale={2}>
                  <Model url="/src/models/sb_buildings/og_chineseb.glb" scale={1.9} name={"ChineseB"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[0, 1.5, 0]}>
                    <Text  fontSize={1} rotation={[0.5, -8, 0]} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%">
                      Chinese B
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[-19, 3, -19]} rotation={[0, -0, 0]} scale={0.185}>
                  <Model url="/src/models/sb_buildings/og_techvoc.glb" scale={1.9} name={"TechVoc"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[60, 40, -60]}>
                    <Text  fontSize={10} rotation={[0, -12, 0]} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%">
                      Thecvoc Building
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[-2.6, 0.1, -3.4]} rotation={[0, -6.30, 0]} scale={1.7}>
                  <Model url="/src/models/sb_buildings/og_newadmin.glb" scale={1.12} name={"Admin"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[-9.5, 10, -45]}  >
                    <Text style={{ backgroundColor: 'rgba(0, 0, 255, 0.5)', padding: '0.3em', borderRadius: '0.3em' }} fontSize={1} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%">
                      Admin Building
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[-0.3, 0.27, 2.5]} rotation={[0, 6.28, 0]} scale={1.1}>
                  <Model url="/src/models/sb_buildings/og_yellow.glb" scale={1.9} name={"Yellow"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[0, 11.5, -55]}>
                    <Text  fontSize={1.5} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%">
                      Yellow Building
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[11, 0.49, -108]} rotation={[0, -1.57, 0]} scale={2.3}>
                  <Model url="/src/models/sb_buildings/og_academic.glb" scale={1.9} name={"Academic"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[0, 8, 0]}>
                    <Text  rotation={[0.5, 8, 0]} fontSize={1} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%" > 
                      Academic Building
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[18, 1, -103]} rotation={[0, 1.57, 0]} scale={2.3}>
                  <Model url="/src/models/sb_buildings/og_belmonte.glb" scale={1.9} name={"Belmonte"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[-10, 6, -1]}>
                    <Text  rotation={[0.5, -8, 0]} fontSize={0.8} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%" >
                      Belmonte Building
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[-19.5, 1.24, -109]} rotation={[0, 0, 0]} scale={2.3}>
                  <Model url="/src/models/sb_buildings/og_bautista.glb" scale={2} name={"Bautista"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[-1, 7, 0]} >
                    <Text  fontSize={.8} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%" >
                      Bautista Building
                    </Text>
                  </Billboard>
                </mesh>
                <mesh position={[17.5, 3.7, -26]} rotation={[0, 3.14, 0]}>
                  <Model url="/src/models/sb_buildings/og_multipurpose.glb" scale={1.9} name={"Multipurpose"} />
                  <Billboard  className="bg-blue-500 rounded-md p-2" follow position={[-1, 6, -1]}>
                    <Text  fontSize={1.5} rotation={[1, 28, 0]} outlineColor="#000000" outlineOpacity={1} outlineWidth="20%">
                      Multipurpose Building
                    </Text>
                  </Billboard>
                </mesh>
              </SelectToZoom>
            </Selection>
            <mesh position={[0.5, 0, -4.7]} rotation={[0, 0.01, 0]} scale={1}>
              <Model url="/src/models/others/utility2.glb" scale={1.9} name={"Utility 2"} />
            </mesh>
            <mesh position={[-30, 0, -180]} rotation={[3.170, 0, -3.3]} scale={1}>
              <Model url="/src/models/others/utility.glb" scale={1.9} name={"Utility 1"} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <Model url="/src/models/others/sb_floor2.glb" scale={2} name={"OpenGrounds Flooring"} />
            </mesh>
          </Stage>
        </Bounds>
      </Suspense>
    </Canvas>

  );
}

function SelectToZoom({ children }: SelectToZoomProps) {
  const api = useBounds();
  const { camera } = useThree();

  const handleZoom = (e) => {
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

  const handlePointerMissed = (e) => {
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
