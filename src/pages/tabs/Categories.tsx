import { IonContent, IonPage } from '@ionic/react';
import Dock from '../components/dock';
interface ContainerProps {
  name: string;
}
const Categories:React.FC<ContainerProps> = ({ name }) =>{
  return (
    <IonPage>
      <IonContent fullscreen>


        <div className="max-w-7xl max-h-max px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

        <div className="grid grid-rows-12 grid-cols-12  w-full h-full gap-4">
  <div className="row-span-5 col-span-3 bg-gray-900 rounded-2xl">01</div>
  <div className="col-span-6 row-span-3 bg-gray-900 rounded-2xl">02</div>
  <div className="col-span-6 row-span-3 bg-gray-900 rounded-2xl">02</div>
  <div className="row-span-6 col-span-2 bg-gray-900 rounded-2xl">03</div>
  <div className="row-span-6 col-span-2 bg-gray-900 rounded-2xl">03</div>
</div>

        </div>
          <Dock name={'Dock'}/>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
