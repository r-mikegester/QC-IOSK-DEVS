import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSelection from "../../sidebar/themes/themeSelection";
import { themeChange } from "theme-change";
// import Reload from '../../../controls/sidebar/Reload';
interface ContainerProps {
  name: string;
}

const adminHeader: React.FC<ContainerProps> = ({ name }) => {
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
    themeChange(false);
  });
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start text-base-content sm:flex-nowrap z-[48] w-full bg-base-300 border-b text-sm py-2.5 sm:py-4 lg:ps-64 border-base-300">
      <nav
        className="flex items-center w-full px-4 mx-auto basis-full sm:px-6 md:px-4"
        aria-label="Global"
      >
        <div className="me-5 lg:me-0 lg:hidden">
          <a
            className="flex-none text-xl font-semibold "
            href="#"
            aria-label="Brand"
          >
            QC-IOSK
          </a>
        </div>


        <div className="flex flex-row-reverse items-center justify-end w-full ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <div className="flex flex-row items-center justify-end gap-2">

            <button onClick={reloadPage} className="flex justify-center btn btn-circle bg-base-100 tooltip"  >
              <Icon icon="mi:refresh" className="w-8 h-8" />
            </button>

            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="w-12 shadow-md btn bg-base-100 btn-circle "><Icon icon="tdesign:palette" className="w-7 h-7" /></div>
              <ul tabIndex={0} className="dropdown-content m-0 z-[1] bg-base-300 text-base-content  shadow h-64 rounded-box w-96 mt-10">
                <ThemeSelection />
              </ul>
            </div>

          </div>
        </div>

      </nav>
    </header>
  );
};

export default adminHeader;
