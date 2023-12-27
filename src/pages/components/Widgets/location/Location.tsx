import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
interface ContainerProps {
  name: string;
}

const LocationPane: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const ClickWelcome = () => {
    // Redirect to the "/Welcome" route
    history.push('/Welcome');
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push('/SelectCampus');
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push('/Search');
  };
  return (
    <div className="inline-flex justify-between w-44 mx-auto dark:border-slate-600/60 bg-gray-900/50 backdrop-blur-lg rounded-2xl">
      <a onClick={ClickWelcome}
        aria-current="page"
        className="inline-flex items-center px-3 text-xs text-white rounded-2xl xl:py-3"
        
      >
        <Icon icon="fluent:location-12-filled"  className="w-6 h-6 mr-2" />
        <small className="text-base text-left xl:font-bold">{t("SanBartolome")}</small>
        <span className="sr-only">Home</span>
      </a>
    </div>

  );
};

export default LocationPane;
