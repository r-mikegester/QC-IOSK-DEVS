import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { IonFab, IonFabButton, IonFabList} from '@ionic/react';
interface ContainerProps {
  name: string;
}
const Controls: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="bg-gray-900 w-10 z-50">
      <IonFab>
      <IonFabList side="top">
        <IonFabButton>
        <Icon icon="material-symbols:restart-alt-rounded" className="w-10 h-10"/>
        </IonFabButton>
      </IonFabList>
      </IonFab>

    </div>

  );
};

export default Controls;
