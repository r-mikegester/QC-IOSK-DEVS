import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Icon } from '@iconify/react';

interface ContainerProps {
    name: string;
    eventId?: string;
}

interface Event {
    id: string;
    name: string;
    eventDesc: string;
    eventPlace: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

const UpdateEvent: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const { eventId } = useParams<{ eventId: string }>();
    const [eventName, setEventName] = useState<string>("");
    const [eventDesc, setEventDesc] = useState<string>("");
    const [eventPlace, setEventPlace] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
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
                    setEventDesc(eventData.eventDesc);
                    setEventPlace(eventData.eventPlace);
                    setStartDate(eventData.startDate);
                    setEndDate(eventData.endDate);
                    setStartTime(eventData.startTime);
                    setEndTime(eventData.endTime);
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
            let imageUrl = "";
            if (eventImage) {
                const storageRef = ref(storage, `event-images/${eventId}`);
                const snapshot = await uploadBytes(storageRef, eventImage);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const eventRef = doc(db, "events", eventId);
            await updateDoc(eventRef, {
                name: eventName,
                eventDesc: eventDesc,
                eventPlace: eventPlace,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                imageUrl: imageUrl,
            });

            console.log("Event updated successfully!");
            history.push("/Events");
        } catch (error) {
            console.error("Error updating event: ", error);
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
                                <h1 className="font-bold text-4xl">Edit Event</h1>

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

                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <button
                                                    onClick={handleUpdateEvent}
                                                    className="btn btn-primary"
                                                >
                                                    Update Event
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

export default UpdateEvent;
