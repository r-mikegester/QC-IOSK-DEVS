import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
interface ContainerProps {
    name: string;
}

const Credits: React.FC<ContainerProps> = ({ name }) => {
    const { t } = useTranslation();

    const handleButtonClick = () => {
        const creditsModal = document.getElementById('Credits');
        if (creditsModal instanceof HTMLDialogElement) {
            creditsModal.showModal();
        }
    };
    return (

        <div className="tooltip tooltip-right" data-tip="Credits">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300" onClick={handleButtonClick}> <Icon icon="typcn:info-large-outline" className="w-5 h-5" /></button>

        </div >
    );
};

export default Credits;
