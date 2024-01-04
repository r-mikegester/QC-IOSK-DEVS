// Settings.tsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import LightThemes from "../themes/lightThemes";
import DarkThemes from "../themes/darkThemes";
import { useTranslation } from "react-i18next";
import ThemesSelection from "../themes/themesSelection";

const Settings: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    themeChange(false);
  });
  return (
    <div className="h-screen py-10 bg-base-100 text-base-content">
      <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out ">
        <div className="flex items-baseline justify-between ">
          <h1 className="text-4xl font-bold text-left ">{t("Settings")}</h1>
          <div className="flex justify-center space-x-2">
            <a className="btn-square btn">
              <Icon
                icon="healthicons:i-certificate-paper-outline"
                className="w-8 h-8 "
                
              />
            </a>
            <a href="" className="btn-square btn">
              {" "}
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
              <ThemesSelection />
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
            <Icon icon="healthicons:i-certificate-paper-outline" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">Credits</p>
          </div>
          <div className="collapse-content">
            <div className="py-4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
