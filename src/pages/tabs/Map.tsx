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
      <div className="absolute top-0 right-20 z-50 bg-red-500">
         <Controls name={'Controls'} />
         </div>
        <SanBartolome name={'SanBartolome'} />
        <div className="absolute bottom-10 right-10 ">
          <dialog id="SelectBuilding" className="modal ml-96">
            <div className="modal-box max-w-3xl ">
              <h3 className="font-bold text-center text-3xl">Select Building</h3>
              <div className="grid grid-cols-4 gap-1">
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">1</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">2</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">3</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">4</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">5</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">6</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">7</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">8</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">9</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">10</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">11</div>
                  <div className="bg-red-500 w-40 h-40 m-2 rounded-2xl text-center ">12</div>
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
