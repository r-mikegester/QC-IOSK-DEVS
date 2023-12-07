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
        <div className="tooltip tooltip-right" data-tip="Refresh">
        <a
            onClick={reloadPage}
            className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300"
        >

            <Icon icon="pepicons-pop:refresh" className="w-5 h-5" />

        </a>
    </div>

    );
};

export default Reload;
