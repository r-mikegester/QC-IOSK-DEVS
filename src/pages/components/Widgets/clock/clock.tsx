import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import "./widgetstyle.css";
import CountdownTimer from "./widgetscript";

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
      <div className="w-6/12 h-auto mx-auto flex-nowrap sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12 rounded-2xl">
        <div className="flex justify-center items-center gap-1.5">
          <div className="flex flex-col-reverse items-center justify-center space-y-10">
            <div className="flex items-center justify-center">
              <div
                className="flex flex-col space-y-[1px] rounded-xl shadow-3xl"
                data-hours
              >
                {/* <!--Top--> */}
                <span className="relative flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-tl-2xl rounded-tr-2xl text-5xl">
                  <div className="absolute flex items-end justify-start w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute flex items-end justify-end w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
                  </div>
                  <span className="translate-y-5" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-tl-2xl rounded-tr-2xl text-5xl "
                    data-flip-top
                  >
                    <div className="absolute flex items-end justify-start w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute flex items-end justify-end w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
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
                <span className="relative flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-bl-2xl rounded-br-2xl text-5xl ">
                  <div className="absolute flex items-start justify-start w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute flex items-start justify-end w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                  </div>
                  <span className="-translate-y-5" data-card-bot>
                    00
                  </span>
                  {/* <!--FlipBottom--> */}
                  <span
                    className="absolute flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-bl-2xl rounded-br-2xl text-5xl "
                    data-flip-bot
                  >
                    <div className="absolute flex items-start justify-start w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute flex items-start justify-end w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                    </div>
                    <span className="-translate-y-5" data-flip-bot-num>
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
                className="flex flex-col space-y-[1px] rounded-xl shadow-3xl"
                data-minutes
              >
                {/* <!--Top--> */}
                <span className="relative flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-tl-2xl rounded-tr-2xl text-5xl">
                  <div className="absolute flex items-end justify-start w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute flex items-end justify-end w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
                  </div>
                  <span className="translate-y-5" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-tl-2xl rounded-tr-2xl text-5xl "
                    data-flip-top
                  >
                    <div className="absolute flex items-end justify-start w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute flex items-end justify-end w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
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
                <span className="relative flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-bl-2xl rounded-br-2xl text-5xl ">
                  <div className="absolute flex items-start justify-start w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute flex items-start justify-end w-full h-full">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                  </div>
                  <span className="-translate-y-5" data-card-bot>
                    00
                  </span>

                  <span
                    className="absolute flex items-end justify-center h-10 overflow-hidden font-bold text-white w-20 bg-slate-800/30 backdrop-blur-lg rounded-bl-2xl rounded-br-2xl text-5xl "
                    data-flip-bot
                  >
                    <div className="absolute flex items-start justify-start w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute flex items-start justify-end w-full h-full">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                    </div>
                    <span className="-translate-y-5" data-flip-bot-num>
                      00
                    </span>
                    <div className="fixed text-xs font-bold right-3 bottom-2">
                      {period}
                    </div>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockPane;
