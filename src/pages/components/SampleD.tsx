import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import QCULogo from '../../imgs/Logo/qculogo.png';
import Sample from '../../vids/sample4.mp4';
//import Samplecp from '../../vids/samplecp3.mp4';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface ContainerProps {
  name: string;
};

const SampleD: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/SanBartolome');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <section onClick={handleClick} className="w-screen text-center cursor-pointer place-items-stretch overflow-hidden min-h-screen  bg-black h-full">
          <video src={Sample} autoPlay muted loop className="h-fit hidden bg-cover md:block"></video>
          {/* <video src={Samplecp} autoPlay muted loop className="h-screen md:hidden"></video> */}
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
           
              {/* Use onClick to handle the redirection */}
              <div className=" animate-bounce absolute inset-x-0 bottom-1 py-3 flex items-center justify-center drop-shadow-md ">
                <Icon icon="clarity:cursor-hand-click-line" className="w-10 h-10 mr-2" /> touch anywhere to End Navigation (Sample)<span className="font-extrabold text-lg"></span>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default SampleD;
