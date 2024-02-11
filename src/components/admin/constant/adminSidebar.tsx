import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useEffect } from "react";
import { auth } from "../../../utils/firebase";
import logo from "../../../assets/imgs/logo/qculogo.png";
import { NavLink } from "react-router-dom";
interface ContainerProps {
  name: string;
}

const AdminSideBar: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/Login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const { t } = useTranslation();

  const Archive = () => {
    history.replace("/Archive");
  };

  const Events = () => {
    history.replace("/Events");
  };

  const Announcements = () => {
    history.replace("/Announcements");
  };

  const Manual = () => {
    history.replace("/Mike");
  };
  return (
    <div
      id="application-sidebar"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 h-auto font-semibold border-e  py-7 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 bg-base-300 text-base-content border-base-300"
    >
      <div className="px-6">
        <a
          className="flex items-center flex-none text-2xl font-semibold text-base-content dark:focus:outline-none"
          href="#"
          aria-label="Brand"
        >
          <img src={logo} className="w-12 h-12 mr-3" />
          QC-IOSK
        </a>
      </div>

      <nav
        className="flex flex-col flex-wrap justify-start flex-grow w-full h-full p-6"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5 flex flex-col flex-grow">
          <li>
            <NavLink
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-base-content hover:bg-base-100 dark:focus:outline-none"
              to="/Dashboard"
            >
              <Icon icon="lucide:layout-dashboard" className="h-7 w-7" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Rooms"
            >
              <Icon
                icon="material-symbols:room-preferences-outline-rounded"
                className="w-7 h-7"
              />
              Rooms
            </NavLink>
          </li>

          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Buildings"
            >
              <Icon icon="bi:building-gear" className="w-7 h-7" />
              Building
            </NavLink>
          </li>

          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Events"
              onClick={Events}
            >
              <Icon icon="mdi:events" className="w-7 h-7" />
              Events
            </NavLink>
          </li>

          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Announcements"
              onClick={Announcements}
            >
              <Icon icon="mingcute:announcement-line" className="w-7 h-7" />
              Announcement
            </NavLink>
          </li>
          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Mike"
              onClick={Manual}
            >
              <Icon icon="tabler:hexagon-letter-m" className="w-7 h-7" />
              M.I.K.E
            </NavLink>
          </li>
          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Archive"
              onClick={Archive}
            >
              <Icon
                icon="material-symbols:archive-outline"
                className="w-7 h-7"
              />
              Archive
            </NavLink>
          </li>
          

          <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Settings"
            >
              <Icon icon="ci:settings" className="w-7 h-7" />
              Settings
            </NavLink>
          </li>

        </ul>
        <div className="flex flex-col">
          <li className="flex flex-col pb-5">
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm bg-base-200 text-base-content rounded-lg hover:bg-error hover:text-base-content dark:focus:outline-none"
              onClick={handleLogout}
            >
              <Icon icon="solar:logout-3-broken" className="w-7 h-7" />
              Logout
            </a>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default AdminSideBar;
