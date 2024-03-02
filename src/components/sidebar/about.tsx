import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { credits } from "../../data/creditsData";

const About: React.FC = () => {
  const history = useHistory();

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
        <div className="text-sm">
          {t("few things about the qc-iosk and the team behind it.")}
        </div>
      </div>
      <div className="w-full px-4 space-y-2 h-max rounded-2xl">
        {/* Purpose of QC-iosk */}
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
              <h1 className="text-2xl font-bold text-center">QC-IOSK by pathfinders.</h1>
              <div className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">Primary Objective</h1>
              <div className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg ">
                <div className="flex items-center gap-x-4">
                  <div className="grow">
                    <p className="text-base text-justify uppercase text-base-content">
                    The primary goal of this project is to create the QC-IOSK, a user-friendly navigation tool tailored for Quezon City University campuses.
                    This system aims to enhance the navigation experience for students, university staff, and visitors by providing precise location information
                    and a visual representation of the university's grounds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QC-iosk Features - Powered by Devs */}
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

          </div>
        </div>

        {/* Acknowledgements - Documentors */}
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
              <h1 className="text-2xl font-bold text-center">Project Managers</h1>
              {credits.projectManagers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">Documentators</h1>
              {credits.documentors.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">UI Designers</h1>
              {credits.uidesigners.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">Researchers</h1>
              {credits.researchers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">System Analyst</h1>
              {credits.systemAnalyst.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">3D Modelers</h1>
              {credits.modelers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
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
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">The Programmers</h1>
              {credits.programmers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                        {/* Conditionally render tooltip for Mike Gester's position */}

                      </h3>
                      <p className="text-xs uppercase text-base-content hover:group">
                        {person.position}
                        {person.name === "Mike Gester Sabuga" && (
                          <div className="z-50 tooltip group-hover:tooltip-top" data-tip="I just pull things off the Internet and put it into my code.
                            ">

                            <button className="px-2 py-1 ml-3 rounded-full bg-base-300 ">ℹ️</button>
                          </div>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">Special Thanks to:</h1>
              {credits.translator.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                        {/* Conditionally render tooltip for Mike Gester's position */}

                      </h3>
                      <p className="text-xs uppercase text-base-content hover:group">
                        {person.position}
                        {person.name === "Mike Gester Sabuga" && (
                          <div className="z-50 tooltip group-hover:tooltip-top" data-tip="I just pull things off the Internet and put it into my code.
                            ">

                            <button className="px-2 py-1 ml-3 rounded-full bg-base-300 ">ℹ️</button>
                          </div>
                        )}
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
