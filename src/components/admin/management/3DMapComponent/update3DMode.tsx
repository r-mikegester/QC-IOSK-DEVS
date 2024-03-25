import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

interface ContainerProps {
  name: string;
  modelId?: string;
}

interface Model {
  id: string;
  modelName: string;
  modelPath: string;
  position: string;
  textPosition: string;
}

const Update3DModel: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { modelId } = useParams<{ modelId: string }>();
  const [modelName, setModelName] = useState<string>("");
  const [modelPath, setModelPath] = useState<File | null>(null);
  const [position, setPosition] = useState<string>("");
  const [textPosition, setTextPosition] = useState<string>("");
  const [models, setModels] = useState<Model | null>(null);

  const ModelManagement = () => {
    history.push("/SBMapScene");
  };

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const modelRef = doc(db, "3D Objects", modelId);
        const modelDoc = await getDoc(modelRef);

        if (modelDoc.exists()) {
          const modelData = modelDoc.data() as Model;
          setModels(modelData);

          setModelName(modelData.modelName);
          //   setPosition(modelData.position);
          //   setTextPosition(modelData.textPosition);
        } else {
          console.error("Model not found");
          history.push("/SBMapScene");
        }
      } catch (error) {
        console.error("Error fetching model: ", error);
      }
    };

    fetchModel();
  }, [modelId, history]);

  const handleUpdateModel = async () => {
    try {
      const now = serverTimestamp();
      let modelUrl = "";
      if (modelPath) {
        const storageRef = ref(storage, `glbFiles/${modelId}`);
        const snapshot = await uploadBytes(storageRef, modelPath);
        modelUrl = await getDownloadURL(snapshot.ref);
      }

      const modelRef = doc(db, "3D Objects", modelId);
      await updateDoc(modelRef, {
        modelName: modelName,
        // modelPath: modelPath,
        // position: position,
        // textPosition: textPosition,
      });

      console.log("Model updated successfully!");
      toast.success("Model updated successfully!");
      history.push("/SBMapScene");
    } catch (error) {
      console.error("Error updating model: ", error);
      alert("Error on updating model.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-screen grid-cols-4 grid-rows-5 gap-5 p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center space-x-2">
                <h1 className="text-4xl font-bold">Update Model</h1>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Model Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Manual Name"
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-between mx-5 mt-5 space-x-2">
                  <button
                    className="btn btn-square hover:bg-base-300 "
                    onClick={ModelManagement}
                  >
                    <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleUpdateModel}
                    className="float-right btn bg-base-300 hover:bg-emerald-500 hover:text-white"
                  >
                    <Icon icon="humbleicons:save" className="w-10 h-10" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Update3DModel;
