import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

interface ContainerProps {
    name: string;
    manualId?: string;
}

interface Manual {
    id: string;
    name: string;
    manualDesc: string;
    imageUrl: string;
}

const UpdateManual: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const { manualId } = useParams<{ manualId: string }>();
    const [manualName, setManualName] = useState<string>("");
    const [manualDesc, setManualDesc] = useState<string>("");
    const [manualImage, setManualImage] = useState<File | null>(null);
    const [manual, setManual] = useState<Manual | null>(null);

    const ManualManagement = () => {
        history.push("/Mike");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setManualImage(file);
        }
    };

    useEffect(() => {
        const fetchManual = async () => {
            try {
                const manualRef = doc(db, "manual", manualId);
                const manualDoc = await getDoc(manualRef);

                if (manualDoc.exists()) {
                    const manualData = manualDoc.data() as Manual;
                    setManual(manualData);

                    setManualName(manualData.name);
                    setManualDesc(manualData.manualDesc);
                } else {
                    console.error("Manual not found");
                    history.push("/Mike");
                }
            } catch (error) {
                console.error("Error fetching manual: ", error);
            }
        };

        fetchManual();
    }, [manualId, history]);

    const handleUpdateManual = async () => {
        try {
            const now = serverTimestamp();
            let imageUrl = "";
            if (manualImage) {
                const storageRef = ref(storage, `manual-images/${manualId}`);
                const snapshot = await uploadBytes(storageRef, manualImage);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const manualRef = doc(db, "manual", manualId);
            await updateDoc(manualRef, {
                name: manualName,
                manualDesc: manualDesc,
                imageUrl: imageUrl,
                updatedAt: now,
            });

            console.log("Manual updated successfully!");
            history.push("/Mike", toast.success("Manual updated successfully!"));
        } catch (error) {
            console.error("Error updating manual: ", error);
            alert("Error on updating manual.");
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
                                <h1 className="text-4xl font-bold">Update Manual</h1>
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
                                            <th>Manual Name:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Manual Name"
                                                    value={manualName}
                                                    onChange={(e) => setManualName(e.target.value)}
                                                    className="w-full max-w-xs input input-bordered"
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Manual Description:</th>
                                            <td>
                                                <textarea
                                                    value={manualDesc}
                                                    onChange={(e) => setManualDesc(e.target.value)}
                                                    placeholder="Manual Description..."
                                                    className="w-full max-w-xs textarea textarea-bordered textarea-xs"
                                                ></textarea>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Manual Image:</th>
                                            <td>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/png, image/gif"
                                                    onChange={handleImageChange}
                                                    className="w-full max-w-xs file-input"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between mx-5 mt-5 space-x-2">
                                <button className="btn btn-square hover:bg-base-300 " onClick={ManualManagement}>
                                <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                                </button>
                                <button
                                    onClick={handleUpdateManual}
                                    className="float-right btn bg-base-300 hover:bg-emerald-500 hover:text-white"
                                >
                                   <Icon icon="humbleicons:save"className="w-10 h-10" /><span>Save</span>
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

export default UpdateManual;