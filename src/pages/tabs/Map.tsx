import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';
import './Map.css';

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SanBartolome />
        <Dock/>
      </IonContent>
    </IonPage>
  );
};

export default Map;
