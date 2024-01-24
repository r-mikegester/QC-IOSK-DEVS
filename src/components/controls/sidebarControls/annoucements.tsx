import React, { useState, useEffect, useRef } from "react";
import { themeChange } from "theme-change";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

Modal.setAppElement("#root");

interface ContainerProps {
  name: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  startTime: string;
}

const Announcements: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const ClickLogin = () => {
    history.push("/Login");
  };

  const openModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    themeChange(false);
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
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
    <>
      <div className="py-10 space-y-2 bg-base-100">
        <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
          <h1 className="text-4xl font-bold text-left ">
            {t("Announcements")}
          </h1>
          <p className="text-sm ">Updates from the Campus</p>
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
          <div>
            {announcements.length === 0 ? (
              <div className="px-3 space-y-2">
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
              </div>
            ) : (
              <div className="px-3 space-y-2">
                {announcements.map((announcement, index) => (
                  <div role="alert" className="shadow-lg alert" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 stroke-info shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div>
                      <h3 className="font-bold">{announcement.name}</h3>
                      <div className="text-xs">
                        {announcement.announcementSource}
                      </div>
                    </div>
                    <button
                      className="btn bg-base-300 btn-sm"
                      onClick={() => openModal(announcement)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Event Details */}
      <div className="">
        <Modal
          className=" w-screen h-screen flex justify-center items-center "
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Announcement Details"
          ariaHideApp={false}
        >
          {selectedAnnouncement && (
            <div className=" bg-base-100 rounded-3xl shadow-md p-6 justify-center w-8/12 h-8/12 items-center duration-150 ease-in-out">
              <div className="flex space-x-4">
                <div className="bg-base-200 relative rounded-2xl shadow-inner w-96 p-6">
                  <h1 className="capitalize font-semibold text-4xl">
                    {selectedAnnouncement.name}
                  </h1>
                  <p>{selectedAnnouncement.announcementSource}</p>
                  <p>{selectedAnnouncement.announcementDesc}</p>
                  <div className="justify-between absolute bottom-0 flex space-x-2">
                    <p>Start Date: {selectedAnnouncement.startDate}</p>
                    <p>Time: {selectedAnnouncement.startTime}</p>
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

export default Announcements;