import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "../../campus/sanBartolome/ModelViewer";
import { storage } from "../../utils/firebase"; // Assuming you have initialized Firebase storage
import {
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  OrbitControls,
} from "@react-three/drei";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface ContainerProps {
  name: string;
}

interface Model {
  id: string;
  modelName: string;
  modelPath: string;
  position: [number, number, number];
  textPosition?: [number, number, number];
}

const Batasan: React.FC<ContainerProps> = ({ name }) => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const db = getFirestore();
        const modelsCollection = collection(db, "3D Objects");
        const modelsSnapshot = await getDocs(modelsCollection);
        const modelsData = modelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          modelName: doc.data().modelName,
          modelPath: doc.data().modelPath,
          position: doc.data().position,
          textPosition: doc.data().textPosition,
        }));
        setModels(modelsData);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
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
          <GizmoHelper>
            <GizmoViewport labelColor="white" axisHeadScale={1.5} />
          </GizmoHelper>

          <ambientLight intensity={2} />
          {models.map((model) => (
            <ModelViewer
              key={model.id}
              name={model.modelName}
              modelPath={model.modelPath}
              position={model.position}
              textPosition={model.textPosition}
            />
          ))}

          <gridHelper args={[30, 30, 0xff0000, "teal"]} />
        </Canvas>
      </IonContent>
    </IonPage>
  );
};

export default Batasan;
