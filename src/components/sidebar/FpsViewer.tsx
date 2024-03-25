import { t } from "i18next";
import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/sidebar.css";
const FpsViewer: React.FC = () => {
  const [fps, setFps] = useState(0);
  const lastFrameTimeRef = useRef(performance.now());

  const updateFps = () => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTimeRef.current;
    const currentFps = Math.round(1000 / elapsedTime); // Calculate FPS

    setFps(currentFps);
    lastFrameTimeRef.current = currentTime;
  };

  useEffect(() => {
    // Request animation frame to continuously update FPS
    const frameId = requestAnimationFrame(() => {
      updateFps();
    });

    return () => {
      // Cleanup function to cancel animation frame when component unmounts
      cancelAnimationFrame(frameId);
    };
  }, [updateFps]);

  return (
    <div className="text-center sidebar-fps sidebar-icon rounded-xl">
      <span className="text-sm font-bold fps-text text-pretty">FPS:<br/> {fps}</span>
      <span className="sidebar-tooltip group-hover:scale-100">{t("Frames per Second")}</span>
    </div>
  );
};

export default FpsViewer;
