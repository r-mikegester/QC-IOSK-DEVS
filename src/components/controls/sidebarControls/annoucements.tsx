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
            <div className=" px-3 w-96 h-20 rounded-2xl pt-10 pr-6">

              <div className="flex flex-col gap-4">
                <div className="skeleton h-28 rounded-2xl w-full"></div>
                <div className="skeleton h-28 rounded-2xl w-full"></div>
                <div className="skeleton h-28 rounded-2xl w-full"></div>
                <div className="skeleton h-28 rounded-2xl w-full"></div>
                <div className="skeleton h-28 rounded-2xl w-full"></div>
                <div className="skeleton h-28 rounded-2xl w-full"></div>
                <div className="skeleton h-full w-full"></div>
              </div>
            </div>
          </>
        ) : (
          <div>
            {announcements.length === 0 ? (
              <div className="px-3 space-y-4 mt-10">
                <div role="alert" className="alert rounded-2xl h-28 flex justify-center shadow-inner">
                <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                  <span className="text-xl">No announcements found.</span>
                </div>
              </div>
            ) : (
              <div className="px-3 space-y-4 mt-10">
                {announcements.map((announcement, index) => (
                  <div role="alert" className="shadow-lg alert rounded-2xl cursor-pointer" key={index} onClick={() => openModal(announcement)}>
                    <Icon icon="uil:comment-info-alt" className="w-8 h-8" />
                    <div>
                      <h3 className="font-bold">{announcement.name}</h3>
                      <div className="text-xs">
                        {announcement.announcementSource}
                      </div>
                    </div>
                    <button
                      className="btn btn-square flex shadow-inner hover:bg-base-300"
                      onClick={() => openModal(announcement)}
                    >
                      <Icon icon="lets-icons:view" className="w-10 h-10" />
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
          className=" w-screen h-screen flex justify-center items-center bg-black/60 "
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Announcement Details"
          ariaHideApp={false}
        >
          {selectedAnnouncement && (
            <div className=" bg-base-100 rounded-3xl shadow-md p-6 justify-center w-7/9 h-auto items-center duration-150 ease-in-out">
              <div className="flex space-x-4">
                <div className="bg-base-200 relative rounded-2xl shadow-inner w-96 min-h-80 p-6">
                  <h1 className="capitalize font-semibold text-4xl">
                    {selectedAnnouncement.name}
                  </h1>
                  <p>{selectedAnnouncement.announcementSource}</p>
                  <p>{selectedAnnouncement.announcementDesc}</p>
                  <div className="justify-between absolute bottom-0 flex space-x-6">
                    <p>Date: {selectedAnnouncement.startDate}</p>
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