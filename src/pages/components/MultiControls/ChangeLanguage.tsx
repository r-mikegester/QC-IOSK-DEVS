import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
interface ContainerProps {
    name: string;
}

const ChangeLanguage: React.FC<ContainerProps> = ({ name }) => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

    const [borderStyles, setBorderStyles] = useState<Record<string, string>>({
        en: '',
        tg: '',
        fr: '',
        bsy: '',
        jpn: '',
        vn: '',
        cmd: '',
        kr: '',
        gmy: '',
        thai: '',
        // Add other languages and their initial border styles here
    });

    const handleLanguageChange = (e: React.ChangeEvent<HTMLAnchorElement>, language: string) => {
        e.preventDefault();
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
        // Additional logic can be added here if needed upon language change
        // Update border styles based on the selected language
        const updatedBorderStyles: Record<string, string> = {};
        Object.keys(borderStyles).forEach((lang) => {
            updatedBorderStyles[lang] = lang === language ? 'border-2 border-sky-500' : '';
        });
        setBorderStyles(updatedBorderStyles);
    }

    return (
        <div className="" data-tip="Change Language">
            <div className="flex aspect-square min-h-[32px] w-10 flex-col items-center gap-1 justify-center rounded-lg hover:bg-sky-700 hover:text-white   text-sky-300  duration-200 ease-in-out dark:text-sky-300">
                <div className="dropdown dropdown-right dropdown-end ">
                    <label tabIndex={0} className=" m-1"><Icon icon="ion:language" className="w-5 h-5" /></label>

                    <ul tabIndex={0} className=" grid grid-cols-1 gap-1 dropdown-content border-t bg-slate-800/90 border-slate-600/60 backdrop-blur-lg z-[1] menu p-2 ml-7 shadow-lg rounded-2xl w-64">
                        <h1 className="col-span-1 text-center" >{t("SelectLanguage")}</h1>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['en']}`} onClick={(e) => handleLanguageChange(e, 'en')}>
                                English {' '}
                                <Icon icon="emojione-v1:flag-for-united-states" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['tg']}`} onClick={(e) => handleLanguageChange(e, 'tg')}>
                                Filipino {' '}
                                <Icon icon="emojione-v1:flag-for-philippines" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['kr']}`} onClick={(e) => handleLanguageChange(e, 'kr')}>
                                Korean {' '}
                                <Icon icon="emojione-v1:flag-for-south-korea" className="w-10 h-10" />
                            </a>
                        </li>
                        {/* <li>
                            <li>
                                <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['sp']}`} onClick={(e) => handleLanguageChange(e, 'sp')}>
                                    Spanish {' '}
                                    <Icon icon="emojione-v1:flag-for-spain" className="w-10 h-10" />
                                </a>
                            </li>

                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['jpn']}`} onClick={(e) => handleLanguageChange(e, 'jpn')}>
                                Japanese {' '}
                                <Icon icon="emojione-v1:flag-for-japan" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['gmy']}`} onClick={(e) => handleLanguageChange(e, 'gmy')}>
                                German {' '}
                                <Icon icon="emojione-v1:flag-for-germany" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['vn']}`} onClick={(e) => handleLanguageChange(e, 'vn')}>
                                Vietnamese{' '}
                                <Icon icon="emojione-v1:flag-for-vietnam" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['fr']}`} onClick={(e) => handleLanguageChange(e, 'fr')}>
                                French {' '}
                                <Icon icon="emojione-v1:flag-for-france" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['cmd']}`} onClick={(e) => handleLanguageChange(e, 'cmd')}>
                                Khmer{' '}
                                <Icon icon="emojione-v1:flag-for-cambodia" className="w-10 h-10" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`justify-between border-2 border-transparent text-white ${borderStyles['thai']}`} onClick={(e) => handleLanguageChange(e, 'thai')}>
                                Thai {' '}
                                <Icon icon="emojione-v1:flag-for-thailand" className="w-10 h-10" />
                            </a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChangeLanguage;
