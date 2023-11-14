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
        <SanBartolome name={'SanBartolome'} />
        <div className="absolute bottom-10 right-10 ">
          <dialog id="SelectBuilding" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Select Building</h3>
              <div className="grid grid-cols-4">
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">1</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">2</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">3</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">4</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">5</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">6</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">7</div>
                  <div className="bg-red-500 w-20 h-20 m-2 rounded-2xl">8</div>
              </div>

            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <Controls name={'Controls'} />
        </div>
        <Dock name={'Dock'} />
      </IonContent>
    </IonPage>
  );
};

export default Map;
