import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Minecraft from '../../audio/Minecraft.mp3';
//import { IonFab, IonFabButton, IonFabList} from '@ionic/react';

interface ContainerProps {
    name: string;
}

const Controls: React.FC<ContainerProps> = ({ name }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (!isPlaying) {
                audio.play()?.then(() => {
                    setIsPlaying(true);
                    console.log('audio is now playing');
                }).catch((error) => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audio.pause();
                setIsPlaying(false);
                console.log('audio is now paused');
            }
        }
    };



    return (

        <div className=" w-10 z-50">
            <div
                className="relative w-screen h-screen"
            >
                <nav
                    className="z-20 flex shrink-0 grow-0 justify-around border-t border-gray-200 bg-white/50 p-3 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-3/4 -translate-y-2/4 left-6 h-auto gap-2 min-w-[64px] flex-col rounded-2xl border"
                >
                    <a

                        className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg   text-indigo-600 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300"
                    >

                        <Icon icon="iconamoon:zoom-in-bold" className="w-5 h-5" />


                    </a>

                    <a

                        className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300"
                    >

                        <Icon icon="iconamoon:zoom-out-bold" className="w-5 h-5" />


                    </a>

                    <a
                        onClick={handlePlayPause}
                        className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300"
                    >

                        <div>
                            <audio ref={audioRef} loop autoPlay>
                                <source src={Minecraft} type="audio/mpeg" />
                            </audio>

                            <label className="swap" onClick={handlePlayPause}>
                                {isPlaying ? (
                                    // Your pause icon (when audio is playing)
                                    <svg className=" fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg>
                                ) : (
                                    // Your play icon (when audio is paused)
                                    <svg className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" /></svg>

                                )}
                            </label>
                        </div>
                    </a>

                    <hr className=" bg-gray-700 my-2" />
                    <a

                        className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300"
                    >

                        <Icon icon="pepicons-pop:refresh" className="w-5 h-5" />


                    </a>

                    <a

                        className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg hover:bg-sky-700 hover:text-white  text-indigo-600 duration-200 ease-in-out dark:text-sky-300"
                    >

                        <div class="dropdown dropdown-right dropdown-end">
                            <label tabindex="0" class=" m-1"><Icon icon="akar-icons:language" className="w-5 h-5" /></label>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 ml-7 shadow bg-base-100 rounded-2xl w-40">
                                <li><a>English</a></li>
                                <li><a>Tagalog</a></li>
                            </ul>
                        </div>
                    </a>
                    <a

                        className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700  duration-200 ease-in-out dark:text-sky-300"
                    >


                        <div class="dropdown dropdown-right dropdown-end">
                            <label tabindex="0" class=" m-1"><Icon icon="typcn:info-large-outline" className="w-5 h-5" /></label>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 ml-7 shadow bg-base-100 rounded-2xl w-40">
                                <li><a>English</a></li>
                                <li><a>Tagalog</a></li>
                            </ul>
                        </div>

                    </a>


                </nav>

            </div>
        </div >

    );
};

export default Controls;
