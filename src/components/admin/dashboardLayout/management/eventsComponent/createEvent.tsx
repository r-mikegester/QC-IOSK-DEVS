import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { Icon } from '@iconify/react';
interface ContainerProps {
    name: string;
}

const CreateEvent: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const [eventName, setEventName] = useState<string>("");
    const [eventDesc, setEventDesc] = useState<string>("");
    const [eventPlace, setEventPlace] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const EventManagement = () => {
        history.push("/Events");
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

    const handleAddEvent = async () => {
        try {
            if (image) {
                const storageRef = ref(storage, `event-images/${image.name}`);
                await uploadBytes(storageRef, image);
                const imageUrl = await getDownloadURL(storageRef);

                await addDoc(collection(db, "events"), {
                    name: eventName,
                    eventDesc,
                    eventPlace,
                    imageUrl,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                });

                console.log("Event added successfully!");
                setEventName("");
                setEventDesc("");
                setEventPlace("");
                setImage(null);
                setImagePreview(null);
                setStartDate("");
                setEndDate("");
                setStartTime("");
                setEndTime("");

                toast.success("Event added successfully!");
                history.push("/Events");
            } else {
                console.error("Please select an image");
            }
        } catch (error) {
            console.error("Error adding event: ", error);
            toast.error("Error adding event. Please try again.");
        }
    };
    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    <AdminSideBar name={""} />
                    <AdminHeader name={""} />

                    <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
                        <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
                            <div className="flex items-center justify-between">
                                <h1 className="font-bold text-4xl">Create Event</h1>

                                <button onClick={EventManagement} className="btn btn-square mr-6 tooltip flex justify-center"  >
                                    <Icon icon="typcn:arrow-back-outline" className="w-10 h-10" />

                                </button>
                                
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
                                            <th>Event Name:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Event Name"
                                                    value={eventName}
                                                    onChange={(e) => setEventName(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                            <th>Event Place:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Event Place"
                                                    value={eventPlace}
                                                    onChange={(e) => setEventPlace(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Event Description:</th>
                                            <td>
                                                <textarea
                                                    value={eventDesc}
                                                    onChange={(e) => setEventDesc(e.target.value)}
                                                    placeholder="Event Description..."
                                                    className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                                                ></textarea>
                                            </td>
                                        </tr>

                                        <tr>
                                            
                                        </tr>

                                        <tr>
                                            <th>Start Date:</th>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                            <th>End Date:</th>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                        </tr>
                                        <tr>

                                        </tr>
                                        <tr>
                                            <th>From:</th>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={startTime}
                                                    onChange={(e) => setStartTime(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                            <th>To:</th>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={endTime}
                                                    onChange={(e) => setEndTime(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                        </tr>
                                        <tr>

                                        </tr>

                                        <tr>
                                            <th>Event Image:</th>
                                            <td>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="file-input w-full max-w-xs"
                                                />
                                            </td>
                                            <td colSpan={2}>
                                                {imagePreview && (
                                                    <>
                                                        <button
                                                            onClick={handlePreviewClick}
                                                            className="btn btn-secondary"
                                                        >
                                                            Preview Image
                                                        </button>
                                                        <Modal className=" w-screen h-screen flex justify-center items-center "
                                                            isOpen={isModalOpen}
                                                            onRequestClose={closeModal}
                                                        >
                                                            <div className="flex flex-col">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Image Preview"
                                                                className="w-96 h-96 rounded-t-3xl"
                                                            />
                                                            <button
                                                                onClick={closeModal}
                                                                className="btn rounded-b-3xl rounded-t-none bg-base-300 hover:bg-base-100"
                                                            >
                                                                Close
                                                            </button>
                                                            </div>
                                                        </Modal>
                                                    </>
                                                )}
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <button
                                                    onClick={handleAddEvent}
                                                    className="btn btn-primary"
                                                >
                                                    Add Event
                                                </button>
                                            </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CreateEvent;