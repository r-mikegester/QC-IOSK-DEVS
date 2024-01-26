import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import {
    collection,
    deleteDoc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

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

interface Announcement {
    id: string;
    name: string;
    announcementSource: string;
    announcementDesc: string;
    startDate: string;
    startTime: string;
}

const Archive: React.FC<ContainerProps> = ({ name }) => {
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState(1);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteAllConfirmation, setDeleteAllConfirmation] =
        useState<boolean>(false);

    const handleTabChange = (tabNumber: number) => {
        setSelectedTab(tabNumber);
    };

    const openImagePreview = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeImagePreview = () => {
        setSelectedImage(null);
    };

    const openDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(true);
    };

    const closeDeleteAllConfirmation = () => {
        setDeleteAllConfirmation(false);
    };

    const deleteAllAnnouncements = async () => {
        try {
            const announcementsCollection = collection(db, "announcementsArchive");
            const announcementsSnapshot = await getDocs(announcementsCollection);

            announcementsSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            setAnnouncements([]);

            closeDeleteAllConfirmation();
            console.log("All announcements deleted successfully!");
            toast.success("All announcements deleted successfully!");
        } catch (error) {
            console.error("Error deleting all announcements: ", error);
            alert("Error on deleting all announcements.");
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

    // EVENTS
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
                console.error("Error fetching events: ", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // ANNOUNCEMENTS
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const announcementsCollection = collection(db, "announcementsArchive");
                const queryAnnouncement = query(
                    announcementsCollection,
                    orderBy("createdAt", "desc")
                );
                const announcementsSnapshot = await getDocs(queryAnnouncement);
                const announcementsData = announcementsSnapshot.docs.map((doc) => {
                    const announcementsData = doc.data() as Announcement;
                    return { ...announcementsData, id: doc.id } as Announcement;
                });
                setAnnouncements(announcementsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching announcements: ", error);
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    <AdminSideBar name={""} />
                    <AdminHeader name={""} />
                    <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
                        <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
                            <h1 className="font-bold text-4xl">Archive</h1>
                            <div role="tablist" className="tabs tabs-lifted">
                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 1 ? "tab [--tab-bg:#0A1120]" : "tab"
                                    }
                                    aria-label="Rooms"
                                    checked={selectedTab === 1}
                                    onChange={() => handleTabChange(1)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    Rooms content 1
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 2 ? "tab [--tab-bg:#0A1120]" : "tab"
                                    }
                                    aria-label="Buildings"
                                    checked={selectedTab === 2}
                                    onChange={() => handleTabChange(2)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    Buildings content 2
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 3 ? "tab [--tab-bg:#0A1120]" : "tab"
                                    }
                                    aria-label="Events"
                                    checked={selectedTab === 3}
                                    onChange={() => handleTabChange(3)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <button
                                        onClick={openDeleteAllConfirmation}
                                        className="btn btn-accent"
                                    >
                                        Delete All
                                    </button>
                                    {loading ? (
                                        <>
                                            <h1>LOADING. PLEASE WAIT....</h1>
                                            <div className="flex flex-col gap-4 w-52">
                                                <div className="skeleton h-32 w-full"></div>
                                                <div className="skeleton h-4 w-28"></div>
                                                <div className="skeleton h-4 w-full"></div>
                                                <div className="skeleton h-4 w-full"></div>
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
                                                    </tr>
                                                </thead>
                                                {events.length === 0 ? (
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={9}>
                                                                <div role="alert" className="alert">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        className="stroke-info shrink-0 w-6 h-6"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        ></path>
                                                                    </svg>
                                                                    <span>No announcements found.</span>
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
                                                                <td>{event.eventDesc}</td>
                                                                <td>{event.eventPlace}</td>
                                                                <td>{event.startDate}</td>
                                                                <td>{event.startTime}</td>
                                                                <td>
                                                                    <img
                                                                        src={event.imageUrl}
                                                                        alt="Event Alt"
                                                                        style={{
                                                                            maxWidth: "100px",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={() =>
                                                                            openImagePreview(event.imageUrl)
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                )}
                                            </table>
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_2"
                                    role="tab"
                                    className={
                                        selectedTab === 4 ? "tab [--tab-bg:#0A1120]" : "tab"
                                    }
                                    aria-label="Announcements"
                                    checked={selectedTab === 4}
                                    onChange={() => handleTabChange(4)}
                                />
                                <div
                                    role="tabpanel"
                                    className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                >
                                    <button
                                        onClick={openDeleteAllConfirmation}
                                        className="btn btn-accent"
                                    >
                                        Delete All
                                    </button>
                                    {loading ? (
                                        <>
                                            <h1>LOADING. PLEASE WAIT....</h1>
                                            <div className="flex flex-col gap-4 w-52">
                                                <div className="skeleton h-32 w-full"></div>
                                                <div className="skeleton h-4 w-28"></div>
                                                <div className="skeleton h-4 w-full"></div>
                                                <div className="skeleton h-4 w-full"></div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Announcement Name</th>
                                                        <th>Announcement Source</th>
                                                        <th>Announcement Description</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                {announcements.length === 0 ? (
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={6}>
                                                                <div role="alert" className="alert">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        className="stroke-info shrink-0 w-6 h-6"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        ></path>
                                                                    </svg>
                                                                    <span>No announcements found.</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ) : (
                                                    <tbody>
                                                        {announcements.map((announcement, index) => (
                                                            <tr key={index}>
                                                                <th>{announcement.name}</th>
                                                                <td>{announcement.announcementSource}</td>
                                                                <td>{announcement.announcementDesc}</td>
                                                                <td>{announcement.startDate}</td>
                                                                <td>{announcement.startTime}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                )}
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Image Preview Modal */}
                <Modal
                    isOpen={selectedImage !== null}
                    onRequestClose={closeImagePreview}
                >
                    <img
                        src={selectedImage || ""}
                        alt="Image Preview"
                        style={{ maxWidth: "100%" }}
                    />
                    <button onClick={closeImagePreview} className="btn btn-primary">
                        Close
                    </button>
                </Modal>
                {/* Delete All Announcements Modal */}
                <Modal
                    isOpen={deleteAllConfirmation}
                    onRequestClose={closeDeleteAllConfirmation}
                    ariaHideApp={false}
                >
                    <p>Are you sure you want to delete all announcements?</p>
                    <button onClick={deleteAllAnnouncements} className="btn btn-danger">
                        Yes, Delete All
                    </button>
                    <button
                        onClick={closeDeleteAllConfirmation}
                        className="btn btn-primary"
                    >
                        Cancel
                    </button>
                </Modal>
                {/* Delete All Announcements Modal */}
                <Modal
                    isOpen={deleteAllConfirmation}
                    onRequestClose={closeDeleteAllConfirmation}
                    ariaHideApp={false}
                >
                    <p>Are you sure you want to delete all events?</p>
                    <button onClick={deleteAllEvents} className="btn btn-danger">
                        Yes, Delete All
                    </button>
                    <button
                        onClick={closeDeleteAllConfirmation}
                        className="btn btn-primary"
                    >
                        Cancel
                    </button>
                </Modal>
            </IonContent>
        </IonPage>
    );
};

export default Archive;