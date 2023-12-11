import { Icon } from '@iconify/react';
import React from 'react';
interface ContainerProps {
    name: string;
}

const KioskManual: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="tooltip tooltip-top" data-tip="Kiosk Manual">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300" onClick={() => document.getElementById('KioskManual').showModal()}> <Icon icon="streamline:manual-book" className="w-5 h-5" /></button>
            
        </div >

    );
};

export default KioskManual;
