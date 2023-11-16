import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';
import Controls from '../components/controls';

interface ContainerProps {
  name: string;
}
const Map: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
     
        <div className="absolute top-0 right-20 z-50 ">
          <Controls name={'Controls'} />
        </div>
        <div className="z-10">
          <SanBartolome name={'SanBartolome'} />
        </div>
        <div className="absolute bottom-10 right-10 ">
          <dialog id="SelectBuilding" className="modal">
            <div className="modal-box max-w-3xl ">
              <h3 className="font-bold text-center text-5xl">{name} Building</h3>
              <div className="grid grid-cols-4 gap-1">
                
              </div>
              <h3 className="font-bold text-center text-3xl">Select Floor</h3>
              <div className="grid grid-cols-4 gap-1">
                <div className="bg-sky-900 w-40 h-40 m-2 rounded-2xl text-center justify-center py-16 text-xl backdrop-blur-lg ">1</div>
                <div className="bg-sky-900 w-40 h-40 m-2 rounded-2xl text-center justify-center py-16 text-xl backdrop-blur-lg ">2</div>
                <div className="bg-sky-900 w-40 h-40 m-2 rounded-2xl text-center justify-center py-16 text-xl backdrop-blur-lg ">3</div>
                <div className="bg-sky-900 w-40 h-40 m-2 rounded-2xl text-center justify-center py-16 text-xl backdrop-blur-lg ">4</div>
               
              </div>
            </div>
            
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

        </div>
        <Dock name={'Dock'} />

      </IonContent>
    </IonPage>
  );
};

export default Map;
