import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";

interface ContainerProps {
    name: string;
}

const KioskManual: React.FC<ContainerProps> = ({ name }) => {
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
        <div className="sidebar-icon group" onClick={() => {
                    const element = document.getElementById('KioskManual');
                    if (element instanceof HTMLDialogElement) {
                        element.showModal();
                    } else {
                        // Handle the case where the element isn't a dialog element
                    }
                }}>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
                className=""
                
            >
                <Icon icon="streamline:manual-book" className="w-6 h-6 text-base-content" />
            </button>
            <span className="sidebar-tooltip group-hover:scale-100">{t("KioskManual")}</span>
        </div>
    );
};

export default KioskManual;
