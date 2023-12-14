import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
interface ContainerProps {
  name: string;
}

const Location: React.FC<ContainerProps> = ({ name }) => {
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
    // <div classNameName="mx-auto w-96 h-20 rounded-2xl  absolute inset-x-0 bottom-5 bg-gray-700 ">
    //   <div classNameName="tabs absolute inset-0 mx-auto items-center ">
    //     <a classNameName="btn tab rounded-2xl  justify-center  hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1 " href="/Search"><Icon icon="uil:search-alt" aria-hidden="true" classNameName="w-8 h-8" />Search</a>
    //     <a classNameName="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1  tab-active" href="/SelectCampus"> <Icon icon="tabler:replace"aria-hidden="true" classNameName="w-10 h-10" />Switch</a>
    //     <a classNameName="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1" href="/Categories"><Icon icon="mingcute:grid-2-line" aria-hidden="true" classNameName="w-10 h-10" />Menu</a>
    //   </div>
    // </div>

    <div className="fixed xl:top-10 -right-52 xl:-right-28 transform -translate-x-1/2 inline-flex mx-auto justify-between xl:border-t-2 dark:border-slate-600/60 xl:backdrop-blur-lg xl:dark:bg-slate-800/50 w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12 rounded-2xl">
      <a onClick={ClickWelcome}
        aria-current="page"
        className="inline-flex rounded-2xl items-center text-xs xl:font-medium xl:py-5 px-4 text-white"
        
      >
        <Icon icon="fluent:location-12-filled"  className="xl:w-10 xl:h-10 w-5 h-11 xl:mr-5 mr-1" />
        <small className="text-center text-2xl xl:font-bold">{t("SanBartolome")}</small>
        <span className="sr-only">Home</span>
      </a>
    </div>

  );
};

export default Location;
