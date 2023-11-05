import { IonContent, IonPage} from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './SelectCampus.css';
import SBCampus from '../../imgs/SelectCampus/SanBartolome.jpg';
import BatasanCampus from '../../imgs/SelectCampus/Batasan.png';
import SFCampus from '../../imgs/SelectCampus/SanFransisco.png';
//import SanBartolome from '../campus/SanBartolome';
import SanFransisco from './../campus/SanFransisco';
const SelectCampus: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="">
        <div className="max-w-[85rem] bg-white px-4 h-full py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
              <span className="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent">Select Campus </span>
            </h2>
            
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
            <a className="group rounded-xl overflow-hidden hidden md:block" href="/Map">
              <div className="relative pt-[50%] sm:pt-[70%] rounded-2xl overflow-hidden  border-4 border-gray-800">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src={SBCampus} alt="Image Description" />
               
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:text-emerald-600 ">
                 SAN BARTOLOME
                </h3>
              </div>
            </a>
            <a className="group rounded-xl overflow-hidden hidden md:block" href="/Map">
              <div className="relative pt-[50%] sm:pt-[70%] rounded-2xl overflow-hidden  border-4 border-gray-800">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src={BatasanCampus} alt="Image Description" />
               
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:text-emerald-600 ">
                 BATASAN
                </h3>
              </div>
            </a>

            <a className="group rounded-xl overflow-hidden hidden md:block" href="#">
              <div className="relative pt-[50%] sm:pt-[70%] rounded-2xl overflow-hidden  border-4 border-gray-800">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src={SFCampus} alt="Image Description" />
                <span className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                  Soon
                </span>
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:text-emerald-600 ">
                 SAN FRANSISCO
                </h3>
              </div>
            </a>



            <a className="group rounded-2xl overflow-hidden md:hidden w-full h-24 md:h-72" href="#">
              <div className="relative pt-[20%] sm:pt-[70%] rounded-2xl overflow-hidden w-full h-20 md:h-64 border-4 border-gray-800">
                <img className="w-32 md:w-full h-20 md:h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl rounded-tr-none rounded-br-none" src={SBCampus} alt="Image Description" />
                
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:text-emerald-600 ">
                 BATASAN
                </h3>
              </div>
            </a>
            <a className="group rounded-2xl overflow-hidden md:hidden w-full h-24 md:h-72" href="#">
              <div className="relative pt-[20%] sm:pt-[70%] rounded-2xl overflow-hidden w-full h-20 md:h-64 border-4 border-gray-800">
                <img className="w-32 md:w-full h-20 md:h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl rounded-tr-none rounded-br-none" src={BatasanCampus} alt="Image Description" />
                <span className="absolute top-0 right-0  rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-3 px-6 ">
                  Soon!
                </span>
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:text-emerald-600 ">
                 BATASAN
                </h3>
              </div>
            </a>
            <a className="group rounded-2xl overflow-hidden md:hidden w-full h-24 md:h-72" href="#">
              <div className="relative pt-[20%] sm:pt-[70%] rounded-2xl overflow-hidden w-full h-20 md:h-64 border-4 border-gray-800">
                <img className="w-32 md:w-full h-20 md:h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl rounded-tr-none rounded-br-none" src={SFCampus} alt="Image Description " />
                <h1 className="font-bold text-3xl">San Fransisco</h1>
                <span className="absolute top-0 right-0  rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-3 px-6 ">
                  Soon!
                </span>
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:text-emerald-600 ">
                 BATASAN
                </h3>
              </div>
            </a>
          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;
