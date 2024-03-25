import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
}

const Create3DModel: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [modelName, setModelName] = useState<string>("");
  const [modelPath, setModelPath] = useState<File | null>(null);
  const [position, setPosition] = useState<string[]>(["0", "0", "0"]);
  const [textPosition, setTextPosition] = useState<string[]>(["0", "3", "0"]);

  const SBMapSceneManagement = () => {
    history.push("/SBMapScene");
  };

  const handleAddModel = async () => {
    try {
      const now = serverTimestamp();

      if (!modelPath) {
        toast.error("Please select a GLB file.");
        return;
      }

      const glbRef = storage.ref().child(`glbFiles/${modelPath.name}`);
      await glbRef.put(modelPath);
      const glbUrl = await glbRef.getDownloadURL();

      await addDoc(collection(db, "3D Objects"), {
        modelName: modelName,
        modelPath: glbUrl,
        position: position,
        textPosition: textPosition,
        createdAt: now,
      });

      setModelName("");
      setModelPath(null);

      console.log("3D Model added successfully!");
      toast.success("3D Model added successfully!");
      history.push("/SBMapScene");
    } catch (error) {
      console.error("Error adding 3D Model: ", error);
      alert("Error on adding 3D Model.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center space-x-2">
                <h1 className="text-4xl font-bold">Create 3D Model</h1>
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
                      <th>3D Model Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Announcement Name"
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>GLB File:</th>
                      <td>
                        <input
                          type="file"
                          accept=".glb"
                          onChange={(e) =>
                            setModelPath(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Position:</th>
                      <td>
                        <div className="flex">
                          {["X", "Y", "Z"].map((axis, index) => (
                            <div key={axis} className="flex flex-col mr-4">
                              <label>{axis}:</label>
                              <input
                                type="text"
                                value={position[index]}
                                onChange={(e) => {
                                  const updatedPosition = [...position];
                                  updatedPosition[index] = e.target.value;
                                  setPosition(updatedPosition);
                                }}
                                className="w-full max-w-xs input input-bordered"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Text Position:</th>
                      <td>
                        <div className="flex">
                          {["X", "Y", "Z"].map((axis, index) => (
                            <div key={axis} className="flex flex-col mr-4">
                              <label>{axis}:</label>
                              <input
                                type="text"
                                value={textPosition[index]}
                                onChange={(e) => {
                                  const updatedTextPosition = [...textPosition];
                                  updatedTextPosition[index] = e.target.value;
                                  setTextPosition(updatedTextPosition);
                                }}
                                className="w-full max-w-xs input input-bordered"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-between mx-5 mt-5">
                  <button
                    onClick={SBMapSceneManagement}
                    className="btn btn-square hover:bg-base-300"
                  >
                    <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                  </button>
                  <button onClick={handleAddModel} className="float-right btn">
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                    <span>Create</span>
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

export default Create3DModel;
