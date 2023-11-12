import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import './ExploreContainer.css';
import QCULogo from '../../imgs/Logo/cropped-qculogopng-1-copy-300x300.png';
import Sample from '../../vids/sample2.mp4';
import Samplecp from '../../vids/samplecp.mp4';
import { useHistory } from 'react-router-dom';

interface ContainerProps {
  name: string;
}

const CampusSelect: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/Map');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <section onClick={handleClick} className="w-screen cursor-pointer h-full">
          <video src={Sample} autoPlay muted loop className="h-fit hidden md:block"></video>
          <video src={Samplecp} autoPlay muted loop className="h-screen md:hidden"></video>
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <img src={QCULogo} className="mx-auto w-40 -mt-80" />
              <h2 className="mb- font-extrabold text-7xl dark:text-gray-600">
                <span className="bg-clip-text bg-gradient-to-tr text-5xl from-blue-600 to-purple-400 text-transparent">QCU-IOSK</span>
              </h2>
              {/* Use onClick to handle the redirection */}
              <div  className=" py-3 font-semibold ">
                Touch the screen to start
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default CampusSelect;
