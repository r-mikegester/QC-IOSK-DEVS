import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
interface ContainerProps {
    name: string;
}

const BuildingModal: React.FC<ContainerProps> = ({ name }) => {
    const { t } = useTranslation();
    return (

        <button onClick={toggleModal} className="bg-blue-500 text-white py-2 px-4 rounded">
        <Icon icon="streamline:manual-book" className="w-5 h-5" />
        </button>
    );
};

export default BuildingModal;
