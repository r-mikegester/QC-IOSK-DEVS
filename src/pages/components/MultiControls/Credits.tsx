import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
interface ContainerProps {
    name: string;
}

const Credits: React.FC<ContainerProps> = ({ name }) => {
    const { t } = useTranslation();
    return (

        <div className="tooltip tooltip-bottom" data-tip="Credits">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300" onClick={() => document.getElementById('Credits').showModal()}> <Icon icon="typcn:info-large-outline" className="w-5 h-5" /></button>
            <dialog id="Credits" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">CREDITS</h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div >
    );
};

export default Credits;
