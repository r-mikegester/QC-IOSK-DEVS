import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useRef, useState, ReactNode } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Stage, Bounds, useBounds, Cloud } from "@react-three/drei";
import { Selection, EffectComposer, Outline, Select } from "@react-three/postprocessing";
import { Object3D, Object3DEventMap, Box3 } from "three";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";
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
          <primitive
            object={gltf.scene}
            ref={ref}
            {...props}
            onClick={handleClick}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
          />
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
      className="bg-gradient-to-tr from-sky-400 to-sky-900"
      style={{ "position": "absolute" }}>

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
          <Model url="/clouds.glb" scale={1.9} name={"clouds"} />
        </mesh>
        <mesh position={[12.8, -20, 9.9]} rotation={[0, 9, 20]} scale={1.7}>
          <Model url="/clouds2.glb" scale={1.9} name={"clouds2"} />
        </mesh>
        <mesh position={[-35.8, -10, 9.9]} rotation={[0, 6.5, 0]} scale={1.7}>
          <Model url="/clouds3.glb" scale={1.9} name={"clouds3"} />
        </mesh>
        <Bounds fit clip observe margin={1.2}>
          <Stage environment={"city"} adjustCamera shadows contactShadow>
            {/* <ambientLight intensity={0.5} /> */}
            <spotLight position={[10, 10, 100]} angle={0.15} penumbra={1} intensity={0} />
            {/* <pointLight position={[-10, -10, -10]} /> */}
            <Selection>
              <EffectComposer multisampling={10} autoClear={false}>
                <Outline
                  blur
                  edgeStrength={100}
                  width={1000}
                />
              </EffectComposer>
              {/* <mesh position={[-39.5, 4.2, -37.5]} rotation={[0, -1.6, 0]} scale={1.5}>
              <Model url="/og_ballroom.glb" scale={1.9} name={"Ballroom Building"} />
            </mesh> */}<SelectToZoom>

                <mesh position={[-43, 3, -49.9]} rotation={[0, 0.01, 0]} scale={1.5}>
                  <Model url="/og_metalcasting.glb" scale={1.9} name={"MetalCasting Building"} />
                </mesh>
                <mesh position={[17, 5.9, -38.5]} rotation={[0, 1.57, 0]} scale={2}>
                  <Model url="/og_chineseb.glb" scale={1.9} name={"ChineseB Building"} />
                </mesh>
                <mesh position={[-19, 3, -19]} rotation={[0, -0, 0]} scale={0.185}>
                  <Model url="/og_techvoc.glb" scale={1.9} name={"TechVoc Building"} />
                </mesh>
                <mesh position={[-23, 1.2, -38]} rotation={[0, -1.59, 0]} scale={1.7}>
                  <Model url="/og_admin.glb" scale={1.9} name={"Admin Building"} />
                </mesh>
                <mesh position={[-0.2, 0.27, -2.9]} rotation={[0, 6.28, 0]} scale={1}>
                  <Model url="/newyellow.glb" scale={1.9} name={"Yellow Building"} />
                </mesh>
                <mesh position={[11, 0.49, -108]} rotation={[0, -1.57, 0]} scale={2.3}>
                  <Model url="/og_academic.glb" scale={1.9} name={"Academic Building"} />
                </mesh>
                <mesh position={[18, 1, -103]} rotation={[0, 1.57, 0]} scale={2.3}>
                  <Model url="/og_belmonte.glb" scale={1.9} name={"Belmonte Building"} />
                </mesh>
                <mesh position={[-19.5, 1.24, -109]} rotation={[0, 0, 0]} scale={2.3}>
                  <Model url="/og_bautista.glb" scale={2} name={"Bautista Building"} />
                </mesh>
                <mesh position={[17.5, 3.7, -26]} rotation={[0, 3.14, 0]}>
                  <Model url="/og_multipurpose.glb" scale={1.9} name={"Multipurpose Building"} />
                </mesh>
              </SelectToZoom>
            </Selection>
            <mesh position={[0, 0, 0]}>
              <Model url="/sb_floor2.glb" scale={2} name={"OpenGrounds Flooring"} />
            </mesh>
          </Stage>
        </Bounds>
        {/* <Sky
          distance={450000}
          sunPosition={[0, 20, 0]}
          inclination={1}
          azimuth={1}
        /> */}
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
