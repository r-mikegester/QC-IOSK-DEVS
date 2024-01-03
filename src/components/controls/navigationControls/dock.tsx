import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../assets/css/dock.css";
interface ContainerProps {
  name: string;
}

const Dock: React.FC<ContainerProps> = ({ name }) => {
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
    
    <div className="fixed bottom-0 w-auto menu">
      {/* <ul className="flex w-auto p-0 m-0 list-none bg-gray-900 shadow-md rounded-2xl">
        <li>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center text-lg text-white font-poppins h-70 w-70"
          >
            <span className="absolute flex items-center justify-center transition duration-500 transform -translate-x-1/2 -translate-y-1/2 icon top-1/2 left-1/2 w-50 h-50">
              <Icon
                icon="octicon:home-16"
                className="p-2 rounded-lg w-14 h-14 bg-gradient-to-tr from-base-100 to-base-300"
              />
            </span>
            <span className="absolute text-sm transition duration-500 transform -translate-x-1/2 -translate-y-1/2 opacity-0 title top-1/2 left-1/2">
              Home
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center text-lg text-white font-poppins h-70 w-70"
          >
            <span className="absolute flex items-center justify-center transition duration-500 transform -translate-x-1/2 -translate-y-1/2 icon top-1/2 left-1/2 w-50 h-50">
              <Icon
                icon="carbon:ibm-data-product-exchange"
                className="p-2 rounded-lg w-14 h-14 bg-gradient-to-tr from-base-100 to-base-300"
              />
            </span>
            <span className="absolute text-sm transition duration-500 transform -translate-x-1/2 -translate-y-1/2 opacity-0 title top-1/2 left-1/2">
              Maps
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center text-lg text-white font-poppins h-70 w-70"
          >
            <span className="absolute flex items-center justify-center transition duration-500 transform -translate-x-1/2 -translate-y-1/2 icon top-1/2 left-1/2 w-50 h-50">
              <Icon
                icon="wpf:search"
                className="p-2 rounded-lg w-14 h-14 bg-gradient-to-tr from-base-100 to-base-300"
              />
            </span>
            <span className="absolute text-sm transition duration-500 transform -translate-x-1/2 -translate-y-1/2 opacity-0 title top-1/2 left-1/2">
              Search
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="relative flex flex-col items-center justify-center text-lg text-white font-poppins h-70 w-70"
          >
            <span className="absolute flex items-center justify-center transition duration-500 transform -translate-x-1/2 -translate-y-1/2 icon top-1/2 left-1/2 w-50 h-50">
              <Icon
                icon="octicon:home-16"
                className="p-2 rounded-lg w-14 h-14 bg-gradient-to-tr from-base-100 to-base-300"
              />
            </span>
            <span className="absolute text-sm transition duration-500 transform -translate-x-1/2 -translate-y-1/2 opacity-0 title top-1/2 left-1/2">
              Campus
            </span>
          </a>
        </li>
      </ul> */}

      <div className="w-auto h-20 my-2 shadow-md bg-base-100/50 backdrop-blur-lg rounded-2xl">
        <div className="px-2 py-2 space-x-1">
          <div className="tooltip " data-tip={t("Home")}>
            <a onClick={ClickWelcome} className="">
              <div className="w-16 h-16 duration-150 ease-in-out border border-none group btn bg-gradient-to-tr rounded-xl hover:-translate-y-5 from-base-100 to-base-300">
                <Icon icon="octicon:home-16" className="w-10 h-10 " />
                {/* <span className="-mt-5 text-xs duration-150 ease-in-out group-hover:mt-1 -z-50">{t("home")}</span> */}
              </div>
            </a>
          </div>
          <div className="tooltip " data-tip={t("Maps")}>
            <a
              onClick={ClickMap}
              className="w-16 h-16 duration-150 ease-in-out border-none btn group hover:-translate-y-5 bg-gradient-to-tr rounded-xl from-base-100 to-base-300"
            >
              <Icon
                icon="carbon:ibm-data-product-exchange"
                className="w-10 h-10 "
              />
              {/* <span className="-mt-5 text-xs duration-150 ease-in-out group-hover:mt-1 -z-50">Maps</span> */}
            </a>
          </div>
          <div className="tooltip " data-tip={t("Search")}>
            <a
              onClick={ClickSearch}
              className="w-16 h-16 duration-150 ease-in-out border-none btn group hover:-translate-y-5 bg-gradient-to-tr rounded-xl from-base-100 to-base-300"
            >
              <Icon icon="wpf:search" className="w-10 h-10 " />
              {/* <span className="-mt-5 text-xs duration-150 ease-in-out group-hover:mt-1 -z-50">{t("search")}</span> */}
            </a>
          </div>
          {/* <a className="w-16 h-16 duration-150 ease-in-out border-none btn group hover:-translate-y-5 bg-gradient-to-tr rounded-xl from-base-100 to-base-300">
            <Icon icon="octicon:home-16" className="w-10 h-10 " />
            <span className="-mt-5 text-xs duration-150 ease-in-out group-hover:mt-1 -z-50">Others</span>
          </a> */}
        </div>
        {/* <div className="w-auto h-10 bg-sky-700 rounded-xl"></div> */}
      </div>
    </div>
  );
};

export default Dock;