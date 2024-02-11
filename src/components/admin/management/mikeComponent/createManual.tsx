import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

interface ContainerProps {
    name: string;
}

const CreateManual: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const [manualName, setManualName] = useState<string>("");
    const [manualDesc, setManualDesc] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const ManualManagement = () => {
        history.push("/Mike");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);
        }
    };

    const handlePreviewClick = () => {
        if (imagePreview) {
            setIsModalOpen(true);
        } else {
            alert("Please select an image first!");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddManual = async () => {
        try {
            const now = serverTimestamp();

            if (image) {
                const storageRef = ref(storage, `manual-images/${image.name}`);
                await uploadBytes(storageRef, image);
                const imageUrl = await getDownloadURL(storageRef);

                await addDoc(collection(db, "manual"), {
                    name: manualName,
                    manualDesc,
                    imageUrl,
                    createdAt: now,
                    updatedAt: now,
                });

                setManualName("");
                setManualDesc("");
                setImage(null);
                setImagePreview(null);

                console.log("Manual added successfully!");
                history.push("/Mike", toast.success("Manual added successfully!"));
            } else {
                console.error("Please select an image");
            }
        } catch (error) {
            console.error("Error adding manual: ", error);
            alert("Error on adding manual.");
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
                                <h1 className="text-4xl font-bold">Create Manual</h1>
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
                                            <td>
                                                {imagePreview && (
                                                    <>
                                                        <button
                                                            onClick={handlePreviewClick}
                                                            className="btn btn-square"
                                                        >
                                                           <Icon icon="akar-icons:eye-open" className="w-10 h-10" />
                                                        </button>
                                                        <Modal
                                                         className="flex items-center justify-center w-screen h-screen space-x-2 bg-black/60"
                                                            isOpen={isModalOpen}
                                                            onRequestClose={closeModal}
                                                        >
                                                            <div className="flex space-x-2">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Image Preview"
                                                                style={{ width: "100%", height: "auto" }}
                                                                className="w-auto h-96 rounded-2xl"
                                                            />
                                                            <button
                                                                onClick={closeModal}
                                                                className="btn btn-square"
                                                            >
                                                                <Icon icon="heroicons:x-mark-16-solid" className="w-10 h-10" />
                                                            </button>
                                                            </div>
                                                        </Modal>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            
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
                                    onClick={handleAddManual}
                                    className="float-right btn bg-base-300 hover:bg-emerald-500 hover:text-white"
                                >
                                     <Icon icon="icon-park-outline:add-three" className="w-10 h-10" /><span>Create</span>
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

export default CreateManual;