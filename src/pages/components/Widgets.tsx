import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';

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
      const newHours = String(now.getHours()).padStart(2, '0');
      const newMinutes = String(now.getMinutes()).padStart(2, '0');
      const newPeriod = newHours >= 12 ? 'PM' : 'AM';

      setHours(newHours);
      setMinutes(newMinutes);
      setPeriod(newPeriod);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex fixed top-36 -right-24 h-auto transform -translate-x-1/2 mx-auto dark:border-slate-600/60 backdrop-blur-lg dark:bg-slate-800/50 w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-auto rounded-2xl">
      <div className=" rounded-2xl shadow-2xl font-mono font-bold text-7xl text-white grid grid-cols-2 gap-x-px">
        <div className="relative  rounded-2xl p-8">

          <div className="absolute inset-0 grid grid-rows-2">
            <div className="bg-gradient-to-br rounded-t-2xl from-gray-800/30 to-slate-900/30"></div>
            <div className="bg-gradient-to-br rounded-b-2xl from-gray-700/30 to-slate-900/30"></div>
          </div>
          <span className="relative">{hours}</span>
          <div className="absolute inset-0 flex items-center">
            <div className="h-1 w-full bg-gray-700/30"></div>
          </div>
        </div>
        <div className="relative  rounded-2xl p-8">

          <div className="absolute inset-0 grid grid-rows-2">
            <div className="bg-gradient-to-br rounded-t-2xl from-gray-800/30 to-slate-900/30"></div>
            <div className="bg-gradient-to-br rounded-b-2xl from-gray-700/30 to-slate-900/30"></div>
          </div>
          <span className="relative">{minutes}</span>
          <div className="absolute inset-0 flex items-center">
            <div className="h-1 w-full bg-gray-700/30"></div>
          </div>
        </div>

      </div>
      {/* <div className="text-lg">{period}</div> */}
    </div>
  );
};

export default Widgets;
