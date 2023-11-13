import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';

interface ContainerProps {}

const Map: React.FC<ContainerProps> = () => {
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
