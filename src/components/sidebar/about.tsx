// About.tsx
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { credits } from "../../data/creditsData";

const About: React.FC = () => {
  const history = useHistory();
  const ClickLogin = () => {
    history.push("/Login");
  };

  const { t } = useTranslation();
  useEffect(() => {
    themeChange(false);
  });


  return (
    <div className="h-full py-10 bg-base-100 text-base-content">
      <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100 ">
        <div className="flex items-baseline justify-between ">
          <h1 className="text-4xl font-bold text-left ">{t("About")}</h1>

        </div>
        <div className="text-sm">{t("few things about the qc-iosk and the team behind it.")}</div>
      </div>
      <div className="w-full px-4 space-y-2 h-max rounded-2xl">
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-300 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="humbleicons:certificate" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">Purpose of QC-iosk</p>
          </div>
          <div className="collapse-content bg-base-200">
            <div className="py-4 mx-auto">
              <h1 className="text-2xl text-center">QC-IOSK by pathfinders.</h1>
                <div
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4">
                    <div className="grow">
                      <p className="text-base text-justify uppercase text-base-content">
                        We developed the QC-IOSK (Kiosk for Quezon City University) with the primary aim of enhancing navigation within the university campus.
                        Despite not being extensive, the campus layout can be confusing, particularly for newcomers. 
                        Navigating through various buildings and seeking assistance from individuals who might inadvertently provide incorrect information or 
                        explanations that are difficult to comprehend can be challenging. Therefore, the creation of the QC-IOSK serves as a solution to this issue, 
                        providing accurate and accessible information to aid students and visitors in navigating the campus effectively and efficiently.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-300 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="tabler:adjustments-star" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">QC-iosk Features</p>
          </div>
          <div className="collapse-content bg-base-200">
            <div className="py-4 mx-auto">
              <h1 className="text-2xl text-center">Powered by: Devs</h1>
              {credits.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    {/* <img
                      className="object-cover w-10 h-10 mx-5 rounded-2xl"
                      src={person.picture}
                      alt={person.name}
                    /> */}
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-300 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="humbleicons:certificate" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">Acknowledgements</p>
          </div>
          <div className="collapse-content bg-base-200">
            <div className="py-4 mx-auto">
              <h1 className="text-2xl text-center">Powered by: Devs</h1>
              {credits.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    {/* <img
                      className="object-cover w-10 h-10 mx-5 rounded-2xl"
                      src={person.picture}
                      alt={person.name}
                    /> */}
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
