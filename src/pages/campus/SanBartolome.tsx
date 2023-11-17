import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef, useState, ReactNode } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Stage, Bounds, useBounds, Cloud } from "@react-three/drei";
import { Selection, EffectComposer, Outline, Select } from "@react-three/postprocessing";
interface ModelProps {
  url: string;
  scale: number;
  name: string;
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
  const handleClick = () => {
    console.log("Building clicked!");
    const dialogElement = document.getElementById('SelectBuilding') as HTMLDialogElement | null;
    if (dialogElement) {
      dialogElement.showModal(); // Ensure 'SelectBuilding' is an HTMLDialogElement or an element that supports showModal
    }
  };
  return (<Select enabled={hovered}>
    <primitive
      object={gltf.scene}
      ref={ref}
      {...props}
      onClick={handleClick}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    />
  </Select>
  );


}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  return (
    <Canvas frameloop="demand" orthographic dpr={[1, 2]} camera={{ fov: 75, position: [10, 10, 10], zoom: 10 }} className="bg-gradient-to-tr from-sky-400 to-sky-900" style={{ "position": "absolute" }}>

      <OrbitControls
        minAzimuthAngle={undefined} // Set as undefined
        maxAzimuthAngle={Math.PI / 0} // Assign numeric value
        minPolarAngle={Math.PI / 3} // Assign numeric value
        maxPolarAngle={Math.PI / 6} // Assign numeric value
        enableZoom={true}
        enablePan={true}
        zoomSpeed={3} // Set the zoom speed (numeric value)
        autoRotate={true} // Enable auto rotation
        autoRotateSpeed={0.4} // Set the auto rotation speed (numeric value)
        minZoom={8} // Set the minimum allowed zoom (numeric value)
        maxZoom={60} // Set the maximum allowed zoom (numeric value)
      />
      <Suspense fallback={null}>
        <Cloud position={[-10, 30, 0]} />
        <Cloud position={[-30, 20, 50]} />
        <Cloud position={[-30, 20, -20]} />
        <Cloud position={[40, 30, 0]} />
        <Cloud position={[10, 30, -50]} />
        <Bounds fit clip observe margin={1.2}>
          <Stage environment={"warehouse"} adjustCamera>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Selection>
              <EffectComposer multisampling={10} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor={0xffffff}
                  edgeStrength={500}
                  width={1500}
                />
              </EffectComposer>
              {/* <mesh position={[-39.5, 4.2, -37.5]} rotation={[0, -1.6, 0]} scale={1.5}>
              <Model url="/og_ballroom.glb" scale={1.9} name={"Ballroom Building"} />
            </mesh> */}<SelectToZoom>
                <mesh position={[-42.8, 3, -49.9]} rotation={[0, 0.01, 0]} scale={1.7}>
                  <Model url="/og_metalcasting.glb" scale={1.9} name={"MetalCasting Building"} />
                </mesh>
                <mesh position={[17, 5.9, -38.5]} rotation={[0, 1.57, 0]} scale={2}>
                  <Model url="/og_chineseb.glb" scale={1.9} name={"ChineseB Building"} />
                </mesh>
                <mesh position={[-19, 3, -19]} rotation={[0, -0, 0]} scale={0.185}>
                  <Model url="/og_techvoc.glb" scale={1.9} name={"TechVoc Building"} />
                </mesh>
                <mesh position={[-23, 1.2, -29.2]} rotation={[0, -1.59, 0]} scale={2}>
                  <Model url="/og_admin.glb" scale={1.9} name={"Admin Building"} />
                </mesh>
                <mesh position={[-0.2, 0.27, -2.9]} rotation={[0, 6.28, 0]} scale={1}>
                  <Model url="/og_simon.glb" scale={1.9} name={"Yellow Building"} />
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
              <Model url="/og_flooring.glb" scale={2} name={"OpenGrounds Flooring"} />
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
  function SelectToZoom({ children }: SelectToZoomProps) {
    const api = useBounds();
    return (
      <group
        onClick={(e) => (
          e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
        )}
        onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
      >
        {children}
      </group>
    );
  }

}

export default SanBartolome;
