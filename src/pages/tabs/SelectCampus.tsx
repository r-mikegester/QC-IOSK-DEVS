import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SelectCampus.css';

const SelectCampus: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SELECT CAMPUS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SELECT CAMPUS</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="SELECT CAMPUS" />
      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;
