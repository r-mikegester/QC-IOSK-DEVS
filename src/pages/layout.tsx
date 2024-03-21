import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { themeChange } from "theme-change";
import { Icon } from "@iconify/react";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from './loading';
import SanBartolome from "../components/campus/sanBartolome/SanBartolome";

// Import your components here
// const SanBartolome = lazy(() => import("../components/campus/sanBartolome/SanBartolome"));
// const Batasan = lazy(() => import("../components/campus/batasan/Batasan"));
// const SanFrancisco = lazy(() => import("../components/campus/sanFrancisco/SanFrancisco"));

interface ContainerProps {
  name: string;
  buildingName: string;
}

const layout: React.FC<ContainerProps> = ({ name }) => {
  const notify = () =>
    toast("Wow so easy!", {
      className: "foo-bar bg-base-100 text-base-content rounded-2xl",
      theme: "dark",
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Your other components */}
        <div className="absolute z-50 bottom-40 right-80 ">
          <div className="">
            <ToastContainer className="mb-1" newestOnTop />
          </div>
        </div>
        <div className="absolute top-0 left-0 z-50 ">
          <Sidebar />
        </div>
        <div className="absolute top-0 right-0 z-50 ">
          <WidgetPanel name={""} />
        </div>

        {/* Selection mechanism */}


        {/* Rendering selected option */}
        <Suspense fallback={<Loading />}>
          <div className=" cursor-grab">
            <SanBartolome name={""} />
          </div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default layout;
