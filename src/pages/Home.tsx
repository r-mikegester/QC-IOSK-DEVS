import QCULogo from '../assets/imgs/logo/qculogo.png';
import { IonPage, IonContent } from '@ionic/react';
import Sample from '../assets/vids/sample4.mp4';
//import Samplecp from '../../vids/samplecp3.mp4';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React from 'react';

interface ContainerProps {
  name: string;
};

const Home: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/SanBartolome');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <section onClick={handleClick} className="w-screen h-full min-h-screen overflow-hidden text-center bg-black cursor-pointer place-items-stretch">
          <video src={Sample} autoPlay muted loop className="object-cover w-full h-full brightness-50 md:block"></video>
          {/* <video src={Samplecp} autoPlay muted loop className="h-screen md:hidden"></video> */}
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <img src={QCULogo} className="absolute inset-x-0 w-40 mx-auto -mt-56 top-96 sm:w-32 md:w-48 lg:w-64 xl:w-40 " alt="QCU Logo" />
              <h2 className="font-bold text-7xl dark:text-gray-600">
                <span className="absolute inset-x-0 mt-3 text-5xl text-white top-80 xl:mt-10 bg-clip-text bg-gradient-to-tr drop-shadow-md">QC-IOSK</span>
              </h2>
              {/* Use onClick to handle the redirection */}
              <div className="absolute inset-x-0 flex items-center justify-center py-3 animate-bounce bottom-1 drop-shadow-md">
                <Icon icon="clarity:cursor-hand-click-line" className="w-10 h-10 mr-2" /> touch anywhere to Start<span className="text-lg font-extrabold"></span>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
