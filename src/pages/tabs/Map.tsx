import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';

interface ContainerProps {
  name: string;
}
const Map: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SanBartolome name={'SanBartolome'}/>
        <Dock name={'Dock'} />
      </IonContent>
    </IonPage>
  );
};

export default Map;
