import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../assets/css/dock.css";
interface ContainerProps {
  name: string;
}

const adminSidebar: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const ClickWelcome = () => {
    // Redirect to the "/Home" route
    history.push("/Home");
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push("/Campuses");
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push("/Search");
  };

  const { t } = useTranslation();
  return (
<div
          id="application-sidebar"
          className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="px-6">
            <a
              className="flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              aria-label="Brand"
            >
              QC-IOSK
            </a>
          </div>

          <nav
            className="flex flex-col flex-wrap w-full p-6 hs-accordion-group"
            data-hs-accordion-always-open
          >
            <ul className="space-y-1.5">
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/Dashboard"
                >
                  <Icon icon="lucide:layout-dashboard" className="h-7 w-7" />
                  Dashboard
                </a>
              </li>
              
              <li>
                <a
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/EventsSettings"
                >
                <Icon icon="material-symbols:room-preferences-outline-rounded" className="w-7 h-7" />
                Rooms
                </a>
              </li>
                        
              <li>
                <a
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/EventsSettings"
                >
                  <Icon icon="bi:building-gear"  className="w-7 h-7" />
                  Building
                </a>
              </li>
                   
              <li>
                <a
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/EventsSettings"
                >
                  <Icon icon="mdi:events" className="w-7 h-7" />
                  Events
                </a>
              </li>
              
              <li>
                <a
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/AnnoucementSettings"
                >
                  <Icon icon="mingcute:announcement-line" className="w-7 h-7" />
                  Announcement
                </a>
              </li>
              
              <li>
                <a
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/ThemesSettings"
                >
                  <Icon
                    icon="fluent:design-ideas-16-regular"
                    className="w-7 h-7"
                  />
                  Themes
                </a>
              </li>

              <li>
                <a
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/Settings"
                >
                  <Icon icon="ci:settings" className="w-7 h-7" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
   
  );
};

export default adminSidebar;
