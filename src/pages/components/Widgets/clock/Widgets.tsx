import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import './widgetstyle.css';
import CountdownTimer from './widgetscript';

interface ContainerProps {
  name: string;
}

const Widgets: React.FC<ContainerProps> = ({ name }) => {
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [period, setPeriod] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let newHours = now.getHours();
      const newMinutes = String(now.getMinutes()).padStart(2, '0');
      const newPeriod = newHours >= 12 ? 'PM' : 'AM';

      if (newHours > 12) {
        newHours -= 12; // Convert to 12-hour format
      } else if (newHours === 0) {
        newHours = 12; // Midnight should be 12 AM
      }

      setHours(String(newHours).padStart(2, '0'));
      setMinutes(newMinutes);
      setPeriod(newPeriod);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="">
      <CountdownTimer />
      <div className="flex flex-nowrap fixed top-32 md:-right-[118px]  h-auto xl:-translate-x-1/2 mx-auto   w-6/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12 rounded-2xl">
        <div className="flex justify-center items-center gap-1.5">
          <div className="flex flex-col-reverse justify-center items-center space-y-10">

            <div className="flex justify-center items-center">
              <div className="flex flex-col space-y-[1px] rounded-xl shadow-3xl" data-hours>
                {/* <!--Top--> */}
                <span className="relative w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg
                         rounded-tl-2xl rounded-tr-2xl flex justify-center items-end text-8xl font-bold">
                  <div className="absolute w-full h-full flex justify-start items-end">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-end">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
                  </div>
                  <span className="translate-y-10" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span className="absolute w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg
                             rounded-tl-2xl rounded-tr-2xl flex justify-center items-end text-8xl font-bold " data-flip-top>
                    <div className="absolute w-full h-full flex justify-start items-end">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-end">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
                    </div>
                    <span className="translate-y-10" data-flip-top-num data-card-top>
                      00
                    </span>
                  </span>
                </span>
                {/* <!--Bottom--> */}
                <span className="relative w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg 
                        rounded-bl-2xl rounded-br-2xl flex justify-center items-end text-8xl font-bold ">
                  <div className="absolute w-full h-full flex justify-start items-start">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-start">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                  </div>
                  <span className="-translate-y-10" data-card-bot>00</span>
                  {/* <!--FlipBottom--> */}
                  <span className="absolute w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg 
                            rounded-bl-2xl rounded-br-2xl flex justify-center items-end text-8xl font-bold " data-flip-bot>
                    <div className="absolute w-full h-full flex justify-start items-start">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-start">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                    </div>
                    <span className="-translate-y-10" data-flip-bot-num>00</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* <!--MINUTES--> */}
          <div className="flex flex-col-reverse justify-center items-center space-y-10">
            <div className="flex justify-center items-center">
              <div className="flex flex-col space-y-[1px] rounded-xl shadow-3xl" data-minutes>
                {/* <!--Top--> */}
                <span className="relative w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg
                         rounded-tl-2xl rounded-tr-2xl flex justify-center items-end text-8xl font-bold">
                  <div className="absolute w-full h-full flex justify-start items-end">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-end">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
                  </div>
                  <span className="translate-y-10" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span className="absolute w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg
                             rounded-tl-2xl rounded-tr-2xl flex justify-center items-end text-8xl font-bold " data-flip-top>
                    <div className="absolute w-full h-full flex justify-start items-end">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-end">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-slate-800/30"></div>
                    </div>
                    <span className="translate-y-10" data-flip-top-num data-card-top>
                      00
                    </span>
                  </span>
                </span>
                {/** Bottom */}
                <span className="relative w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg 
                        rounded-bl-2xl rounded-br-2xl flex justify-center items-end text-8xl font-bold ">
                  <div className="absolute w-full h-full flex justify-start items-start">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-start">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                  </div>
                  <span className="-translate-y-10" data-card-bot>00</span>

                  <span className="absolute w-36 h-20 text-white bg-slate-800/30 overflow-hidden backdrop-blur-lg 
                            rounded-bl-2xl rounded-br-2xl flex justify-center items-end text-8xl font-bold " data-flip-bot>
                    <div className="absolute w-full h-full flex justify-start items-start">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-slate-800/30"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-start">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-slate-800/30"></div>
                    </div>
                    <span className="-translate-y-10" data-flip-bot-num>00</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-lg font-bold absolute bottom-3 left-3">{period}</div>
      </div>

    </div>
  );
};

export default Widgets;
