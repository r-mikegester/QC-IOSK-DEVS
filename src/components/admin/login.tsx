import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./dock.css";
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
    // <div className="absolute inset-x-0 h-20 mx-auto bg-gray-700 w-96 rounded-2xl bottom-5 ">
    //   <div className="absolute inset-0 items-center mx-auto tabs ">
    //     <a className="flex-col justify-center w-full h-full gap-1 scale-100 bg-gray-700 border-none btn tab rounded-2xl hover:bg-gray-600 hover:scale-90 active:scale-100 " href="/Search"><Icon icon="uil:search-alt" aria-hidden="true" className="w-8 h-8" />Search</a>
    //     <a className="flex-col justify-center w-full h-full gap-1 scale-100 bg-gray-700 border-none btn tab rounded-2xl hover:bg-gray-600 hover:scale-90 active:scale-100 tab-active" href="/Campuses"> <Icon icon="tabler:replace"aria-hidden="true" className="w-10 h-10 p-2 rounded-lg bg-gradient-to-tr from-base-100 to-base-300" />Switch</a>
    //     <a className="flex-col justify-center w-full h-full gap-1 scale-100 bg-gray-700 border-none btn tab rounded-2xl hover:bg-gray-600 hover:scale-90 active:scale-100" href="/Categories"><Icon icon="mingcute:grid-2-line" aria-hidden="true" className="w-10 h-10 p-2 rounded-lg bg-gradient-to-tr from-base-100 to-base-300" />Menu</a>
    //   </div>
    // </div>

    // <div className="fixed inline-flex items-center w-8/12 h-20 px-2 transform -translate-x-1/2 bottom-6 left-1/2 dark:border-slate-600/60 backdrop-blur-lg dark:bg-slate-800/50 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-auto rounded-2xl">

    //   <a onClick={ClickWelcome}
    //     aria-current="page"
    //     className="inline-flex flex-col items-center flex-grow w-20 h-20 p-2 text-base font-medium text-blue-300 duration-200 ease-in-out scale-100 rounded-lg hover:scale-90 to-sky-600 hover:text-white active:text-white"

    //   >
    //     <Icon icon="octicon:home-16" className="w-10 h-10 p-2 rounded-lg bg-gradient-to-tr from-base-100 to-base-300" />
    //     <small className="text-base font-medium text-center">{t("home")}</small>
    //     <span className="sr-only">Home</span>
    //   </a>
    //   {/* <a onClick={ClickMap} className="relative inline-flex flex-col items-center flex-grow px-6 py-3 text-base font-medium text-blue-300 bg-transparent border-none btn hover:bg-transparent">
    //     <div className="absolute w-24 h-24 px-5 py-6 duration-200 ease-in-out border-4 border-blue-300 group -bottom-5 bg-gradient-to-tr from-base-100 to-base-300 hover:text-white active:text-white hover:border-white dark:bg-slate-800 animate-bounce">
    //       <Icon icon="fluent-mdl2:home-group" className="w-10 h-10 p-2 duration-200 ease-in-out scale-100 focus:animate-ping group-hover:scale-90" />
    //     </div>
    //     <span className="sr-only">Map</span>
    //   </a> */}
    //   <a onClick={ClickMap}
    //     className="inline-flex flex-col items-center flex-grow w-20 h-20 p-2 text-base font-medium text-blue-300 duration-200 ease-in-out scale-100 rounded-lg hover:scale-90 to-sky-600 hover:text-white active:text-white"

    //   >
    //     <Icon icon="carbon:ibm-data-product-exchange" className="w-10 h-10 p-2 rounded-lg bg-gradient-to-tr from-base-100 to-base-300" />
    //     <small className="text-base font-medium text-center">{t("campus")}</small>
    //      <span className="sr-only">Campus</span>
    //   </a>
    //   <a onClick={ClickSearch}
    //     className="inline-flex flex-col items-center flex-grow w-20 h-20 p-2 text-base font-medium text-blue-300 duration-200 ease-in-out scale-100 rounded-lg hover:scale-90 to-sky-600 hover:text-white active:text-white"

    //   >
    //     <Icon icon="wpf:search" className="w-10 h-10 p-2 rounded-lg bg-gradient-to-tr from-base-100 to-base-300" />
    //     <small className="text-base font-medium text-center">{t("search")}</small>
    //      <span className="sr-only">Search</span>
    //   </a>

    // </div>

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
