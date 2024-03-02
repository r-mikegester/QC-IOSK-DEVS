// Themes.tsx
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import ThemeSelection from "./themes/themeSelection";
import { useHistory } from "react-router-dom";
import { credits } from "../../data/creditsData";

const Themes: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-left ">{t("Themes")}</h1>
          <div className="flex justify-center mx-3 space-x-2">
            
          </div>
        </div>
        <div className="text-sm">{t("ChangeAccordingToYourPreference")}</div>
      </div>
      <div className="w-full px-4 space-y-2 h-max rounded-2xl">
        <ThemeSelection />
      </div>
    </div>
  );
};

export default Themes;
