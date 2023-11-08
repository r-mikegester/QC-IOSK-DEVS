import { IonContent, IonPage} from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './SelectCampus.css';
import SBCampus from '../../imgs/SelectCampus/SanBartolome.jpg';
import BatasanCampus from '../../imgs/SelectCampus/Batasan.png';
import SFCampus from '../../imgs/SelectCampus/SanFransisco.png';
//import SanBartolome from '../campus/SanBartolome';
import SanFransisco from './../campus/SanFransisco';
import Batasan from './../campus/Batasan';
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
            <a className="group rounded-2xl overflow-hidden hidden md:block" href="/Map">
              <div className="relative pt-[50%] sm:pt-[70%] rounded-2xl overflow-hidden  border-4 border-gray-800">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-xl" src={SBCampus} alt="Image Description"/>
               
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-blue-600 to-purple-400 group-hover:text-transparent group-hover:scale-150 transition-transform duration-500 ease-in-out ">
                 SAN BARTOLOME
                </h3>
              </div>
            </a>
            <a className="group rounded-2xl overflow-hidden hidden md:block" href="/Map">
              <div className="relative pt-[50%] sm:pt-[70%] rounded-2xl overflow-hidden  border-4 border-gray-800">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-xl" src={BatasanCampus} alt="Image Description"/>
               
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600 group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-blue-600 to-purple-400 group-hover:text-transparent group-hover:scale-150 transition-transform duration-500 ease-in-out ">
                 BATASAN
                </h3>
              </div>
            </a>

            <a className="group rounded-2xl overflow-hidden hidden md:block " href="#">
              <div className="relative pt-[50%] sm:pt-[70%] rounded-2xl overflow-hidden  border-4 border-gray-800">
                <img className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-xl" src={SFCampus} alt="Image Description" />
                <span className="absolute top-0 right-0 group-hover:scale-150 transition-transform duration-500 ease-in-out rounded-bl-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                  Soon
                </span>
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-center text-gray-600  group-hover:bg-clip-text group-hover:bg-gradient-to-tr from-blue-600 to-purple-400 group-hover:text-transparent group-hover:scale-150 transition-transform duration-500 ease-in-out">
                 SAN FRANSISCO
                </h3>
              </div>
            </a>



<div class="max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 lg:py-14 mx-auto md:hidden">

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
   
    <a class="group flex flex-col border-4 shadow-sm rounded-2xl hover:shadow-md transition border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/Map">
      <div class="p-3 md:p-5">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img class="h-20 w-20 rounded-2xl" src={SBCampus} alt="Image Description"/>
            <div class="ms-3">
              <h3 class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-400">
                San Bartolome
              </h3>
            </div>
          </div>
          <div class="ps-3">
            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>
  

   
    <a class="group flex flex-col border-4 shadow-sm rounded-2xl hover:shadow-md transition border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
      <div class="p-3 md:p-5">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img class="h-20 w-20 rounded-2xl" src={BatasanCampus} alt="Image Description"/>
            <div class="ms-3">
              <h3 class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-400">
                Batasan
              </h3>
            </div>
          </div>
          <div class="ps-3">
            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>
  

   
    <a class="group flex flex-col border-4 shadow-sm rounded-2xl hover:shadow-md transition border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
      <div class="p-3 md:p-5">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img class="h-20 w-20 rounded-2xl" src={SFCampus} alt="Image Description"/>
            <div class="ms-3">
              <h3 class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-400">
                San Fransisco
              </h3>
            </div>
          </div>
          <div class="ps-3">
            <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>
  

   
  </div>

</div>

          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;
