// Settings.tsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import ThemeSelection from "../themes/themeSelection";
import { useHistory } from "react-router-dom";
import { credits } from "../../../../data/creditsData";


const Settings: React.FC = () => {
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
      <div className="sticky bg-base-100 top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out ">
        <div className="flex items-baseline justify-between ">
          <h1 className="text-4xl font-bold text-left ">{t("Settings")}</h1>
          <div className="flex justify-center mx-3 space-x-2">
            <a onClick={ClickLogin} className="btn-square btn p-2 hover:bg-base-300 tooltip tooltip-left" data-tip={t("Admin Login")}>
              <Icon icon="mdi:administrator" className="w-8 h-8 " />
            </a>
          </div>
        </div>
        <div className="text-sm">{t("ChangeAccordingToYourPreference")}</div>
      </div>
      <div className="w-full px-4 space-y-2 h-max rounded-2xl">
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-200 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="mdi:paint-outline" className=" w-7 h-7" />
            <p className="ml-3">Appearance</p>
          </div>
          <div className="collapse-content">
            <div className="py-4 mx-auto">
              {/* <p className="ml-3">Dark Themes</p> */}
              <ThemeSelection />
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-200 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="grommet-icons:volume-control" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">Sounds</p>
          </div>
          <div className="collapse-content">
            <div className="py-4 mx-auto"></div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-200 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="humbleicons:certificate" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">Credits</p>
          </div>
          <div className="collapse-content">
            <div className="py-4 mx-auto">
              <h1 className="text-2xl text-center">Powered by: Devs</h1>
              {credits.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4">
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

export default Settings;
