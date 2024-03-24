import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "../../campus/sanBartolome/ModelViewer";
import { GizmoHelper, GizmoViewcube, OrbitControls } from "@react-three/drei";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { GridHelper } from "three";

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

const SBMapSceneManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [models, setModels] = useState<Model[]>([]);

  const create3DModel = () => {
    history.replace("/create3DModel");
  };

  const handleModelClick = (modelId: string) => {
    console.log("Clicked model:", modelId);
  };

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
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-full p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">3D Map Management</h1>
                <button
                  onClick={create3DModel}
                  className="btn btn-square hover:bg-emerald-500 hover:text-white"
                >
                  Create 3D Model
                </button>
              </div>
              <Canvas
                camera={{
                  fov: 50,
                  position: [30, 30, 30],
                }}
                style={{ position: "absolute" }}
              >
                <OrbitControls
                  makeDefault
                  minPolarAngle={Math.PI / 25}
                  maxPolarAngle={Math.PI / 2}
                  enableZoom
                />
                <GizmoHelper>
                  <GizmoViewcube />
                </GizmoHelper>

                <ambientLight intensity={2} />

                {models.map((model) => (
                  <ModelViewer
                    key={model.id}
                    name={model.modelName}
                    modelPath={model.modelPath}
                    position={model.position}
                    textPosition={model.textPosition}
                    onClick={() => handleModelClick(model.id)}
                  />
                ))}
                <gridHelper args={[30, 30, 0xff0000, "teal"]} />
              </Canvas>
              <br />
              <br />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SBMapSceneManagement;
