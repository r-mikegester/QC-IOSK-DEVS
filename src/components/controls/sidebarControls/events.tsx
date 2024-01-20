import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import manualImg from "../../../assets/imgs/kiosk.png";

interface ContainerProps {
    name: string;
}

const Events: React.FC<ContainerProps> = ({ name }) => {
      const { t } = useTranslation();
    useEffect(() => {
        const dialogElement = document.getElementById('yourDialogId');
        if (dialogElement instanceof HTMLDialogElement) {
            dialogElement.showModal();
        } else {
            // Handle the case where the element isn't a dialog element
        }
    }, []); // Run this effect only once after the component mounts

    return (
      <div className="h-screen py-10 space-y-2 bg-base-100">
      <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
        <h1 className="text-4xl font-bold text-left ">{t("Events")}</h1>
        <p className="text-sm 0">
          Showing Events for the month of January
        </p>
      </div>
      <div className="px-3 space-y-2">
        <div className="w-full h-auto bg-base-300 rounded-2xl">
          <div>
            <div className="w-auto shadow-xl card bg-base-100 image-full">
              <figure>
                <img
                  src={manualImg}
                  alt="Kiosk Manual"
                  className=""
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">Marahuyo</h2>
                <p>Most Awaited Event of QCUians</p>
                <div className="justify-end card-actions">
                  <button className="btn ">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    );
};

export default Events;
