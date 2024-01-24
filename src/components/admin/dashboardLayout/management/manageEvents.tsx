import { useState, useEffect } from "react";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { db } from "../../../../utils/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  addDoc,
} from "@firebase/firestore";
import { useHistory } from "react-router";
import Modal from "react-modal";
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

const EventManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteAllConfirmation, setDeleteAllConfirmation] =
    useState<boolean>(false);

  const createEvent = () => {
    history.replace("/createEvent");
  };

  const updateEvent = (eventId: string) => {
    history.replace(`/updateEvent/${eventId}`);
  };

  const openImagePreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  const openDeleteConfirmation = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedEventId(null);
  };

  const openDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(true);
  };

  const closeDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(false);
  };

  const archiveEvent = async (event: Event) => {
    try {
      const archiveCollectionRef = collection(db, "eventsArchive");

      await addDoc(archiveCollectionRef, event);

      console.log("Event archived successfully!");
      toast.info("Event archived successfully!");
    } catch (error) {
      console.error("Error archiving event: ", error);
      alert("Error archiving event.");
    }
  };

  const deleteEvent = async () => {
    if (selectedEventId) {
      try {
        const eventToDelete = events.find(
          (event) => event.id === selectedEventId
        );

        if (eventToDelete) {
          await archiveEvent(eventToDelete);
        }

        await deleteDoc(doc(db, "events", selectedEventId));

        const eventsCollection = collection(db, "events");
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
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);

      eventsSnapshot.forEach(async (doc) => {
        const eventData = doc.data() as Event;
        await archiveEvent({ ...eventData, id: doc.id });
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
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

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-full grid-cols-4 grid-rows-5 gap-5 p-10 bg-base-100 rounded-tl-3xl">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-4xl">Event Management</h1>
              </div>

              <button onClick={createEvent} className="btn btn-primary">
                Create Event
              </button>
              <span> | </span>
              <button
                onClick={openDeleteAllConfirmation}
                className="btn btn-accent"
              >
                Archive All
              </button>
              <br />
              <br />
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
                        <th>Action</th>
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
                                style={{ maxWidth: "100px", cursor: "pointer" }}
                                onClick={() => openImagePreview(event.imageUrl)}
                              />
                            </td>
                            <td>
                              <button
                                onClick={() => updateEvent(event.id)}
                                className="btn btn-primary"
                              >
                                Edit
                              </button>
                              <span> | </span>
                              <button
                                onClick={() => openDeleteConfirmation(event.id)}
                                className="btn btn-primary"
                              >
                                Delete
                              </button>
                            </td>
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
        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={selectedEventId !== null}
          onRequestClose={closeDeleteConfirmation}
        >
          <p>Are you sure you want to delete this event?</p>
          <button onClick={deleteEvent} className="btn btn-danger">
            Yes, Delete
          </button>
          <button onClick={closeDeleteConfirmation} className="btn btn-primary">
            Cancel
          </button>
        </Modal>
        {/* Delete All Confirmation Modal */}
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

export default EventManagement;