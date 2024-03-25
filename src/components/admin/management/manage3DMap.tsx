import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "../../campus/sanBartolome/ModelViewer";
import { GizmoHelper, GizmoViewcube, OrbitControls } from "@react-three/drei";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { db } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

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
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = useMemo<MRT_ColumnDef<Model>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => update3DModel(row.original.id)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => openDeleteConfirmation(row.original.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
      {
        accessorKey: "modelName",
        header: "Model Name",
        size: 150,
      },
      {
        accessorKey: "position",
        header: "Model Position",
        Cell: ({ row }) => {
          const position = row.original.position;
          return (
            <div>
              <p>X: {position[0]}</p>
              <p>Y: {position[1]}</p>
              <p>Z: {position[2]}</p>
            </div>
          );
        },
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: models,
  });

  const create3DModel = () => {
    history.replace("/create3DModel");
  };

  const update3DModel = (modelId: string) => {
    history.replace(`/Update3DModel/${modelId}`);
  };

  const handleModelClick = (modelId: string) => {
    console.log("Clicked model:", modelId);
  };

  const openDeleteConfirmation = (modelId: string) => {
    setSelectedModelId(modelId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedModelId(null);
  };

  const archiveModel = async (model: Model) => {
    try {
      const archiveCollectionRef = collection(db, "3D Objects Archive");

      await addDoc(archiveCollectionRef, model);

      console.log("Model archived successfully!");
    } catch (error) {
      console.error("Error archiving model: ", error);
      alert("Error archiving model.");
    }
  };

  const deleteModel = async () => {
    if (selectedModelId) {
      try {
        const modelToDelete = models.find(
          (model) => model.id === selectedModelId
        );

        if (modelToDelete) {
          await archiveModel(modelToDelete);
        }

        await deleteDoc(doc(db, "3D Objects", selectedModelId));

        const modelsCollection = collection(db, "3D Objects");
        const modelsSnapshot = await getDocs(modelsCollection);
        const modelsData = modelsSnapshot.docs.map((doc) => {
          const modelData = doc.data() as Model;
          return { ...modelData, id: doc.id } as Model;
        });
        setModels(modelsData);

        closeDeleteConfirmation();
        console.log("Model deleted successfully!");
        toast.success("Model deleted successfully!");
      } catch (error) {
        console.error("Error deleting Model: ", error);
        alert("Error on deleting Model.");
      }
    }
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching models:", error);
        setLoading(false);
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

              <br />
              <br />

              {loading ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 justify-evenly">
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                    </div>
                    <hr className="w-full h-2 rounded-full bg-base-300 " />
                    <div className="flex flex-col w-full gap-4">
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>
                    </div>
                  </div>
                </>
              ) : (
                <MaterialReactTable table={table} />
              )}
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
            </div>
          </div>
        </div>
        {/* Delete Confirmation Modal */}
        <Modal
          className="flex items-center justify-center w-screen h-screen bg-black/60"
          isOpen={selectedModelId !== null}
          onRequestClose={closeDeleteConfirmation}
          ariaHideApp={false}
        >
          <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
            <p className="text-3xl text-center">
              Are you sure you want to delete this announcement?
            </p>
            <div className="flex justify-center mt-6 space-x-3">
              <button
                onClick={deleteModel}
                className="text-white btn btn-primary hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="btn bg-base-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </IonContent>
    </IonPage>
  );
};

export default SBMapSceneManagement;
