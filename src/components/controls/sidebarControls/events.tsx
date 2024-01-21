import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manualImg from "../../../assets/imgs/kiosk.png";
import { db } from "../../../utils/firebase";
import { collection, getDocs } from "@firebase/firestore";
import Modal from "react-modal";

interface ContainerProps {
  name: string;
}

interface Event {
  name: string;
  eventDesc: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
}

const Events: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const dialogElement = document.getElementById("yourDialogId");
    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.showModal();
    } else {
      // Handle the case where the element isn't a dialog element
    }
  }, []); // Run this effect only once after the component mounts

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map(
          (doc) => doc.data() as Event
        );
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="h-screen py-10 space-y-2 bg-base-100">
        <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
          <h1 className="text-4xl font-bold text-left ">{t("Events")}</h1>
          <p className="text-sm 0">Showing Events for the month of January</p>
        </div>
        <div className="px-3 space-y-2">
          <div className="w-full h-auto bg-base-300 rounded-2xl">
            <div>
              {events.map((event, index) => (
                <div
                  className="object-cover w-auto shadow-xl card bg-base-100 image-full"
                  key={index}
                >
                  <figure>
                    {/* <img src={manualImg} alt="Kiosk Manual" className="" /> */}
                    <img
                      src={event.imageUrl}
                      alt="Event Alt"
                      // style={{ maxWidth: "100px" }}
                    />
                  </figure>

                  <div className="card-body ">
                    <h2 className="card-title"> {event.name} </h2>
                    <p> {event.eventDesc} </p>
                    <p> {event.startDate}</p>
                    <p> {event.endDate}</p>

                    <div className="justify-end card-actions">
                      <button
                        onClick={() => openModal(event)}
                        className="btn btn-secondary"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Event Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Event Details"
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.name}</h2>
            <p>{selectedEvent.eventDesc}</p>
            <img
              src={selectedEvent.imageUrl}
              alt="Event Alt"
              style={{ maxWidth: "100px" }}
            />
            <p>Start Date: {selectedEvent.startDate}</p>
            <p>End Date: {selectedEvent.endDate}</p>
            <button onClick={closeModal} className="btn btn-primary">
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Events;
