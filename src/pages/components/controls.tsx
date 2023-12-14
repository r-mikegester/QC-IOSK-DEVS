import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import ChangeLanguage from './MultiControls/ChangeLanguage';
import Credits from './MultiControls/Credits';
import KioskManual from './MultiControls/KioskManual';
import Reload from './MultiControls/Reload';
import AudioBG from './MultiControls/AudioBG';
interface ContainerProps {
    name: string;
}

const Controls: React.FC<ContainerProps> = ({ name }) => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className=" w-10 z-50">
            <div
                className="relative w-screen h-screen"
            >
                <nav
                    className="z-20 flex shrink-0 grow-0 justify-around border-t border-gray-200 bg-white/50 p-3 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-96 mt-52 md:mt-0 md:top-3/4 -translate-y-2/4 left-6 h-auto gap-2 min-w-[64px] flex-col rounded-2xl border"
                >
                    <KioskManual  name={'KioskManual'} />
                    <AudioBG name={'AudioBG'} />
                    <Reload  name={'Reload'} />
                    
                    <hr className=" bg-sky-400 my-2" />
                   
                    <ChangeLanguage name={'ChangeLanguage'} />
                  
                    <Credits name={'credits'} />
                  
                </nav>

            </div>
            
        </div >
    );
};

export default Controls;
