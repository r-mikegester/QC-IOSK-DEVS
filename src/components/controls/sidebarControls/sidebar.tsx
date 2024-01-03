import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/sidebar.css";
import KioskManual from "./KioskManual";
import AudioBG from "./AudioBG";
import ChangeLanguage from "./language/ChangeLanguage";
import Reload from "./Reload";
import { useTranslation } from "react-i18next";
import Settings from "./settings/settings";


interface SideBarIconProps {
  icon: string;
  text?: string;
  onClick?: () => void;
}

const SideBar = () => {
  const handleContentChange = (content: string) => {
    setSelectedContent(content === selectedContent ? "" : content);
  };

  
  const { t } = useTranslation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [volume, setVolume] = useState(50); // Initial volume state
  const [selectedAudio, setSelectedAudio] = useState("Minecraft"); // Initial audio selection state

  // Function to handle volume change
  const handleVolumeChange = (newVolume: React.SetStateAction<number>) => {
    setVolume(newVolume);
    // Add logic to control the volume of the audio element in your AudioBG component
    // Example: audioElement.volume = newVolume / 100; (assuming 'audioElement' is the reference to your audio element)
  };

  // Function to handle audio selection change
  const handleAudioChange = (selectedAudio: React.SetStateAction<string>) => {
    setSelectedAudio(selectedAudio);
    // Add logic to change the audio being played in your AudioBG component
    // Example: audioElement.src = "new-audio-file-path.mp3"; (assuming 'audioElement' is the reference to your audio element)
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSelectedContent(""); // Close the sidebar when clicking outside
      }
    };

    const handleSidebarFocus = () => {
      setIsSidebarActive(true);
    };

    const handleSidebarBlur = () => {
      setIsSidebarActive(false);
      setSelectedContent(""); // Close the content when sidebar loses focus
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      // ref={sidebarRef}
      className="fixed top-0 left-0 z-50 flex w-16 h-screen p-2 shadow-lg bg-base-100 text-base-content backdrop-blur-lg"
    >
      <div className="z-50 sidebar-content">
        {/* Sidebar contents */}
        <div className="z-50 flex flex-col items-center justify-start flex-grow h-full">
          <KioskManual name={"Kiosk Manual"} />
          <SideBarIcon
            icon="streamline:manual-book" 
            text={t('Kiosk Manual')}
            onClick={() => handleContentChange("KioskManual")}
          />
          <Divider />
          <SideBarIcon
            icon="mingcute:announcement-line"
            text={t('Announcements')}
            onClick={() => handleContentChange("Announcements")}
          />
          <SideBarIcon
            icon="mdi:events"
            text={t('Events')}
            onClick={() => handleContentChange("Events")}
          />
          <div className="absolute bottom-5">
            <AudioBG name="Minecraft" volume={0} />
            <Reload name={"Refresh"} />
            {/* <ChangeLanguage name={"Change Language"} /> */}
            <SideBarIcon
              icon="ion:language"
              text={t('Languages')}
              onClick={() => handleContentChange("Language")}
            />
            <Divider />
            <SideBarIcon
              icon="mingcute:settings-1-line"
              text={t('Settings')}
              onClick={() => handleContentChange("Settings")}
            />
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 z-40 flex w-16 h-screen p-2 shadow-lg bg-base-100 backdrop-blur-lg"></div>
      <div
        className={`transition-all duration-150 ease-in-out w-96  overflow-auto h-screen -left-96 -z-50 ${
          selectedContent
            ? "active fixed translate-x-10 left-6 top-0 ease-linear -z-50"
            : " -translate-x-3 fixed top-0 -left-16 -z-50 "
        }`}
      >
        {/* Content for Announcements or Events */}
        <div className={`-z-50 duration-500  ${selectedContent}`}>
          {selectedContent === "Announcements" && (
            <div className="py-10 space-y-2 bg-base-100">
              <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
                <h1 className="text-4xl font-bold text-left ">{t("Announcements")}</h1>
                <p className="text-sm ">Updates from the Campus</p>
              </div>
              <div className="px-3 space-y-2">
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
                <div role="alert" className="shadow-lg alert">
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
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                  </div>
                  <button className="btn bg-base-300 btn-sm">View</button>
                </div>
              </div>
            </div>
          )}
          {selectedContent === "Events" && (
            <div className="py-10 space-y-2 bg-base-100">
              <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
                <h1 className="text-4xl font-bold text-left ">{t("Events")}</h1>
                <p className="text-sm 0">
                  Showing Events for the month of January
                </p>
              </div>
             <div className="px-3 space-y-2">
             <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Marahuyo</h2>
                      <p>Most Awaited Event of QCUians</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn ">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             </div>

            </div>
          )}
          {selectedContent === "Language" && <ChangeLanguage name={"Lang"} />}
          {selectedContent === "Settings" && <Settings />}
          {selectedContent === "KioskManual" && (
            <div className="h-screen py-10 space-y-2 bg-base-100">
              <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
                <h1 className="text-4xl font-bold text-left ">{t("KioskManual")}</h1>
                <p className="text-sm 0">
                  Guides on how to use QCIOSK
                </p>
              </div>
             <div className="px-3 space-y-2">
             <div className="w-full bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">BASIC GESTURES</h2>
                      <p>Simple Gestures to Navigate thru our Kiosk</p>
                      <div className="justify-end card-actions">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-base-300 rounded-2xl">
                <div>
                  <div className="w-auto shadow-xl card bg-base-100 image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">BASIC GESTURES</h2>
                      <p>Simple Gestures to Navigate thru our Kiosk</p>
                      <div className="justify-end card-actions">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
             </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SideBarIcon: React.FC<SideBarIconProps> = ({
  icon,
  text = "tooltip 💡",
  onClick,
}) => (
  <div className="sidebar-icon group" onClick={onClick}>
    <Icon icon={icon} className="w-6 h-6" />
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
