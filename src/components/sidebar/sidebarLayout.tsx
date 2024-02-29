import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/sidebar.css";
import KioskManual from "./KioskManual";
import AudioBG from "./audioBG";
import ChangeLanguage from "./ChangeLanguage";
import Reload from "./Reload";
import { useTranslation } from "react-i18next";
import Settings from "./auth/adminLogin";
import Events from "./events";
import Announcements from './annoucements';
import Themes from "./themes";
import About from "./about";

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
      className="fixed z-50 hidden w-0 h-0 bottom-20 md:fixed md:top-0 md:left-0 md:flex md:w-16 md:h-screen md:p-2 md:shadow-lg bg-base-100 text-base-content backdrop-blur-lg"
    >
      <div className="z-50 sidebar-content">
        {/* Sidebar contents */}
        <div className="z-50 flex flex-col items-center justify-start flex-grow h-full">
          {/* <KioskManual name={"Kiosk Manual"} /> */}
          <SideBarIcon
            icon="streamline:manual-book"
            text={t("Kiosk Manual")}
            onClick={() => handleContentChange("KioskManual")}
          />
          <Divider />
          <SideBarIcon
            icon="mingcute:announcement-line"
            text={t("Announcements")}
            onClick={() => handleContentChange("Announcements")}
          />
          <SideBarIcon
            icon="mdi:events"
            text={t("Events")}
            onClick={() => handleContentChange("Events")}
          />
          <div className="absolute bottom-5">
            <AudioBG name="Minecraft" volume={0} />
            <Reload name={"Refresh"} />
            {/* <ChangeLanguage name={"Change Language"} /> */}
            <SideBarIcon
              icon="ion:language"
              text={t("Languages")}
              onClick={() => handleContentChange("Language")}
            />
            <SideBarIcon
              icon="mdi:paint-outline"
              text={t("Themes")}
              onClick={() => handleContentChange("Themes")}
            />
            <Divider />
            <div tabIndex={0} className="rounded-full collapse">
              <div className="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 transition-all duration-300 ease-linear shadow-lg hover:bg-gradient-to-tr hover:from-accent bg-gradient-to-tr from-base-200 to-base-300 hover:rounded-xl rounded-3xl cursor-pointercollapse-title">
                <Icon icon="uiw:appstore-o" className="w-6 h-6" />
              </div>
              <div className="collapse-content">
                <SideBarIcon
                  icon="fontisto:info"
                  text={t("About")}
                  onClick={() => handleContentChange("About")}
                />
                <SideBarIcon
                  icon="mdi:administrator"
                  text={t("Admin")}
                  onClick={() => handleContentChange("Settings")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 z-40 flex w-16 h-full p-2 shadow-lg bg-base-100 backdrop-blur-lg"></div>
      <div
        className={`transition-all duration-150 ease-in-out w-96  overflow-auto h-screen -left-96 -z-50 ${selectedContent
          ? "active fixed translate-x-10 left-6 top-0 ease-linear -z-50  bg-base-100"
          : " -translate-x-3 fixed top-0 -left-16 -z-50 ease-in-out duration-150"
          }`}
      >
        {/* Contents of Sidebar Items that is Clickable */}
        <div className={`-z-50 duration-500   ${selectedContent}`}>
          {selectedContent === "Announcements" && <Announcements name={""} />}
          {selectedContent === "Events" && <Events name={""} />}
          {selectedContent === "Language" && <ChangeLanguage name={"Lang"} />}
          {selectedContent === "Settings" && <Settings />}
          {selectedContent === "KioskManual" && <KioskManual name={""} />}
          {selectedContent === "About" && <About />}
          {selectedContent === "Themes" && <Themes />}

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
  <div className="sidebar-icon group hover:bg-gradient-to-tr" onClick={onClick}>
    <Icon icon={icon} className="w-6 h-6" />
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
