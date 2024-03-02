import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ContainerProps {
  name: string;
}

const ChangeLanguage: React.FC<ContainerProps> = ({ name }) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  const [borderStyles, setBorderStyles] = useState<Record<string, string>>({
    en: "",
    tg: "",
    fr: "",
    bsy: "",
    jpn: "",
    vn: "",
    cmd: "",
    kr: "",
    gmy: "",
    thai: "",
    // Add other languages and their initial border styles here
  });

  const handleLanguageChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    language: string
  ) => {
    e.preventDefault();
    setSelectedLanguage(language);
    i18n.changeLanguage(language);

    
    const clearWaitingQueue = () => {
      // Easy, right 😎
      toast.clearWaitingQueue();
    }
    
    // Display a toast message when the language is changed
    toast.success(`Selected language: ${language}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: " bg-base-100 text-base-content font-bold rounded-2xl",
      theme: "dark",
      autoClose: 1000,
      icon: <Icon icon="line-md:clipboard-check" className="w-10 h-10 text-xl" />,
      progressClassName: "bg-accent rounded-full mx-3 mb-1 w-72", // 3000 milliseconds = 3 seconds
    
    });

    
    // Additional logic can be added here if needed upon language change
    // Update border styles based on the selected language
    const updatedBorderStyles: Record<string, string> = {};
    Object.keys(borderStyles).forEach((lang) => {
      updatedBorderStyles[lang] =
        lang === language
          ? "border-2 border-emerald-500"
          : "border-2 border-emerald-500";
    });
    setBorderStyles(updatedBorderStyles);
  };

  return (
    <div className="h-screen py-10 bg-base-100">
      <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100">
        <h1 className="text-4xl font-bold text-left text-base-content ">
          {t("Languages")}
        </h1>
        <p className="text-sm text-base-content">
          {t("ChooseYourPreferredLanguage")}
        </p>
      </div>
      <div className="w-full h-auto p-4 space-y-2 rounded-2xl">
        <button
          className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["en"]}`}
          onClick={(e) => handleLanguageChange(e, "en")}
        >
          English <div className="badge badge-lg">{t("Default")}</div>
          <div className="">
            <Icon
              icon="emojione-v1:flag-for-united-states"
              className="w-14 h-14"
            />
          </div>
        </button>
        <button
          className={`btn w-full h-16 text-xl bg-gradient-to-tr from-base-200 to-base-300 hover:bg-gradient-to-tr hover:from-base-300 justify-between border-2 border-transparent ${borderStyles["tg"]}`}
          onClick={(e) => handleLanguageChange(e, "tg")}
        >
          Filipino{" "}
          <div className="">
            <Icon
              icon="emojione-v1:flag-for-philippines"
              className="w-14 h-14"
            />
          </div>
        </button>
        <button
          className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["kr"]}`}
          onClick={(e) => handleLanguageChange(e, "kr")}
        >
          Korean{" "}
          <div className="">
            <Icon
              icon="emojione-v1:flag-for-south-korea"
              className="w-14 h-14"
            />
          </div>
        </button>
        <div>
          <button
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["jpn"]}`}
            onClick={(e) => handleLanguageChange(e, "jpn")}
          >
            Japan{" "}
            <div className="">
              <Icon icon="emojione-v1:flag-for-japan" className="w-14 h-14" />
            </div>
          </button>
        </div>
        <div>
          <button
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["gmy"]}`}
            onClick={(e) => handleLanguageChange(e, "gmy")}
          >
            German{" "}
            <div className="">
              <Icon icon="emojione-v1:flag-for-germany" className="w-14 h-14" />
            </div>
          </button>
        </div>
        <div>
          <button
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["vn"]}`}
            onClick={(e) => handleLanguageChange(e, "vn")}
          >
            Vietnamese{" "}
            <div className="">
              <Icon icon="emojione-v1:flag-for-vietnam" className="w-14 h-14" />
            </div>
          </button>
        </div>
        <div>
          <button
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["fr"]}`}
            onClick={(e) => handleLanguageChange(e, "fr")}
          >
            French{" "}
            <div className="">
              <Icon icon="emojione-v1:flag-for-france" className="w-14 h-14" />
            </div>
          </button>
        </div>
        <div>
          <button
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300 justify-between border-2 border-transparent ${borderStyles["cmd"]}`}
            onClick={(e) => handleLanguageChange(e, "cmd")}
          >
            Khmer{" "}
            <div className="">
              <Icon
                icon="emojione-v1:flag-for-cambodia"
                className="w-14 h-14"
              />
            </div>
          </button>
        </div>
        <div>
          <button
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr hover:from-base-300 bg-gradient-to-tr from-base-200 to-base-300  justify-between border-2 border-transparent ${borderStyles["thai"]}`}
            onClick={(e) => handleLanguageChange(e, "thai")}
          >
            Thai{" "}
            <div className="">
              <Icon
                icon="emojione-v1:flag-for-thailand"
                className="w-14 h-14"
              />
            </div>
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default ChangeLanguage;
