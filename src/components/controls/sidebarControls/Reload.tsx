import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

interface ContainerProps {
    name: string;
}

const Reload: React.FC<ContainerProps> = ({ name }) => {
    const { t } = useTranslation();
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className="sidebar-icon group" onClick={reloadPage}>
        <a
            
            className="text-base-content"
        >

            <Icon icon="mi:refresh" className="w-8 h-8" />

        </a>
        <span className="sidebar-tooltip group-hover:scale-100">{t("Refresh")}</span>
    </div>

    );
};

export default Reload;
