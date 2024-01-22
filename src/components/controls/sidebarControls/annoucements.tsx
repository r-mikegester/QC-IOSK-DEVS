// Settings.tsx
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import ThemeSelection from "./themes/themeSelection";
import { useHistory } from "react-router-dom";
import { credits } from "../../../data/creditsData";

const Announcements: React.FC = () => {
  const history = useHistory();
  const ClickLogin = () => {
    history.push("/Login");
  };

  const { t } = useTranslation();
  useEffect(() => {
    themeChange(false);
  });

 
  return (
    <div className="py-10 space-y-2 bg-base-100">
    <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
      <h1 className="text-4xl font-bold text-left ">
        {t("Announcements")}
      </h1>
      <p className="text-sm ">Updates from the Campus</p>
    </div>
    <div className="px-3 space-y-2">
      <div role="alert" className="shadow-lg alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-info shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">New message!</h3>
          <div className="text-xs">You have 1 unread message</div>
        </div>
        <button className="btn bg-base-300 btn-sm">View</button>
      </div>

    </div>
  </div>
  );
};

export default Announcements;
