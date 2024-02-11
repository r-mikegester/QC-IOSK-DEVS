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
    eventId?: string;
}

interface Event {
    id: string;
    name: string;
    eventSource: string;
    eventDesc: string;
    eventPlace: string;
    imageUrl: string;
    startDate: string;
    startTime: string;
}

const UpdateEvent: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const { eventId } = useParams<{ eventId: string }>();
    const [eventName, setEventName] = useState<string>("");
    const [eventSource, setEventSource] = useState<string>("");
    const [eventDesc, setEventDesc] = useState<string>("");
    const [eventPlace, setEventPlace] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [event, setEvent] = useState<Event | null>(null);
    const [eventImage, setEventImage] = useState<File | null>(null);

    const EventManagement = () => {
        history.push("/Events");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEventImage(file);
        }
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventRef = doc(db, "events", eventId);
                const eventDoc = await getDoc(eventRef);

                if (eventDoc.exists()) {
                    const eventData = eventDoc.data() as Event;
                    setEvent(eventData);

                    setEventName(eventData.name);
                    setEventSource(eventData.eventSource);
                    setEventDesc(eventData.eventDesc);
                    setEventPlace(eventData.eventPlace);
                    setStartDate(eventData.startDate);
                    setStartTime(eventData.startTime);
                } else {
                    console.error("Event not found");
                    history.push("/Events");
                }
            } catch (error) {
                console.error("Error fetching event: ", error);
            }
        };

        fetchEvent();
    }, [eventId, history]);

    const handleUpdateEvent = async () => {
        try {
            const now = serverTimestamp();
            let imageUrl = "";
            if (eventImage) {
                const storageRef = ref(storage, `event-images/${eventId}`);
                const snapshot = await uploadBytes(storageRef, eventImage);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const eventRef = doc(db, "events", eventId);
            await updateDoc(eventRef, {
                name: eventName,
                eventSource: eventSource,
                eventDesc: eventDesc,
                eventPlace: eventPlace,
                startDate: startDate,
                startTime: startTime,
                imageUrl: imageUrl,
                updatedAt: now,
            });

            console.log("Event updated successfully!");
            history.push("/Events", toast.success("Event updated successfully!"));
        } catch (error) {
            console.error("Error updating event: ", error);
            alert("Error on updating event.");
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

                                <h1 className="text-4xl font-bold">Update Event</h1>
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
                                                    className="w-full max-w-xs input input-bordered"
                                                />
                                            </td>
                                            <th>Event Place:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Event Place"
                                                    value={eventPlace}
                                                    onChange={(e) => setEventPlace(e.target.value)}
                                                    className="w-full max-w-xs input input-bordered"
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Event Organizer:</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    placeholder="Event Source"
                                                    value={eventSource}
                                                    onChange={(e) => setEventSource(e.target.value)}
                                                    className="w-full max-w-xs input input-bordered"
                                                />
                                            </td>
                                            <th>Organizer Image:</th>
                                            <td>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/png, umage/gif"
                                                    onChange={handleImageChange}
                                                    className="w-full max-w-xs file-input"
                                                />
                                            </td>
                                        </tr>

                                        <tr>

                                        </tr>

                                        <tr>

                                        </tr>

                                        <tr>
                                            <th>Date:</th>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    className="w-full max-w-xs input input-bordered"
                                                />
                                            </td>
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

                                        </tr>

                                        <tr>
                                            <th>Event Description:</th>
                                            <td>
                                                <textarea
                                                    value={eventDesc}
                                                    onChange={(e) => setEventDesc(e.target.value)}
                                                    placeholder="Event Description..."
                                                    className="w-full max-w-xs textarea textarea-bordered textarea-xs"
                                                ></textarea>
                                            </td>
                                            <th>Event Image:</th>
                                            <td>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/png, umage/gif"
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
                                    <button onClick={EventManagement} className="btn btn-square hover:bg-base-300 ">
                                        <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                                    </button>
                                    <button
                                        onClick={handleUpdateEvent}
                                        className="btn bg-base-300"
                                    >
                                        <Icon icon="humbleicons:save" className="w-10 h-10" /><span>Save</span>

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

export default UpdateEvent;