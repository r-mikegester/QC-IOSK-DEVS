import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "../../campus/sanBartolome/ModelViewer";
import Plane from "../../../assets/models/Plane.glb";
import cubePink from "../../../assets/models/cubePink.glb";
import cubeBlue from "../../../assets/models/cubeBlue.glb";
import { OrbitControls, TransformControls } from "@react-three/drei";

interface ContainerProps {
  name: string;
}

const SBMapSceneManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);

  const create3DModel = () => {
    history.replace("/create3DModel");
  };

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
                <button
                  onClick={() => setOrbitControlsEnabled(!orbitControlsEnabled)}
                >
                  {orbitControlsEnabled
                    ? "Disable Orbit Controls"
                    : "Enable Orbit Controls"}
                </button>
              </div>
              <Canvas
                camera={{
                  fov: 50,
                  position: [30, 30, 30],
                }}
                style={{ position: "absolute" }}
              >
                {orbitControlsEnabled && (
                  <OrbitControls
                    minPolarAngle={Math.PI / 25}
                    maxPolarAngle={Math.PI / 2}
                    enableZoom
                  />
                )}
                <ambientLight intensity={2} />
                <ModelViewer modelPath={Plane} position={[0, 0, 0]} />

                <group>
                  <TransformControls>
                    <ModelViewer
                      modelPath={cubePink}
                      position={[0, 0, 0]}
                      onClick={() => setSelectedObject("blue")}
                    />
                  </TransformControls>
                </group>

                <group position={[5, 0, 0]}>
                  <TransformControls>
                    <ModelViewer
                      modelPath={cubeBlue}
                      position={[5, 0, 0]}
                      onClick={() => setSelectedObject("pink")}
                    />
                  </TransformControls>
                </group>
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
