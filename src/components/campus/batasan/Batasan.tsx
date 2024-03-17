import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "../../campus/sanBartolome/ModelViewer";
import { storage } from "../../utils/firebase"; // Assuming you have initialized Firebase storage
import { OrbitControls } from "@react-three/drei";

interface ContainerProps {
  name: string;
}

const Batasan: React.FC<ContainerProps> = ({ name }) => {
  const [glbUrl, setGlbUrl] = useState<string | null>(null); // Initialize with null

  useEffect(() => {
    const fetchGlbFile = async () => {
      try {
        // Replace "glbFiles/Plane.glb" with the actual path to your uploaded GLB file
        const glbRef = storage.ref().child("glbFiles/Plane.glb");

        const url = await glbRef.getDownloadURL();
        setGlbUrl(url);
      } catch (error) {
        console.error("Error fetching GLB file:", error);
      }
    };

    fetchGlbFile();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-black">3D Map Management</h1>
        </div>
        <Canvas
          camera={{
            fov: 50,
            position: [30, 30, 30],
          }}
          style={{ position: "absolute" }}
        >
          <OrbitControls
            minPolarAngle={Math.PI / 25}
            maxPolarAngle={Math.PI / 2}
            enableZoom
          />

          <ambientLight intensity={2} />
          {glbUrl && <ModelViewer modelPath={glbUrl} position={[0, 0, 0]} />}

          {/* Add other models if needed */}
        </Canvas>
      </IonContent>
    </IonPage>
  );
};

export default Batasan;
