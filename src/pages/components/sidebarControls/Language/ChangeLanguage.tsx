import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
    e: React.ChangeEvent<HTMLAnchorElement>,
    language: string
  ) => {
    e.preventDefault();
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    // Additional logic can be added here if needed upon language change
    // Update border styles based on the selected language
    const updatedBorderStyles: Record<string, string> = {};
    Object.keys(borderStyles).forEach((lang) => {
      updatedBorderStyles[lang] =
        lang === language ? "bg-emerald-500" : "";
    });
    setBorderStyles(updatedBorderStyles);
  };

  return (
    <div className="px-3 py-10 bg-gray-900">
      <div className="bg-gray-900 z-50 top-0 sticky transition-all ease-in-out duration-150 py-1 pb-5">
        <h1 className="text-left text-4xl font-bold ">
          Language
        </h1>
        <p className="text-gray-500 text-sm">Choose Preferred Language</p>
      </div>
      <div className="w-full h-auto space-y-2 px-3 rounded-2xl">
        <button
          className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["en"]}`}
          onClick={(e) => handleLanguageChange(e, "en")}
        >
          English <div className="badge badge-lg">Default</div>
          <div className="">
            <Icon
              icon="emojione-v1:flag-for-united-states"
              className="w-14 h-14"
            />
          </div>
        </button>
        <button
          className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["tg"]}`}
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
          className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["kr"]}`}
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
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["jpn"]}`}
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
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["gmy"]}`}
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
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["vn"]}`}
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
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["fr"]}`}
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
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700 justify-between border-2 border-transparent text-white ${borderStyles["cmd"]}`}
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
            className={`btn w-full h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 bg-gray-700  justify-between border-2 border-transparent text-white ${borderStyles["thai"]}`}
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
        <div>
          <button
            className={`btn w-full bg-transparent hover:bg-gray-700 hover:border-solid hover:border-sky-700 h-16 text-xl hover:bg-gradient-to-tr from-sky-900 to-sky-600 border-dashed border-gray-700 justify-between border-2 text-white ${borderStyles["new"]}`}
            onClick={(e) => handleLanguageChange(e, "new")}
          >
            Add your Language
            <div className="">
              <Icon
                icon="emojione-v1:flag-for-white-flag"
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
