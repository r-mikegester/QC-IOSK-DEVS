// import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import manualImg from "../../../assets/imgs/kiosk.png";
import { Icon } from "@iconify/react";
import manual from '../../../data/manualData.ts';

interface ContainerProps {
    name: string;
}

const KioskManual: React.FC<ContainerProps> = ({ name }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const { t } = useTranslation();

    const handleViewDemoClick = () => {
        const indexModal = document.getElementById("demoModal");
        if (
            indexModal instanceof HTMLDialogElement &&
            typeof indexModal.showModal === "function"
        ) {
            indexModal.showModal();
        }

    }

    return (
        <div className="h-screen py-10 mb-20 space-y-2 bg-base-100">
            <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
                <h1 className="text-4xl font-bold text-left ">
                    {t("KioskManual")}
                </h1>
                <p className="text-sm 0">Guides for using Gestures on QCIOSK</p>
            </div>

            <div className="px-3 space-y-2">
                {manual.map((manual, index) => (
                    <div key={index}>
                        <div onClick={handleViewDemoClick} className="flex items-center justify-between h-full p-3 px-6 shadow-md btn-block btn bg-base-300 rounded-2xl">

                            <div className="text-lg">{manual.name}</div>
                            <div className="">
                                <Icon icon={manual.icon} className="w-10 h-10" />
                            </div>
                        </div>
                    </div>
                ))}
               
            </div>

        </div>
    );
};

export default KioskManual;
