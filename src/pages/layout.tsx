import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
// import SanBartolome from '../components/campus/sanBartolome/SanBartolome';
const SanBartolome = lazy(() => import("../components/campus/sanBartolome/SanBartolome"))
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from './loading';
import { FpsView } from "react-fps";
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
      className: "foo-bar bg-base-100 text-base-content rounded-2xl",
      theme: "dark",
      toastId: customId,
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contentRef = useRef<HTMLIonContentElement>(null);


  function Loading2() {
    const defaultIcon = "eos-icons:three-dots-loading";

    return
    // <Loading name={""} />
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        
        <div className="absolute z-50 bottom-40 right-80 ">
          <div className="">
            <ToastContainer className="mb-1"/>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-50 ">
          <Sidebar />
        </div>
        <div className="absolute top-0 right-0 z-50 ">
          <WidgetPanel name={""} />
        </div>
        <Suspense fallback={<Loading name={""} />}>
          <div className="bg-transparent cursor-grab">
            <SanBartolome name={"SanBartolome"} />
          </div>
        </Suspense>
        {/* <Dock name={"Dock"} /> */}
        {/* <FpsView/> */}
        {/* <VideoTourModal /> */}
      </IonContent>
    </IonPage>
  );
};

export default Map;
