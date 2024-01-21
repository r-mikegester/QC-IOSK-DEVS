import { useState, useEffect } from "react";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { db } from "../../../../utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { useHistory } from "react-router";
import Modal from "react-modal";

interface ContainerProps {
  name: string;
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

const EventManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const createEvent = () => {
    history.push("/createEvent");
  };

  const updateEvent = (eventId: string) => {
    history.push(`/updateEvent/${eventId}`);
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

  const deleteEvent = async () => {
    if (selectedEventId) {
      try {
        await deleteDoc(doc(db, "events", selectedEventId));

        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data() as Event;
          return { ...eventData, id: doc.id } as Event;
        });
        setEvents(eventsData);

        closeDeleteConfirmation();
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data() as Event;
          return { ...eventData, id: doc.id } as Event;
        });
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
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
              <h1>Event Management</h1>

              <button onClick={createEvent} className="btn btn-primary">
                Create Event
              </button>
              <br />
              <br />
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Event Description</th>
                      <th>Event Place</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Event Image </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <th>{event.name}</th>
                        <td>{event.eventDesc}</td>
                        <td>{event.eventPlace}</td>
                        <td>{event.startDate}</td>
                        <td>{event.endDate}</td>
                        <td>{event.startTime}</td>
                        <td>{event.endTime}</td>
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
                </table>
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
      </IonContent>
    </IonPage>
  );
};

export default EventManagement;
