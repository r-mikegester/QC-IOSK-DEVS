import React, { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

Modal.setAppElement("#root");

interface ContainerProps {
    name: string;
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

const EventsArchive: React.FC<ContainerProps> = ({ name }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteAllConfirmation, setDeleteAllConfirmation] =
        useState<boolean>(false);
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<
        string | null
    >(null);
    const [restoreConfirmationId, setRestoreConfirmationId] = useState<
        string | null
    >(null);

    const openImagePreview = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };
    const closeImagePreview = () => {
        setSelectedImage(null);
    };

    const openDeleteConfirmation = (eventId: string) => {
        setDeleteConfirmationId(eventId);
    };
    const closeDeleteConfirmation = () => {
        setDeleteConfirmationId(null);
    };
    const openDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(true);
    };
    const closeDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(false);
    };
    const openRestoreConfirmation = (eventId: string) => {
        setRestoreConfirmationId(eventId);
    };
    const closeRestoreConfirmation = () => {
        setRestoreConfirmationId(null);
    };

    const deleteArchiveEvent = async () => {
        if (deleteConfirmationId) {
            try {
                await deleteDoc(doc(db, "eventsArchive", deleteConfirmationId));

                const eventsCollection = collection(db, "eventsArchive");
                const eventsSnapshot = await getDocs(eventsCollection);
                const eventsData = eventsSnapshot.docs.map((doc) => {
                    const eventData = doc.data() as Event;
                    return { ...eventData, id: doc.id } as Event;
                });
                setEvents(eventsData);

                closeDeleteConfirmation();
                console.log("Event deleted successfully!");
                toast.success("Event deleted successfully!");
            } catch (error) {
                console.error("Error deleting event: ", error);
                alert("Error on deleting event.");
            }
        }
    };

    const deleteAllEvents = async () => {
        try {
            const eventsCollection = collection(db, "eventsArchive");
            const eventsSnapshot = await getDocs(eventsCollection);

            eventsSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            setEvents([]);

            closeDeleteAllConfirmation();
            console.log("All events deleted successfully!");
            toast.success("All events deleted successfully!");
        } catch (error) {
            console.error("Error deleting all events: ", error);
            alert("Error on deleting all events.");
        }
    };

    const addEvent = async (event: Event) => {
        try {
            const restoreCollectionRef = collection(db, "events");

            await addDoc(restoreCollectionRef, event);

            console.log("Event restored successfully!");
            toast.info("Event restored successfully!");
        } catch (error) {
            console.error("Error restoring event: ", error);
            alert("Error restoring event.");
        }
    };

    const restoreArchiveEvent = async () => {
        if (restoreConfirmationId) {
            try {
                const eventToDelete = events.find(
                    (event) => event.id === restoreConfirmationId
                );

                if (eventToDelete) {
                    await addEvent(eventToDelete);
                }

                await deleteDoc(doc(db, "eventsArchive", restoreConfirmationId));

                const eventsCollection = collection(db, "eventsArchive");
                const eventsSnapshot = await getDocs(eventsCollection);
                const eventsData = eventsSnapshot.docs.map((doc) => {
                    const eventData = doc.data() as Event;
                    return { ...eventData, id: doc.id } as Event;
                });
                setEvents(eventsData);

                closeRestoreConfirmation();
                console.log("Event restored successfully!");
                toast.success("Event restored successfully!");
            } catch (error) {
                console.error("Error on restoring event: ", error);
                alert("Error on restoring event.");
            }
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsCollection = collection(db, "eventsArchive");
                const queryEvent = query(
                    eventsCollection,
                    orderBy("createdAt", "desc")
                );
                const eventsSnapshot = await getDocs(queryEvent);
                const eventsData = eventsSnapshot.docs.map((doc) => {
                    const eventData = doc.data() as Event;
                    return { ...eventData, id: doc.id } as Event;
                });
                setEvents(eventsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event: ", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between space-x-2">

                <h1 className="text-4xl font-bold">Archived Events</h1>
                <button className="btn btn-square hover:bg-red-500 hover:text-white" onClick={openDeleteAllConfirmation}>
                    <Icon icon="mdi:delete-alert-outline" className="w-10 h-10" />
                </button>
            </div>

            {loading ? (
                <>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 justify-evenly">
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                            <div className="w-20 h-5 skeleton"></div>
                        </div>
                        <hr className="w-full h-2 rounded-full bg-base-300 " />
                        <div className="flex flex-col w-full gap-4">
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>
                            <div className="w-full h-20 skeleton"></div>

                            <div className="w-full h-20 skeleton"></div>

                            <div className="w-full h-20 skeleton"></div>

                        </div>
                    </div>
                </>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Event Source</th>
                                <th>Event Description</th>
                                <th>Event Place</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Event Image </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {events.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={9}>
                                        <div role="alert" className="alert">
                                            <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                                            <span>No Events found.</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {events.map((event, index) => (
                                    <tr key={index}>
                                        <th>{event.name}</th>
                                        <th>{event.eventSource}</th>
                                        <td><div className="w-40 truncate">{event.eventDesc}</div></td>
                                        <td>{event.eventPlace}</td>
                                        <td>{event.startDate}</td>
                                        <td>{event.startTime}</td>
                                        <td>
                                            <img
                                                src={event.imageUrl}
                                                alt="Event Alt"
                                                style={{ maxWidth: "100px", cursor: "pointer" }}
                                                className="cursor-pointer max-h-20 rounded-2xl max-w-28 hover:scale-110"
                                                onClick={() => openImagePreview(event.imageUrl)}
                                            />
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => openRestoreConfirmation(event.id)}
                                                    className="btn btn-square hover:bg-orange-500 hover:text-white"
                                                >
                                                    <Icon icon="ic:round-restore" className="w-10 h-10" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteConfirmation(event.id)}
                                                    className="btn btn-square hover:bg-red-500 hover:text-white"
                                                >
                                                    <Icon icon="mdi:delete-empty-outline" className="w-10 h-10" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            )}

            {/* Image Preview Modal */}
            <Modal
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={selectedImage !== null} onRequestClose={closeImagePreview}>
                <div className="flex space-x-2" >
                    <img
                        src={selectedImage || ""}
                        alt="Image Preview"
                        style={{ maxWidth: "100%" }}
                        className="w-auto rounded-2xl h-96"
                    />
                    <button onClick={closeImagePreview} className="btn btn-square">
                        <Icon icon="heroicons:x-mark-16-solid" className="w-10 h-10" />
                    </button>
                </div>
            </Modal>
            {/* Delete Confirmation Modal */}
            <Modal
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={deleteConfirmationId !== null}
                onRequestClose={closeDeleteConfirmation}
                ariaHideApp={false}
            >
                <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
                    <p className="text-3xl text-center">Are you sure you want to delete this event forever?</p>
                    <div className="flex justify-center mt-6 space-x-3">
                        <button onClick={deleteArchiveEvent} className="text-white btn btn-primary hover:bg-red-500">
                            Yes, Delete Forever
                        </button>
                        <button onClick={closeDeleteConfirmation} className="btn bg-base-300">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Delete All Manual Modal */}
            <Modal
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={deleteAllConfirmation}
                onRequestClose={closeDeleteAllConfirmation}
                ariaHideApp={false}
            >
                <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
                    <p className="text-3xl text-center">Are you sure you want to delete all events forever?</p>
                    <div className="flex justify-center space-x-3 mt-14">
                        <button onClick={deleteAllEvents} className="btn btn-danger">
                            Yes, Delete All Forever
                        </button>
                        <button
                            onClick={closeDeleteAllConfirmation}
                            className="btn btn-primary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Restore Confirmation Modal */}
            <Modal
                className="flex items-center justify-center w-screen h-screen bg-black/60"
                isOpen={restoreConfirmationId !== null}
                onRequestClose={closeRestoreConfirmation}
                ariaHideApp={false}
            >
                <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
                    <p className="text-3xl text-center">Are you sure you want to restore this event?</p>
                    <div className="flex justify-center space-x-3 mt-14">
                        <button onClick={restoreArchiveEvent} className="text-white btn bg-warning hover:bg-orange-500">
                            Yes, Restore
                        </button>
                        <button onClick={closeRestoreConfirmation} className="btn bg-base-300">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EventsArchive;