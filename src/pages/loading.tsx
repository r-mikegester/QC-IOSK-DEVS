import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import qculogo from '../assets/imgs/logo/qculogo.png';

interface ContainerProps {
  name: string;
}

const Loading: React.FC<ContainerProps> = ({ name }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const messages = ["Loading...", "Please wait...", "Almost there...", "Hang tight...", "Getting things ready...", "Rendering Chunks..."];

  // Create a state to keep track of the index of the current message
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prevProgress => {
        const newProgress = prevProgress + 6.9420;
        if (newProgress >= 100) {
          clearInterval(interval); // Stop the interval when progress reaches 100
          setTimeout(() => {
            setIsLoaded(true); // Mark as loaded after 3 seconds
          }, 3000); // Delay for 3 seconds
          return 100;
        }
        return newProgress;
      });

      // Change the message every 3 seconds
      if (loadingProgress % 33 === 0) {
        setCurrentMessageIndex(prevIndex => (prevIndex + 6) % messages.length);
      }
    }, -10); // Adjust the interval as needed for simulation
    return () => clearInterval(interval);
  }, [loadingProgress, messages.length]);

  return (
    <div className="z-50 bg-base-100 h-screen w-screen">
      <div className="grid grid-cols-3 grid-rows-3 items-center">
        <div className="flex content-center col-span-3 row-span-3 justify-center h-screen w-screen ">
          <div className="content-center">
            <div className="text-center text-base-content h-screen py-52">
              {isLoaded ? (
                // Render your content when loaded
                <div>
                  {/* Your content goes here */}
                </div>
              ) : (
                // Render loading animation
                <div className="flex flex-col justify-center items-center">
                  {/* Radial progress bar */}
                  <div className="radial-progress bg-gradient-to-tr from-accent to-primary" style={{ '--value': loadingProgress.toFixed(2), "--size": "15.5rem", "--thickness": "20px" } as any} role="progressbar">
                    <img src={qculogo} className="w-36 h-36 md:w-52 md:h-52" alt="Logo" />
                  </div>
                  {/* Loading text with two random messages */}
                  <p className="font-semibold text-3xl mt-5">
                    {loadingProgress.toFixed(2)}%
                  </p>
                  {/* Display the current message */}
                  <p className="text-sm text-gray-600 mt-2">{messages[currentMessageIndex]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
