import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Categories.css';

const Categories: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CATEGORIES</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CATEGORIES</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="CATEGORIES" />
      </IonContent>
    </IonPage>
  );
};

export default Categories;
