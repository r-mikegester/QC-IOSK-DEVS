import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState, Suspense} from 'react';
import { PresentationControls, OrbitControls, useGLTF, Stage, Sky, meshBounds, Bounds } from "@react-three/drei";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


async function loadBuilding() {
  const loader = new GLTFLoader();
  }
  
  export { loadBuilding };

interface ModelProps {
  scale: number;
}

function Model(props: ModelProps) {
  const ref = useRef()
  const { scene } = useGLTF("/og_v4.glb");
  const [hovered, hover] = useState(null)
  console.log(hovered)
  // useFrame((state: any, delta: any) => (ref.current.rotation.x = ref.current.rotation.y += delta))
   return <primitive object={scene} {...props} />

  
}


const App: React.FC<ContainerProps> = ({ name }) => {
  return (
    
    <Canvas orthographic dpr={[1, 2]} shadows camera={{ fov: 75, position: [10,10,10], zoom: 10 }} className="bg-gradient-to-tr from-blue-600 to-purple-400" style={{ "position": "absolute" }}>
      {/* <color attach="background"  args={["#64abbf"]} /> */}
      <OrbitControls
        makeDefault
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        enableZoom={true}
        enablePan={true}
        zoomSpeed={0.3}
      />
       {/* <gridHelper args={[1000, 200, '#151515', '#020202']} position={[0, -1, 0]} /> */}
      <Suspense fallback={null}>
  {/* <Selection> */}
  <mesh onClick={(e) => console.log('click')} raycast={meshBounds} >
    

       <Stage environment={"warehouse"} adjustCamera>
         <Model scale={0.01} />
       
        
       </Stage>
       <Sky
         distance={450000} // Camera distance (default=450000)
         sunPosition={[0, 20, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
         inclination={1} // Sun elevation angle from 0 to 1 (default=0)
         azimuth={1} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        
       />
    </mesh>
  {/* </Selection> */}
      </Suspense>
    </Canvas>
  );
}

export default App;