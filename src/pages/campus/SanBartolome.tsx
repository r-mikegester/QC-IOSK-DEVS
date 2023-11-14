import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, Stage, Sky, Gltf } from "@react-three/drei";

interface ModelProps {
  url: string;
  scale: number;
}

function Model(props: ModelProps) {
  const gltf = useLoader(GLTFLoader, props.url);
  const handleClick = () => {
    console.log("Building clicked!");
    document.getElementById('SelectBuilding').showModal()
  };
  return <primitive object={gltf.scene} onClick={handleClick} scale={[props.scale, props.scale, props.scale]} />;
}

const App: React.FC = () => {
  return (
    <Canvas orthographic dpr={[1, 2]} speed={0.1}  shadows camera={{ fov: 75, position: [10, 10, 10], zoom: 10 }} className="bg-gradient-to-tr from-blue-600 to-purple-400" style={{ "position": "absolute" }}>
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
          <Model url="/og_v4.glb"  scale={2} position={1,0,0}/>
          <Model url="/og_v4.glb" scale={2} position={1,1,0}/>
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

export default App;
