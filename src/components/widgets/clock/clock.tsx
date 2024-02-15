import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import "../../../assets/css/clockstyle.css";
import CountdownTimer from "./clockscript";

interface ContainerProps {
  name: string;
}

const ClockPane: React.FC<ContainerProps> = ({ name }) => {
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let newHours = now.getHours();
      const newMinutes = String(now.getMinutes()).padStart(2, "0");
      const newPeriod = newHours >= 12 ? "PM" : "AM";

      if (newHours > 12) {
        newHours -= 12; // Convert to 12-hour format
      } else if (newHours === 0) {
        newHours = 12; // Midnight should be 12 AM
      }

      setHours(String(newHours).padStart(2, "0"));
      setMinutes(newMinutes);
      setPeriod(newPeriod);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <CountdownTimer />
      <div className="w-auto h-auto rounded-lg ">
        <div className="flex justify-end items-center gap-1.5">
          <div className="flex flex-col-reverse items-center justify-center space-y-10">
            <div className="flex items-center justify-center">
              <div
                className="flex flex-col space-y-[1px] rounded-2xl shadow-3xl"
                data-hours
              >
                {/* <!--Top--> */}
                <span className="relative flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-neutral-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-tl-xl rounded-tr-xl">
                  <div className="absolute flex items-end justify-start w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-tr-full bg-neutral"></div>
                  </div>
                  <div className="absolute flex items-end justify-end w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-tl-full bg-neutral"></div>
                  </div>
                  <span className="translate-y-5" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-tl-xl rounded-tr-xl "
                    data-flip-top
                  >
                    <div className="absolute flex items-end justify-start w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-tr-full bg-neutral"></div>
                    </div>
                    <div className="absolute flex items-end justify-end w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-tl-full bg-neutral"></div>
                    </div>
                    <span
                      className="translate-y-5"
                      data-flip-top-num
                      data-card-top
                    >
                      00
                    </span>
                  </span>
                </span>
                {/* <!--Bottom--> */}
                <span className="relative flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-bl-xl rounded-br-xl ">
                  <div className="absolute flex items-start justify-start w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-br-full bg-neutral"></div>
                  </div>
                  <div className="absolute flex items-start justify-end w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-bl-full bg-neutral"></div>
                  </div>
                  <span className="-translate-y-1" data-card-bot>
                    00
                  </span>
                  {/* <!--FlipBottom--> */}
                  <span
                    className="absolute flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-bl-xl rounded-br-xl "
                    data-flip-bot
                  >
                    <div className="absolute flex items-start justify-start w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-br-full bg-neutral"></div>
                    </div>
                    <div className="absolute flex items-start justify-end w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-bl-full bg-neutral"></div>
                    </div>
                    <span className="-translate-y-1" data-flip-bot-num>
                      00
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* <!--MINUTES--> */}
          <div className="flex flex-col-reverse items-center justify-center space-y-10">
            <div className="flex items-center justify-center">
              <div
                className="flex flex-col space-y-[1px] rounded-2xl shadow-3xl"
                data-minutes
              >
                {/* <!--Top--> */}
                <span className="relative flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-tl-xl rounded-tr-xl">
                  <div className="absolute flex items-end justify-start w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-tr-full bg-neutral"></div>
                  </div>
                  <div className="absolute flex items-end justify-end w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-tl-full bg-neutral"></div>
                  </div>
                  <span className="translate-y-5" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-tl-xl rounded-tr-xl "
                    data-flip-top
                  >
                    <div className="absolute flex items-end justify-start w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-tr-full bg-neutral"></div>
                    </div>
                    <div className="absolute flex items-end justify-end w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-tl-full bg-neutral"></div>
                    </div>
                    <span
                      className="translate-y-5"
                      data-flip-top-num
                      data-card-top
                    >
                      00
                    </span>
                  </span>
                </span>
                {/** Bottom */}
                <span className="relative flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-bl-xl rounded-br-xl ">
                  <div className="absolute flex items-start justify-start w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-br-full bg-neutral"></div>
                  </div>
                  <div className="absolute flex items-start justify-end w-full h-full">
                    <div className="w-[3px] h-[2px] rounded-bl-full bg-neutral"></div>
                  </div>
                  <span className="-translate-y-1" data-card-bot>
                    00
                  </span>

                  <span
                    className="absolute flex items-end justify-center w-12 h-6 overflow-hidden text-3xl font-bold text-base-content bg-gradient-to-tr from-accent to-base-100 backdrop-blur-lg rounded-bl-xl rounded-br-xl "
                    data-flip-bot
                  >
                    <div className="absolute flex items-start justify-start w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-br-full bg-neutral"></div>
                    </div>
                    <div className="absolute flex items-start justify-end w-full h-full">
                      <div className="w-[3px] h-[2px] rounded-bl-full bg-neutral"></div>
                    </div>
                    <span className="-translate-y-1" data-flip-bot-num>
                      00
                    </span>
                    
                  </span>
                </span><div className="fixed font-bold text-[6px] top-3 right-3">
                      {period}
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPane;
