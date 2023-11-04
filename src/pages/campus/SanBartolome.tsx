import { Canvas, useThree } from "@react-three/fiber";
import React, { useRef } from 'react';
import { PresentationControls, OrbitControls, useGLTF, Stage } from "@react-three/drei";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


interface ModelProps {
  scale: number;
}

function Model(props: ModelProps) {
  const { scene } = useGLTF("/og.glb");
  
  return <primitive object={scene} {...props} />
}

const Controls: React.FC = () => {
 const controls = useRef<typeof OrbitControls>();
  const { camera, gl } = useThree();

  return (
    <PresentationControls speed={1.5} global zoom={0.2} polar={[-0.10, Math.PI / 4]}>
      <OrbitControls autoRotate args={[camera, gl.domElement]} />
    </PresentationControls>
  );
};

const App: React.FC = () => {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 75 }} style={{"position": "absolute"}}>
      <color attach="background"  args={["#64abbf"]} />
      <Controls /> 
      <Stage environment={"warehouse"}>
        <Model scale={0.01} />
      </Stage>
    </Canvas>
  );
}

export default App;
