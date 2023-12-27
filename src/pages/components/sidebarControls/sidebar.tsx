import { Icon } from "@iconify/react";
import React, { useState } from "react";
import "./sidebar.css";
import KioskManual from "./KioskManual";
import AudioBG from "./Audio/AudioBG";
import ChangeLanguage from "./Language/ChangeLanguage";
import Reload from "./Reload";
import { useTranslation } from "react-i18next";

interface SideBarIconProps {
  icon: string;
  text?: string;
  onClick?: () => void;
}

const SideBar = () => {
  const handleContentChange = (content: string) => {
    setSelectedContent(content === selectedContent ? "" : content);
  };

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

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  const [borderStyles, setBorderStyles] = useState<Record<string, string>>({
    en: "",
    tg: "",
    fr: "",
    bsy: "",
    jpn: "",
    vn: "",
    cmd: "",
    kr: "",
    gmy: "",
    thai: "",
    // Add other languages and their initial border styles here
  });

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLAnchorElement>,
    language: string
  ) => {
    e.preventDefault();
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    // Additional logic can be added here if needed upon language change
    // Update border styles based on the selected language
    const updatedBorderStyles: Record<string, string> = {};
    Object.keys(borderStyles).forEach((lang) => {
      updatedBorderStyles[lang] =
        lang === language ? "border-2 border-sky-500" : "";
    });
    setBorderStyles(updatedBorderStyles);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex p-2 z-50 bg-white dark:bg-gray-900 backdrop-blur-lg shadow-lg">
      <div className="sidebar-content z-50">
        {/* Sidebar contents */}
        <div className="flex flex-col flex-grow justify-start z-50 items-center h-full">
          <KioskManual name={"Kiosk Manual"} />
          <Divider />
          <SideBarIcon
            icon="mingcute:announcement-line"
            text="Announcements"
            onClick={() => handleContentChange("Announcements")}
          />
          <SideBarIcon
            icon="mdi:events"
            text="Events"
            onClick={() => handleContentChange("Events")}
          />
          <div className="absolute bottom-5">
            <AudioBG name="Minecraft" volume={0} />
            <Reload name={"Refresh"} />
            {/* <ChangeLanguage name={"Change Language"} /> */}
            <SideBarIcon
              icon="ion:language"
              text="Language"
              onClick={() => handleContentChange("Language")}
            />
            <Divider />
            <SideBarIcon
              icon="mingcute:settings-1-line"
              text="Settings"
              onClick={() => handleContentChange("Settings")}
            />
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-150 ease-in-out w-96 overflow-auto h-screen left-16 -z-50 ${
          selectedContent
            ? "active bg-gray-900 fixed translate-x-0 top-0 ease-linear  -z-50"
            : " -translate-x-3 fixed top-0 -left-16 -z-50 "
        }`}
      >
        {/* Content for Announcements or Events */}
        <div className={`-z-50 duration-500  ${selectedContent}`}>
          {selectedContent === "Announcements" && (
            <div className="px-3 py-10 space-y-2 bg-gray-900 ">
               <div className="bg-gray-900 z-50 top-0 sticky transition-all ease-in-out duration-150 py-1 pb-5">
        <h1 className="text-left text-4xl font-bold ">
          Annoucements
        </h1>
        <p className="text-gray-500 text-sm">Updates from the Campus</p>
      </div>

              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
              <div role="alert" className="alert shadow-lg">
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
                <div>
                  <h3 className="font-bold">New message!</h3>
                  <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn btn-sm">See</button>
              </div>
            </div>
          )}
          {selectedContent === "Events" && (
            <div className="px-3 py-10 space-y-2 bg-gray-900">
               <div className="bg-gray-900 z-50 top-0 sticky transition-all ease-in-out duration-150 py-1 pb-5">
        <h1 className="text-left text-4xl font-bold ">
          Events
        </h1>
        <p className="text-gray-500 text-sm">Showing Events for the month of January</p>
      </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Marahuyo</h2>
                      <p>Most Awaited Event of QCUians</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto bg-gray-600 rounded-2xl">
                <div>
                  <div className="card w-auto bg-base-100 shadow-xl image-full">
                    <figure>
                      <img
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedContent === "Settings" && (
            <div className="px-3 py-10 bg-gray-900">
               <div className="bg-gray-900 z-50 top-0 sticky transition-all ease-in-out duration-150 py-1 pb-5">
        <h1 className="text-left text-4xl font-bold ">
          Settings
        </h1>
        <p className="text-gray-500 text-sm">Change your Preferences</p>
      </div>
              <div className="w-full h-screen space-y-2 rounded-2xl">
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 bg-gray-700"
                >
                  <div className="collapse-title text-xl font-medium">
                    Appearance
                  </div>
                  <div className="collapse-content">
                    <p>Themes</p>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 bg-gray-700"
                >
                  <div className="collapse-title text-xl font-medium">
                    Sounds
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 bg-gray-700"
                >
                  <div className="collapse-title text-xl font-medium">
                    Credits
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border border-base-300 bg-gray-700"
                >
                  <div className="collapse-title text-xl font-medium">
                    Admin
                  </div>
                  <div className="collapse-content">
                    <p>
                      tabIndex={0} attribute is necessary to make the div
                      focusable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedContent === "Language" && (
            <ChangeLanguage name={"Lang"} />
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
