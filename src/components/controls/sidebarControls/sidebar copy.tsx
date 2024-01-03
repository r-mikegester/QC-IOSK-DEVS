// Sidebar.tsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import WidgetPanel from "../Widgets/widgetPanel";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative left-0 h-screen bg-gray-900 ${
        isOpen ? "w-80" : "w-16"
      } transition-all duration-300`}
    >
      <button onClick={toggleSidebar} className="p-3">
        <Icon
          className="w-10 h-10"
          icon={
            isOpen
              ? "typcn:chevron-right-outline"
              : "typcn:chevron-left-outline"
          }
        />
      </button>
      {/* Conditionally render the sidebar content */}
      {isOpen && (
        <div className="space-y-5">
          <div>
            <h1 className="mx-4">Events</h1>
            <div className="w-auto h-auto bg-gray-700/70 mx-4 rounded-2xl ">
              <ul className="py-3 space-y-3">
                <li className="bg-gray-600 w-auto rounded-xl h-16 mx-3"></li>
                <li className="bg-gray-600 w-auto rounded-xl h-16 mx-3"></li>
              </ul>
            </div>
          </div>
          <div>
            <h1 className="mx-4">Announcements</h1>
            <div className="w-auto h-auto bg-gray-700/70 mx-4 rounded-2xl ">
              <ul className="py-3 space-y-3">
                <li className="bg-gray-600 w-auto rounded-xl h-16 mx-3 px-3">
                  <div className="flex items-center">
                    <img className="w-10 h-10 bg-gray-700" />
                    <h1 className="ml-2 text-xs">Title</h1>
                    <p className="ml-2 text-xs">Title</p>
                  </div>
                </li>
                <li className="bg-gray-600 w-auto rounded-xl h-16 mx-3"></li>
              </ul>
            </div>
          </div>
          <ul className="menu bg-gray-700/70 text-white mx-4 justify-center w-auto rounded-box">
            <li>
              <a>
                <Icon icon="mdi:events" className="w-10 h-10" />
                Events
              </a>
            </li>
            <li>
              <details open>
                <summary>
                  <Icon
                    icon="mingcute:announcement-line"
                    className="w-10 h-10"
                  />
                  Announcements
                </summary>
                <ul>
                  <li>
                    <a>
                      <Icon
                        icon="mingcute:settings-1-line"
                        className="w-10 h-10"
                      />
                      English
                    </a>
                  </li>
                  <li>
                    <a>
                      <Icon
                        icon="mingcute:settings-1-line"
                        className="w-10 h-10"
                      />
                      Tagalog
                    </a>
                  </li>
                  <li>
                    <a>
                      <Icon
                        icon="mingcute:settings-1-line"
                        className="w-10 h-10"
                      />
                      Korean
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>
                  <Icon icon="mingcute:settings-1-line" className="w-10 h-10" />
                  Settings
                </summary>
                <ul>
                  <li>
                    <a>
                      <Icon icon="fluent-mdl2:teamwork" className="w-10 h-10" />
                      Credits
                    </a>
                  </li>
                  <li>
                    <a>
                      <Icon icon="mdi:administrator" className="w-10 h-10" />
                      Admin Login
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
          {/* <ul className="menu bg-gray-700/70 text-white mx-4 justify-center w-auto rounded-box">
            <li>
              <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Kiosk Manual</a>
            </li>
            <li>
              <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Audio Controls</a>
            </li>
            <li>
              <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Refresh</a>
            </li>
            <li>
              <details open>
                <summary><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Translations</summary>
                <ul>
                  <li>
                    <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />English</a>
                  </li>
                  <li>
                    <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Tagalog</a>
                  </li>
                  <li>
                    <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Korean</a>
                  </li>
                  <li>
                    <details open>
                      <summary><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Parent</summary>
                      <ul>
                        <li>
                          <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Submenu 1</a>
                        </li>
                        <li>
                          <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Submenu 2</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Settings</summary>
                <ul>
                  <li>
                    <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Credits</a>
                  </li>
                  <li>
                    <a><Icon icon="mingcute:settings-1-line" className="w-10 h-10" />Admin Login</a>
                  </li>
                
                </ul>
              </details>
            </li>
          </ul> */}
          {/* Add more sidebar items or components as needed */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
