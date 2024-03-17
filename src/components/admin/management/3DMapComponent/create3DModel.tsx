import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../utils/firebase"; // Assuming you have initialized Firebase storage
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
}

const Create3DModel: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [modelName, setModelName] = useState("");
  const [glbFile, setGlbFile] = useState<File | null>(null);

  const SBMapSceneManagement = () => {
    history.push("/SBMapScene");
  };

  const handleAddModel = async () => {
    try {
      const now = serverTimestamp();

      // Check if GLB file exists
      if (!glbFile) {
        toast.error("Please select a GLB file.");
        return;
      }

      // Upload GLB file to Firebase Storage
      const glbRef = storage.ref().child(`glbFiles/${glbFile.name}`);
      await glbRef.put(glbFile);
      const glbUrl = await glbRef.getDownloadURL();

      // Add document to Firestore
      await addDoc(collection(db, "3D Objects"), {
        name: modelName,
        glbUrl: glbUrl,
        createdAt: now,
        updatedAt: now,
      });

      setModelName("");
      setGlbFile(null);

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
                            setGlbFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}></td>
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
