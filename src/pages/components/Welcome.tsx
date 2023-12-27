import QCULogo from '../../assets/imgs/logo/qculogo.png';
import { IonPage, IonContent } from '@ionic/react';
import Sample from '../../assets/vids/sample4.mp4';
//import Samplecp from '../../vids/samplecp3.mp4';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React from 'react';

interface ContainerProps {
  name: string;
};

const CampusSelect: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/SanBartolome');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <section onClick={handleClick} className="w-screen text-center cursor-pointer place-items-stretch overflow-hidden min-h-screen  bg-black h-full">
          <video src={Sample} autoPlay muted loop className="h-full object-cover brightness-50 w-full md:block"></video>
          {/* <video src={Samplecp} autoPlay muted loop className="h-screen md:hidden"></video> */}
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <img src={QCULogo} className="mx-auto absolute inset-x-0 top-96 w-40 sm:w-32 md:w-48 lg:w-64 xl:w-40 -mt-56 " alt="QCU Logo" />
              <h2 className="font-bold text-7xl dark:text-gray-600">
                <span className="absolute inset-x-0 top-80 mt-3 xl:mt-10 bg-clip-text bg-gradient-to-tr drop-shadow-md text-5xl text-white">QC-IOSK</span>
              </h2>
              {/* Use onClick to handle the redirection */}
              <div className=" animate-bounce absolute inset-x-0 bottom-1 py-3 flex items-center justify-center drop-shadow-md ">
                <Icon icon="clarity:cursor-hand-click-line" className="w-10 h-10 mr-2" /> touch anywhere to Start<span className="font-extrabold text-lg"></span>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default CampusSelect;
