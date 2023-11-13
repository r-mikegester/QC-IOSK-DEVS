import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';
import './Map.css';
interface ContainerProps {
  name: string;
}
const Map: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SanBartolome />
        <Dock name={}/>
      </IonContent>
    </IonPage>
  );
};

export default Map;
