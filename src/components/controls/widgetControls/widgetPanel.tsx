import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import ClockPane from './clock/clock';
import LocationPane from './location/Location';
import WeatherPane from './weather/weatherPane';
import { useTranslation } from "react-i18next";

interface ContainerProps {
  name: string;
};

const WidgetPanel: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/SanBartolome');
  };

  return (
      <div className="z-50 w-auto h-auto p-3 space-y-2 top-5 left-5 rounded-3xl">
      {/* <LocationPane name={'Location Tag'} /> */}
      <WeatherPane />
      </div> 
  );
};

export default WidgetPanel;
