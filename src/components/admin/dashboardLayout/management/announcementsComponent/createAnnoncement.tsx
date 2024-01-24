import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory } from "react-router";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContainerProps {
    name: string;
}

const CreateAnnouncement: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const [announcementName, setAnnouncementName] = useState<string>("");
    const [announcementSource, setAnnouncementSource] = useState<string>("");
    const [announcementDesc, setAnnouncementDesc] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");

    const AnnouncementManagement = () => {
        history.push("/Announcements");
    };

    const handleAddAnnouncement = async () => {
        try {
            const now = serverTimestamp();

            await addDoc(collection(db, "announcements"), {
                name: announcementName,
                announcementSource,
                announcementDesc,
                startDate,
                startTime,
                createdAt: now,
                updatedAt: now,
            });

            setAnnouncementName("");
            setAnnouncementSource("");
            setAnnouncementDesc("");
            setStartDate("");
            setStartTime("");

            console.log("Announcement added successfully!");
            history.push(
                "/Announcements",
                toast.success("Announcement added successfully!")
            );
            history.push("/Announcements");
        } catch (error) {
            console.error("Error adding announcement: ", error);
            alert("Error on adding announcement.");
        }
    };
    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    <AdminSideBar name={""} />
                    <AdminHeader name={""} />

                    <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
                        <div className="w-full h-full grid-cols-4 grid-rows-5 gap-5 p-10 bg-base-100 rounded-tl-3xl">
                            <h1>Create Announcement</h1>
                            <button
                                onClick={AnnouncementManagement}
                                className="btn btn-primary"
                            >
                                Back
                            </button>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Announcement Name:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Announcement Name"
                                                    value={announcementName}
                                                    onChange={(e) => setAnnouncementName(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Announcement Source:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Announcement Source"
                                                    value={announcementSource}
                                                    onChange={(e) =>
                                                        setAnnouncementSource(e.target.value)
                                                    }
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Announcement Description:</th>
                                            <td>
                                                <textarea
                                                    value={announcementDesc}
                                                    placeholder="Announcement Description..."
                                                    onChange={(e) => setAnnouncementDesc(e.target.value)}
                                                    className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                                                ></textarea>
                                            </td>
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
                                        </tr>
                                        <tr>
                                            <th>Time:</th>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={startTime}
                                                    onChange={(e) => setStartTime(e.target.value)}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2}>
                                                <button
                                                    onClick={handleAddAnnouncement}
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

export default CreateAnnouncement;