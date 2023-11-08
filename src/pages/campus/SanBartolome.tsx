import { Canvas, useThree } from "@react-three/fiber";
import React, { useRef } from 'react';
import { PresentationControls, OrbitControls, useGLTF, Stage, Sky } from "@react-three/drei";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


interface ModelProps {
  scale: number;
}

function Model(props: ModelProps) {
  const { scene } = useGLTF("/og_v3.glb");

  return <primitive object={scene} {...props} />
}

const Controls: React.FC = () => {
  const controls = useRef<typeof OrbitControls>();
  const { camera, gl } = useThree();

  return (
    <PresentationControls speed={1.5} global zoom={10} polar={[-0.10, Math.PI / 4]}>
      <OrbitControls autoRotate args={[camera, gl.domElement]} />
    </PresentationControls>
  );
};

const App: React.FC = () => {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 75 }} className="bg-gradient-to-tr from-blue-600 to-purple-400" style={{ "position": "absolute" }}>
      {/* <color attach="background"  args={["#64abbf"]} /> */}
      <Controls />
      <Stage environment={"warehouse"} adjustCamera>
        <Model scale={0.01} />
      </Stage>
      <Sky
        distance={450000} // Camera distance (default=450000)
        sunPosition={[0, 20, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
        inclination={1} // Sun elevation angle from 0 to 1 (default=0)
        azimuth={1} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
       
      />
    </Canvas>
  );
}

export default App;
