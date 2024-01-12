import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../../../utils/firebase";
import logo from "../../../../assets/imgs/logo/qculogo.png";
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        history.push("/Dashboard");
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        history.push("/Login");
      }
    });
  }, []);

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
  return (
    <div
      id="application-sidebar"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 h-auto  border-e  py-7 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 bg-base-300 text-base-content border-base-200"
    >
      <div className="px-6">
        <a
          className="flex items-center flex-none text-2xl font-semibold text-base-content dark:focus:outline-none"
          href="#"
          aria-label="Brand"
        >
          <img src={logo} className="w-12 h-12 mr-3"/>
          QC-IOSK
        </a>
      </div>

      <nav
        className="flex flex-col flex-wrap justify-start flex-grow w-full h-full p-6"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5 flex flex-col flex-grow">
          <li>
            <a
              className="flex items-center gap-x-3.5 py-2 px-2.5 bg-base-100 text-sm rounded-lg text-base-content hover:bg-base-200 dark:focus:outline-none"
              href="/Dashboard"
            >
              <Icon icon="lucide:layout-dashboard" className="h-7 w-7" />
              Dashboard
            </a>
          </li>

          <li>
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-200 text-base-content dark:focus:outline-none"
              href="/EventsSettings"
            >
              <Icon
                icon="material-symbols:room-preferences-outline-rounded"
                className="w-7 h-7"
              />
              Rooms
            </a>
          </li>

          <li>
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-200 text-base-content dark:focus:outline-none"
              href="/EventsSettings"
            >
              <Icon icon="bi:building-gear" className="w-7 h-7" />
              Building
            </a>
          </li>

          <li>
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-200 text-base-content dark:focus:outline-none"
              href="/EventsSettings"
            >
              <Icon icon="mdi:events" className="w-7 h-7" />
              Events
            </a>
          </li>

          <li>
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-200 text-base-content dark:focus:outline-none"
              href="/AnnoucementSettings"
            >
              <Icon icon="mingcute:announcement-line" className="w-7 h-7" />
              Announcement
            </a>
          </li>

          <li>
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-200 text-base-content dark:focus:outline-none"
              href="/ThemesSettings"
            >
              <Icon icon="fluent:design-ideas-16-regular" className="w-7 h-7" />
              Themes
            </a>
          </li>

          <li>
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-200 text-base-content dark:focus:outline-none"
              href="/Settings"
            >
              <Icon icon="ci:settings" className="w-7 h-7" />
              Settings
            </a>
          </li>
          
        </ul>
        <div className="flex flex-col">
          <li className="flex flex-col pb-5">
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm bg-neutral text-base-100 rounded-lg hover:bg-base-200 hover:text-base-content dark:focus:outline-none"
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

export default adminSidebar;
