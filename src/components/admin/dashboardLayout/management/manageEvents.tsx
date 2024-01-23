import { useState, useEffect } from "react";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { db } from "../../../../utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { useHistory } from "react-router";
import Modal from "react-modal";
import { Icon } from '@iconify/react';
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
            <div className="w-full min-h-screen grid-cols-4 grid-rows-5 gap-5 p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-4xl">Event Management</h1>


                <button onClick={createEvent} className="btn btn-square mr-6 tooltip flex justify-center"  >
                  <Icon icon="material-symbols:box-add-outline" className="w-10 h-10" />

                </button>
              </div>
              <br />
              <br />
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="font-bold border-b-2 border-base-300">
                    <tr>
                      <th className="w-20">Event Name</th>
                      <th className="w-20">Event Description</th>
                      <th className="w-20">Event Place</th>
                      <th className="w-20">When</th>
                      {/* <th>End Date</th> */}
                      {/* <th>Time</th> */}
                      {/* <th>To</th> */}
                      <th className="w-20">Organizer </th>
                      <th className="w-20">Event Image </th>
                      <th className="w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index} className="border-b-2 border-base-200">
                        <td>{event.name}</td>
                        <td className="max-w-20 truncate">{event.eventDesc}</td>
                        <td>{event.eventPlace}</td>
                        <td>{event.startDate}</td>
                        {/* <td>{event.endDate}</td>
                        <td>{event.startTime}</td> */}
                        {/* <td>{event.endTime}</td> */}
                        <td className=" justify-center items-center">
                          <img
                            src={event.imageUrl}
                            alt="Event Source"
                            className="rounded-2xl max-h-16 max-w-16 min-w-16 flex justify-center"
                            onClick={() => openImagePreview(event.imageUrl)}
                          />
                        </td>
                        <td className=" justify-center items-center">
                          <img
                            src={event.imageUrl}
                            alt="Event Alt"
                            className="rounded-2xl  max-h-16 max-w-16 min-w-16  flex justify-center"
                            onClick={() => openImagePreview(event.imageUrl)}
                          />
                        </td>
                        <td className=" flex  justify-center space-x-2 mt-2 items-center">
                          {/* <button onClick={() => updateEvent(event.id)} className="btn btn-square rounded-xl">
                            <Icon icon="lets-icons:view" className="w-10 h-10" />
                          </button> */}
                          <button onClick={() => updateEvent(event.id)} className="btn btn-square rounded-xl">
                            <Icon icon="tabler:edit" className="w-10 h-10" />
                          </button>
                          <button onClick={() => openDeleteConfirmation(event.id)} className="btn btn-square rounded-xl">
                            <Icon icon="material-symbols:delete-outline-rounded" className="w-10 h-10" />
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
        <Modal className=" w-screen h-screen flex justify-center items-center "
          isOpen={selectedImage !== null}
          onRequestClose={closeImagePreview}
        >
          <div className="flex flex-col space-y-0">
            <img
              src={selectedImage || ""}
              alt="Image Preview"
              style={{ maxWidth: "100%" }}
              className="rounded-t-3xl"
            />
            <button onClick={closeImagePreview} className="btn rounded-t-none rounded-b-3xl bg-base-300 hover:bg-base-100">
              Close
            </button>
          </div>
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal className=" w-screen h-screen flex justify-center items-center "
          isOpen={selectedEventId !== null}
          onRequestClose={closeDeleteConfirmation}
        >
          <div className="bg-base-100 relative w-56 h-56 text-base-content justify-center rounded-2xl px-6">
            <h1 className="text-xl font-semibold text-center">Are you sure you want to delete this event?</h1>
            <div className="flex space-x-2 justify-center absolute bottom-3 left-4 ">
              <button onClick={deleteEvent} className="btn bg-base-300 hover:bg-red-500 text-white ">
                Yes, Delete
              </button>
              <button onClick={closeDeleteConfirmation} className="btn bg-base-300">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default EventManagement;