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
import VideoTourModal from "../components/modals/VideoTourModal";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swipe from "../assets/imgs/gifs/swipe.gif";
import { manual } from "../data/manualData";
import Loading from './loading';
interface ContainerProps {
  name: string;
  buildingName: string;
}

const Map: React.FC<ContainerProps> = ({ name }) => {
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


  const history = useHistory();

  const handleStart = () => {
    // Redirect to the "/Map" route
    history.push("/Home");
  };
  const contentRef = useRef<HTMLIonContentElement>(null);


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
            <ToastContainer />
          </div>
        </div>
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
        <Dock name={"Dock"} />
        <VideoTourModal />
      </IonContent>
    </IonPage>
  );
};

export default Map;
