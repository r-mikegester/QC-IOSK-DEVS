import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';


const Map: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SanBartolome />
        <Dock />
      </IonContent>
    </IonPage>
  );
};

export default Map;
