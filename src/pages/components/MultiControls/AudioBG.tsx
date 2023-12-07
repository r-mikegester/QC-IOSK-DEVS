import { Icon } from '@iconify/react';
import React, { useState, useRef } from 'react';
import Minecraft from '../../../audio/Minecraft.mp3';
interface ContainerProps {
    name: string;
}

const AudioBG: React.FC<ContainerProps> = ({ name }) => {
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
        <div className="tooltip tooltip-right" data-tip="Play/Pause Music">
            <a
                onClick={handlePlayPause}
                className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg  text-gray-700 hover:bg-sky-700 hover:scale-125 duration-200 ease-in-out dark:text-sky-300"
            >
                <div>
                    <audio ref={audioRef} loop autoPlay>
                        <source src={Minecraft} type="audio/mpeg" />
                    </audio>

                    <label onClick={handlePlayPause}>
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
        </div>

    );
};

export default AudioBG;
