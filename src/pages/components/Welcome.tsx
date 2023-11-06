import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import ExploreContainer from './ExploreContainer';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const CampusSelect: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CAMPUS INA</IonTitle>
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

export default CampusSelect;
