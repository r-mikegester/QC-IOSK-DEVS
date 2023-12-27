import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import Theme from "../../../../assets/audio/LittleRootTown-Theme2.mp3";
import '../../sidebarControls/sidebar.css';
interface ContainerProps {
  name: string;
  volume: number; // Adding the volume prop
  // Other props if present
}

const AudioBG: React.FC<ContainerProps> = ({ name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio
          .play()
          ?.then(() => {
            setIsPlaying(true);
            console.log("audio is now playing");
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      } else {
        audio.pause();
        setIsPlaying(false);
        console.log("audio is now paused");
      }
    }
  };

  return (
    <div className="sidebar-icon group" onClick={handlePlayPause}>
      <a
        
        className="text-sky-300"
      >
        <div>
          <audio ref={audioRef} loop autoPlay>
            <source src={Theme} type="audio/mpeg" />
          </audio>

          <label onClick={handlePlayPause}>
            {isPlaying ? (
              // Your pause icon (when audio is playing)
              <Icon icon="iconamoon:player-pause-bold" className="w-6 h-6" />
            ) : (
              // Your play icon (when audio is paused)
              <Icon icon="iconamoon:player-play-bold" className="w-6 h-6"  />
            )}
          </label>
        </div>
      </a>
      <span className="sidebar-tooltip group-hover:scale-100">Play / Pause</span>
    </div>
  );
};

export default AudioBG;
