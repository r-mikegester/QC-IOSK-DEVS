import { IonContent, IonPage } from "@ionic/react";
import SanBartolome from "../components/campus/sanBartolome/SanBartolome";
import Dock from "../components/navigation/dock";
import { Icon } from "@iconify/react";
import Location from "../components/widgets/location/Location";
import { themeChange } from "theme-change";
import React, { useState, useRef, useEffect, Suspense } from "react";
import Backbtn from "../components/navigation/Backbtn";
import { useHistory } from "react-router-dom";
import Widgets from "../components/widgets/clock/clock";
import CreditsModal from "../components/modals/CreditsModal";
import KioskModal from "../components/modals/KioskModal";
import VideoTourModal from "../components/modals/VideoTourModal";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swipe from "../assets/imgs/gifs/swipe.gif";
import { manual } from "../data/manualData";
import Loading from '../components/loading';
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
      toastId: customId,
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
    const indexModal = document.getElementById("select_floor");
    if (
      indexModal instanceof HTMLDialogElement &&
      typeof indexModal.showModal === "function"
    ) {
      indexModal.showModal();
    }
  };

  const handleRoomClick = () => {
    const indexModal = document.getElementById("select_room");
    if (
      indexModal instanceof HTMLDialogElement &&
      typeof indexModal.showModal === "function"
    ) {
      indexModal.showModal();
    }
  };

  const handleEventsClick = () => {
    const eventsModal = document.getElementById("eventsModal");
    if (
      eventsModal instanceof HTMLDialogElement &&
      typeof eventsModal.showModal === "function"
    ) {
      eventsModal.showModal();
    }
  };

  function Loading2() {
    const defaultIcon = "eos-icons:three-dots-loading";

    return
    <Loading name={""} />
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

        <div></div>
        <div className="absolute top-0 left-0 z-50 ">
          <Sidebar />
        </div>

        <div className="absolute top-0 right-0 z-50 ">
          <WidgetPanel name={""} />
        </div>

        <Suspense fallback={<Loading name={""} />}>
          <div className="bg-transparent cursor-move">
            <SanBartolome name={"SanBartolome"} />
          </div>
        </Suspense>

        <div className="absolute bottom-10 right-10 ">
          <dialog id="SelectBuilding" className="modal">
            <div className="flex max-w-3xl modal-box">
              <aside className="flex flex-col px-3 py-3 pr-6 overflow-y-auto border-r w-96 h-96 text-base-content rtl:border-r-0 rtl:border-l dark:bg-base-100 ">
                <div className="flex flex-col justify-between flex-1">
                  <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-2 ">
                      <label className="px-3 text-lg font-bold uppercase ">
                        Belmonte Building
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        <button className="w-full col-span-3 text-xs btn rounded-2xl">
                          Overview
                        </button>
                        <button className="w-full col-span-1 text-xs btn rounded-2xl">
                          <Icon
                            icon="typcn:info-large-outline"
                            className="w-10 h-10"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 ">
                      <label className="px-3 text-lg font-bold uppercase ">
                        Floors
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="w-full text-xs btn rounded-2xl">
                          1st Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          2nd Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          3rd Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          4th Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          5th Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          6th Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          7th Floor
                        </button>
                        <button className="w-full text-xs btn rounded-2xl">
                          8th Floor
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </aside>
              {/* <dialog id="demoModal" className=" modal">
                {manual.map((manual, index) => (
                  <>
                    <div key={manual.id} className="modal-box">
                      <h1 className="text-xl font-bold text-base-content">
                        {manual.name}
                      </h1>
                      <div className="py-4">
                        <img src={manual.picture} />
                      </div>
                      <p>{manual.description}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </>
                ))}
              </dialog> */}
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <Dock name={"Dock"} />
        <CreditsModal />
        <KioskModal />
        <VideoTourModal />
      </IonContent>
    </IonPage>
  );
};

export default Map;
