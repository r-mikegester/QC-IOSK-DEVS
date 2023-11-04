import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Map.css';

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MAP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MAP</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="3D RENDERED MAP" />
      </IonContent>
    </IonPage>
  );
};

export default Map;
