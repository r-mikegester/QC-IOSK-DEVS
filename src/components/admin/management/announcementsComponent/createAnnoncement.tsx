import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory } from "react-router";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

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
                        <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
                            <div className="flex items-center space-x-2">

                                <h1 className="text-4xl font-bold">Create Announcement</h1>
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
                                            <th>Announcement Name:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Announcement Name"
                                                    value={announcementName}
                                                    onChange={(e) => setAnnouncementName(e.target.value)}
                                                    className="w-full max-w-xs input input-bordered"
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
                                                    className="w-full max-w-xs input input-bordered"
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
                                                    className="w-full max-w-xs textarea textarea-bordered textarea-xs"
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
                                                    className="w-full max-w-xs input input-bordered"
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
                                                    className="w-full max-w-xs input input-bordered"
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2}>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between mx-5 mt-5">
                                    <button
                                        onClick={AnnouncementManagement}
                                        className="btn btn-square hover:bg-base-300"
                                    >
                                        <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                                    </button>
                                    <button
                                        onClick={handleAddAnnouncement}
                                        className="float-right btn"
                                    >
                                        <Icon icon="icon-park-outline:add-three"  className="w-10 h-10" /><span>Create</span>
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

export default CreateAnnouncement;