import { IonContent, IonPage} from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import SBCampus from '../../imgs/SelectCampus/SanBartolome.webp';
import BatasanCampus from '../../imgs/SelectCampus/Batasan.webp';
import SFCampus from '../../imgs/SelectCampus/SanFransisco.webp';
//import SanBartolome from '../campus/SanBartolome';
import SanFransisco from '../campus/SanFransisco';
import Batasan from '../campus/Batasan';
import Dock from './../components/dock';
import QCULogo from '../../imgs/Logo/qculogo.png';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import './style.css';

import { useTranslation } from "react-i18next";
interface ContainerProps {
  name: string;
}
const SelectCampus: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const ClickSB = () => {
    // Redirect to the "/San Bartolome" route
    history.push('/SanBartolome');
  };
  const ClickBatasan = () => {
    // Redirect to the "/Batasan" route
    history.push('/Batasan');
  };
  const ClickSF = () => {
    // Redirect to the "/San Fransisco" route
    history.push('/SanFransisco');
  };
  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
      <div className="max-w-[85rem] px-4 h-full py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <img src={QCULogo} className="mx-auto absolute inset-x-0 top-80 w-28 sm:w-32 md:w-48 lg:w-56 xl:w-36 xl:h-36 -mt-56 xl:-mt-60" alt="QCU Logo" />
            <h2 className="mt-44 sm:mt-3 xl:mt-48 text-4xl font-light text-gray-100  sm:text-6xl">
              <span className="">{t("selectCampus")}</span>
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 mt-20 lg:grid-cols-3 gap-1 md:gap-6">
            <a className="group rounded-3xl overflow-hidden hidden md:block " onClick={ClickSF}>
              <div className="relative pt-[50%] sm:pt-[70%] rounded-3xl overflow-hidden ">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-xl" src={SFCampus} alt="Image Description" />

              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-100  group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-blue-600 to-purple-400 group-hover:text-transparent group-hover:scale-150 transition-transform duration-500 ease-in-out">
                {t("SanFrancisco")}
                </h3>
              </div>
            </a>

            <a className="group rounded-3xl overflow-hidden hidden md:block" onClick={ClickSB}>
              <div className="relative pt-[50%] sm:pt-[70%] rounded-3xl overflow-hidden">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-xl" src={SBCampus} alt="Image Description" />

              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-100 group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-blue-600 to-purple-400 group-hover:text-transparent group-hover:scale-150 transition-transform duration-500 ease-in-out ">
                {t("SanBartolome")}
                </h3>
              </div>
            </a>
            <a className="group rounded-3xl overflow-hidden hidden md:block" onClick={ClickBatasan}>
              <div className="relative pt-[50%] sm:pt-[70%] rounded-3xl overflow-hidden">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-xl" src={BatasanCampus} alt="Image Description" />

              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-100 group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-blue-600 to-purple-400 group-hover:text-transparent group-hover:scale-150 transition-transform duration-500 ease-in-out ">
                {t("Batasan")}
                </h3>
              </div>
            </a>




            <div className="max-w-[85rem] px-4 pb-10 -mt-10 sm:px-6 lg:px-8 lg:py-14 mx-auto md:hidden">

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">

                <a className="group flex flex-col border-2 shadow-sm rounded-3xl hover:shadow-md transition border-t-2 dark:border-slate-600/60 backdrop-blur-lg dark:bg-slate-800/50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={ClickSB}>
                  <div className="p-3 md:p-5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img className="h-20 w-20 rounded-3xl" src={SBCampus} alt="Image Description" />
                        <div className="ms-3">
                          <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-400">
                            San Bartolome
                          </h3>
                        </div>
                      </div>
                      <div className="ps-3">
                        <Icon icon="fluent:caret-right-24-filled" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </a>



                <a className="group flex flex-col border-2 shadow-sm rounded-3xl hover:shadow-md transition border-t-2 dark:border-slate-600/60 backdrop-blur-lg dark:bg-slate-800/50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={ClickBatasan}>
                  <div className="p-3 md:p-5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img className="h-20 w-20 rounded-3xl" src={BatasanCampus} alt="Image Description" />
                        <div className="ms-3">
                          <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-400">
                            Batasan
                          </h3>
                        </div>
                      </div>
                      <div className="ps-3">
                        <Icon icon="fluent:caret-right-24-filled" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </a>



                <a className="group flex flex-col border-2 shadow-sm rounded-3xl hover:shadow-md transition border-t-2 dark:border-slate-600/60 backdrop-blur-lg dark:bg-slate-800/50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={ClickSF}>
                  <div className="p-3 md:p-5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img className="h-20 w-20 rounded-3xl" src={SFCampus} alt="Image Description" />
                        <div className="ms-3">
                          <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-400">
                            San Fransisco
                          </h3>
                        </div>
                      </div>
                      <div className="ps-3">
                        <Icon icon="fluent:caret-right-24-filled" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </a>



              </div>

            </div>

          </div>

        </div>
          <Dock name={'Dock'} />
      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;
