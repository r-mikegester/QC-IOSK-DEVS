import { IonContent, IonPage } from "@ionic/react";
import SanBartolome from "../components/campus/SanBartolome";
import Dock from "../components/controls/navigationControls/dock";
import { Icon } from "@iconify/react";
import Location from "../components/controls/widgetControls/location/Location";

import { themeChange } from "theme-change";
import React, { useState, useRef, useEffect } from "react";
import Backbtn from "../components/controls/navigationControls/Backbtn";
import { useHistory } from "react-router-dom";
import Widgets from "../components/controls/widgetControls/clock/clock";
import CreditsModal from "../components/modals/CreditsModal";
import KioskModal from "../components/modals/KioskModal";
import VideoTourModal from "../components/modals/VideoTourModal";
import StatusBar from "../components/mobile/StatusBar";
import WeatherComponent from "../components/controls/widgetControls/weather/weather";
import WidgetPanel from "../components/controls/widgetControls/widgetPanel";
import Sidebar from "../components/controls/sidebarControls/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ContainerProps {
  name: string;
  buildingName: string;
}

const Map: React.FC<ContainerProps> = ({ name }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    themeChange(false);
  });
  
  const customId = "custom-id-yes";
  const notify = () =>
    toast("Wow so easy!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar bg-base-100 text-base-content rounded-2xl",
      theme: "dark",
      toastId: customId
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const history = useHistory();

  const handleStart = () => {
    // Redirect to the "/Map" route
    history.push("/Home");
  };
  const contentRef = useRef<HTMLIonContentElement>(null);

  // Assuming this is within an appropriate function or handler
const handleFloorClick = () => {
  const indexModal = document.getElementById('select_floor');
if (indexModal instanceof HTMLDialogElement && typeof indexModal.showModal === 'function') {
    indexModal.showModal();
}
}

const handleRoomClick = () => {
  const indexModal = document.getElementById('select_room');
if (indexModal instanceof HTMLDialogElement && typeof indexModal.showModal === 'function') {
    indexModal.showModal();
}
}

const handleNavigationClick = () => {
  const indexModal = document.getElementById('VideoTour');
if (indexModal instanceof HTMLDialogElement && typeof indexModal.showModal === 'function') {
    indexModal.showModal();
}
}


  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="absolute z-50 bottom-8 right-80 ">
          <div className="">
            {/* <button className="btn" onClick={notify}>Test Notification</button> */}
            <ToastContainer limit={3} />
          </div>
        </div>

        <div>
       
        </div>
        <div className="absolute top-0 left-0 z-50 ">
          <Sidebar />
        </div>

        <div className="absolute top-0 right-0 z-50 ">
          <WidgetPanel name={""} />
        </div>

        <div className="-z-[1000] cursor-move" style={{ zIndex: "-1000" }}>
          <SanBartolome name={"SanBartolome"} />
        </div>
      

        <div className="absolute bottom-10 right-10 ">
          <dialog id="SelectBuilding" className="modal">
            <div className="max-w-3xl modal-box ">
              <h3 className="text-5xl font-bold text-center">building name</h3>
              <div className="grid grid-cols-6 gap-1"></div>
              <h3 className="text-3xl font-bold text-center">Select Floor</h3>
              <div className="grid grid-cols-4 gap-4 mt-10">
                {/* <div className="justify-center w-20 py-16 m-2 text-xl text-center bg-sky-900 h-60 rounded-2xl px-auto backdrop-blur-lg ">1</div> */}
                <div className="flex flex-col w-full">
                  <div
                    className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center"
                    onClick={handleFloorClick}
                  >
                    <h3 className="text-4xl font-extrabold text-gray-900">
                      Ground
                    </h3>

                    <dialog id="select_floor" className="modal">
                      <div className="max-w-3xl modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="absolute btn btn-square hover:scale-110 left-5 top-10">
                            <Icon
                              icon="typcn:arrow-back-outline"
                              className="w-8 h-8"
                            />
                          </button>
                        </form>
                        <span>
                          <h3 className="text-5xl font-bold text-center">
                            Select Room
                          </h3>
                        </span>
                        <h3 className="text-3xl font-bold text-center">
                          2nd Floor
                        </h3>
                        <div className="grid grid-cols-4 gap-1 mt-10">
                          <div className="flex flex-col w-full">
                            <div
                              className="grid h-20 duration-200 ease-in-out bg-white shadow-lg hover:scale-110 rounded-box place-items-center"
                              onClick={handleRoomClick}
                            >
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC201
                              </h3>
                              <dialog id="select_room" className="modal">
                                <div className="absolute top-0 right-0 min-h-screen p-5 transition-transform duration-300 ease-in-out transform translate-x-0 rounded-r-none modal-box w-96 drawer-overlay ">
                                  <h3 className="text-3xl font-bold text-center">
                                    Details
                                  </h3>

                                  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-0 lg:py-5 mx-auto">
                                    <div className="grid overflow-hidden border border-gray-200 shadow-sm md:grid-cols-1 rounded-xl dark:border-gray-700">
                                      <h3 className="text-xl font-bold text-center">
                                        IC201
                                      </h3>
                                      <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                          <Icon
                                            icon="mdi:information-variant-circle-outline"
                                            className="w-10 h-10 text-gray-500"
                                          />

                                          <div className="grow">
                                            <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                              Belmonte Building
                                            </p>
                                            <h3 className="mt-1 text-xl font-semibold text-gray-500 sm:text-2xl">
                                              2nd Floor
                                            </h3>
                                            <div className="flex items-center justify-between mt-1">
                                              <p className="text-sm text-gray-500">
                                                Room:{" "}
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                  IC201
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                      <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                          <Icon
                                            icon="pepicons-pop:rewind-time"
                                            className="w-10 h-10 text-gray-500"
                                          />

                                          <div className="grow">
                                            <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                              Estimated Time of Arrival ( ETA )
                                            </p>
                                            <h3 className="mt-1 text-xl font-semibold text-gray-500 sm:text-2xl">
                                              4:26
                                            </h3>
                                            <div className="flex items-center justify-between mt-1">
                                              <p className="text-sm text-gray-500">
                                                Average:{" "}
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                  4:11
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                      <hr className="m-6 bg-gray-400" />
                                      <h3 className="text-3xl font-bold text-center">
                                        Directions
                                      </h3>
                                      <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                          <Icon
                                            icon="mdi:arrow-up-thick"
                                            className="w-10 h-10 text-gray-500"
                                          />

                                          <div className="grow">
                                            <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                              Head towards Techvoc Building
                                            </p>

                                            <div className="flex items-center justify-between mt-1">
                                              <p className="text-sm text-gray-500">
                                                Average:{" "}
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                  4:11
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                      <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                          <Icon
                                            icon="mdi:arrow-left-top-bold"
                                            className="w-10 h-10 text-gray-500"
                                          />

                                          <div className="grow">
                                            <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                              Head towards Techvoc Building
                                            </p>

                                            <div className="flex items-center justify-between mt-1">
                                              <p className="text-sm text-gray-500">
                                                Average:{" "}
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                  4:11
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                      <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                          <Icon
                                            icon="mdi:arrow-right-top-bold"
                                            className="w-10 h-10 text-gray-500"
                                          />

                                          <div className="grow">
                                            <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                              Head towards Techvoc Building
                                            </p>

                                            <div className="flex items-center justify-between mt-1">
                                              <p className="text-sm text-gray-500">
                                                Average:{" "}
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                  4:11
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                      <a className="block p-4 md:p-5 hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:first:bg-transparent dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                          <Icon
                                            icon="mdi:arrow-up-thick"
                                            className="w-10 h-10 text-gray-500"
                                          />

                                          <div className="grow">
                                            <p className="text-xs font-medium tracking-wide text-gray-800 uppercase dark:text-gray-200">
                                              Head towards Techvoc Building
                                            </p>

                                            <div className="flex items-center justify-between mt-1">
                                              <p className="text-sm text-gray-500">
                                                Average:{" "}
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                  4:11
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>

                                    <div className="absolute inset-x-0 mx-6 bottom-5">
                                      <button
                                        onClick={handleNavigationClick}
                                        className="w-full btn bg-sky-800 rounded-xl"
                                      >
                                        <Icon
                                          icon="material-symbols:moved-location-rounded"
                                          className="w-8 h-8"
                                        />
                                        Start Navigation
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC202
                              </h3>
                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-lg font-bold">Hello!</h3>
                                  <p className="py-4">
                                    Press ESC key or click outside to close
                                  </p>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC203
                              </h3>

                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-lg font-bold">Hello!</h3>
                                  <p className="py-4">
                                    Press ESC key or click outside to close
                                  </p>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC204
                              </h3>

                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-5xl font-bold text-center">
                                    Select Room
                                  </h3>
                                  <div className="grid grid-cols-6 gap-1"></div>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC205
                              </h3>

                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-lg font-bold">Hello!</h3>
                                  <p className="py-4">
                                    Press ESC key or click outside to close
                                  </p>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC206
                              </h3>
                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-lg font-bold">Hello!</h3>
                                  <p className="py-4">
                                    Press ESC key or click outside to close
                                  </p>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                IC207
                              </h3>
                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-5xl font-bold text-center">
                                    Select Room
                                  </h3>
                                  <div className="grid grid-cols-6 gap-1"></div>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                              <h3 className="text-4xl font-extrabold text-gray-900">
                                CR
                              </h3>
                              <dialog id="my_modal_2" className="modal">
                                <div className="max-w-3xl modal-box">
                                  <h3 className="text-lg font-bold">Hello!</h3>
                                  <p className="py-4">
                                    Press ESC key or click outside to close
                                  </p>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div
                    className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center"
                    onClick={handleFloorClick}
                  >
                    <h3 className="text-4xl font-extrabold text-gray-900">
                      2nd
                    </h3>
                    <dialog id="select_room" className="modal">
                      <div className="max-w-3xl modal-box">
                        <h3 className="text-5xl font-bold text-center">
                          Select Room
                        </h3>
                        <div className="grid grid-cols-6 gap-1"></div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                    <h3 className="text-4xl font-extrabold text-gray-900">
                      3rd
                    </h3>
                    <dialog id="my_modal_2" className="modal">
                      <div className="max-w-3xl modal-box">
                        <h3 className="text-lg font-bold">Hello!</h3>
                        <p className="py-4">
                          Press ESC key or click outside to close
                        </p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="grid h-20 duration-200 ease-in-out bg-white card hover:scale-110 rounded-box place-items-center">
                    <h3 className="text-4xl font-extrabold text-gray-900">
                      4th
                    </h3>
                    <dialog id="my_modal_2" className="modal">
                      <div className="max-w-3xl modal-box">
                        <h3 className="text-lg font-bold">Hello!</h3>
                        <p className="py-4">
                          Press ESC key or click outside to close
                        </p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <Dock name={"Dock"} />
        <StatusBar />
        <CreditsModal />
        <KioskModal />
        <VideoTourModal />
      </IonContent>
    </IonPage>
  );
};

export default Map;
