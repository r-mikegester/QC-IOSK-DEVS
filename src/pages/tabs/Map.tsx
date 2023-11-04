import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import './Map.css';

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SanBartolome />
      </IonContent>
    </IonPage>
  );
};

export default Map;
