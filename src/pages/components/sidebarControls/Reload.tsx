import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';

interface ContainerProps {
    name: string;
}

const Reload: React.FC<ContainerProps> = ({ name }) => {
  
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className="sidebar-icon group" onClick={reloadPage}>
        <a
            
            className="text-sky-300"
        >

            <Icon icon="pepicons-pop:refresh" className="w-5 h-5" />

        </a>
        <span className="sidebar-tooltip group-hover:scale-100">Refresh</span>
    </div>

    );
};

export default Reload;
