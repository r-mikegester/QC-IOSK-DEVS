import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../utils/firebase";
import { collection, getDocs, query, orderBy } from "@firebase/firestore";
import { Icon } from "@iconify/react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface ContainerProps {
  name: string;
}

interface Event {
  name: string;
  eventDesc: string;
  eventSource: string;
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
        const queryEvent = query(
          eventsCollection,
          orderBy("createdAt", "desc")
        );
        const eventsSnapshot = await getDocs(queryEvent);
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
        <div className="sticky top-0 z-50 px-3 py-1 transition-all duration-150 ease-in-out bg-base-100">
          <h1 className="text-4xl font-bold text-left ">{t("Events")}</h1>
          <p className="text-sm 0">Showing events for the current month</p>
        </div>
        {loading ? (
          <>
            <div className="px-3 pt-10 pr-6  w-96 h-96 rounded-2xl">

              <div className="flex flex-col gap-4">
                <div className="w-full skeleton h-96 rounded-2xl"></div>
                <div className="w-full skeleton h-96 rounded-2xl"></div>
                <div className="w-full h-full skeleton"></div>
              </div>
            </div>
          </>
        ) : (
          <div>
            {events.length === 0 ? (
              <div className="px-3 mt-10 space-y-4">
                <div role="alert" className="flex justify-center shadow-inner alert h-28 rounded-2xl">
                <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                  <span className="text-xl">No events found.</span>
                </div>
              </div>
            ) : (
              <div className="px-3 pt-10 pb-40 space-y-3">
                <div className="w-full h-auto rounded-2xl">
                  <div className="space-y-3">
                    {events.map((event, index) => (
                      <a key={index} onClick={() => openModal(event)} className="relative block space-y-2 cursor-pointer group rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >

                        <>
                          <div className="flex-shrink-0 relative  rounded-2xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                            <img className="absolute top-0 object-cover w-full h-full start-0 brightness-50 hover:scale-110" src={event.imageUrl} alt="Image Description" />
                          </div>
                          <div className="absolute inset-x-0 top-0 z-10">
                            <div className="flex flex-col h-full p-4 lg:px-3 lg:py-1 sm:p-6">

                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <img className="h-[2.875rem] w-[2.875rem] border-2 border-white rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Image Description" />
                                </div>
                                <div className="ms-2.5 sm:ms-4">
                                  <h4 className="font-semibold text-white">
                                    {event.eventSource}
                                  </h4>
                                  <p className="text-xs text-white/[.8]">
                                    {" "}
                                    {event.startDate}
                                  </p>
                                </div>
                              </div>

                            </div>
                          </div><div className="absolute inset-x-0 bottom-0 z-10">
                            <div className="flex flex-col h-full p-4 sm:p-6">
                              <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                                {" "}
                                {event.name}{" "}
                              </h3>
                              <p className="mt-2 text-white/[.8] truncate">
                                {event.eventDesc}
                              </p>
                            </div>
                          </div>
                        </>

                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modal for Event Details */}
      <div className="">
        <Modal
          className="flex items-center justify-center w-screen h-screen duration-150 ease-in-out  bg-black/60"
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Event Details"
          ariaHideApp={false}
        >
          {selectedEvent && (
            <div className="items-center justify-center w-auto h-auto p-6 duration-150 ease-in-out shadow-md  bg-base-100 rounded-3xl">
              <div className="flex space-x-4">
                <div>
                  <img
                    src={selectedEvent.imageUrl}
                    alt="Event Alt"
                    className="w-96 h-96 rounded-2xl"
                  />
                </div>
                <div className="relative p-6 overflow-y-auto shadow-inner bg-base-200 rounded-2xl w-96 h-96">
                  <h1 className="text-4xl font-semibold capitalize">
                    {selectedEvent.name}
                  </h1>
                  <p>{selectedEvent.eventDesc}</p>
                  <p className="mt-10 font-semibold">{selectedEvent.eventSource}</p>
                  <div className="">
                    <p>Date: {selectedEvent.startDate}</p>
                    
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-12 shadow-inner btn bg-base-200 btn-square hover:bg-red-500 hover:text-white "
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
