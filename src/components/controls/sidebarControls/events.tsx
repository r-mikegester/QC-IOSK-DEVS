import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manualImg from "../../../assets/imgs/kiosk.png";
import { db } from "../../../utils/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { Icon } from "@iconify/react";
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
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setLoading(false);
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
          <div className="px-3 space-y-3 pb-40">
            <div className="w-full h-auto rounded-2xl">
              <div className="space-y-2">
                {events.map((event, index) => (
                  <div
                    className="object-fill w-auto shadow-xl card cursor-pointer  rounded-3xl image-full"
                    key={index}
                    onClick={() => openModal(event)}
                  >
                    <figure className="rounded-3xl">
                      {/* <img src={manualImg} alt="Kiosk Manual" className="" /> */}
                      <img
                        src={event.imageUrl}
                        alt="Event Alt"
                        className=""
                        // style={{ maxWidth: "100px" }}
                      />
                    </figure>

                    <div className="card-body">
                      <h2 className="card-title text-4xl text-left">
                        {" "}
                        {event.name}{" "}
                      </h2>
                      <p className="text-ellipsis "> {event.eventDesc} </p>

                      <div className="justify-between card-actions items-center">
                        <div className="flex justify-between">
                          <p
                            className="font-semibold tooltip"
                            data-tip={t("Event Date")}
                          >
                            {" "}
                            {event.startDate}
                          </p>
                          {/* <p> {event.endDate}</p> */}
                        </div>
                        <button
                          onClick={() => openModal(event)}
                          className="btn btn-square flex hover:bg-base-300 bg-transparent tooltip justify-center hover:text-base-content text-base-100"
                          data-tip={t("View Event")}
                        >
                          <Icon
                            icon="icon-park-outline:preview-open"
                            className="w-10 h-10"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal for Event Details */}
      <div className="">
        <Modal
          className=" w-screen h-screen flex justify-center items-center "
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Event Details"
        >
          {selectedEvent && (
            <div className=" bg-base-100 rounded-3xl shadow-md p-6 justify-center w-8/12 h-8/12 items-center duration-150 ease-in-out">
              <div className="flex space-x-4">
                <div>
                  <img
                    src={selectedEvent.imageUrl}
                    alt="Event Alt"
                    className="w-96 rounded-2xl"
                  />
                </div>
                <div className="bg-base-200 relative rounded-2xl shadow-inner w-96 p-6">
                  <h1 className="capitalize font-semibold text-4xl">
                    {selectedEvent.name}
                  </h1>
                  <p>{selectedEvent.eventDesc}</p>
                  <div className="justify-between absolute bottom-0 flex space-x-2">
                    <p>Start Date: {selectedEvent.startDate}</p>
                    <p>End Date: {selectedEvent.endDate}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="btn bg-base-200 shadow-inner btn-square w-12 "
                >
                  <Icon icon="line-md:close-small" className="w-10 h-10" />
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Events;
