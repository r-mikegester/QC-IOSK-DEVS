import { Canvas, useLoader, extend } from "@react-three/fiber";
import React, { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Stage, Sky, Gltf } from "@react-three/drei";
interface ModelProps {
  url: string;
  scale: number;
  name: string;
}
interface ContainerProps {
  name: string;
}

function Model(props: ModelProps) {
  const gltf = useLoader(GLTFLoader, props.url);
  const handleClick = () => {
    console.log("Building clicked!");
    const element = document.getElementById('SelectBuilding');
    if (element) {
      //element.showModal();
    }
  };
  return <primitive object={gltf.scene} onClick={handleClick} scale={[props.scale, props.scale, props.scale]} />;
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  return (
    <Canvas frameloop="demand" orthographic dpr={[1, 2]} shadows camera={{ fov: 75, position: [10, 10, 10], zoom: 10 }} className="bg-gradient-to-tr from-blue-600 to-purple-400" style={{ "position": "absolute" }}>
      
      <OrbitControls
        makeDefault
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 0}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 6}
        enableZoom={true}
        enablePan={true}
        zoomSpeed={3}
        autoRotate
        autoRotateSpeed={0.4}
        
      />
      <Suspense fallback={null}>
        <Stage environment={"warehouse"} adjustCamera>
          <Model url="/og_v4.glb" scale={2} name={"SanBartolome"}/>
        </Stage>
        <Sky
          distance={450000}
          sunPosition={[0, 20, 0]}
          inclination={1}
          azimuth={1}
        />
      </Suspense>
    </Canvas>
    
  );
}

export default SanBartolome;
