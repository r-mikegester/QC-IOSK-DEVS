import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ClockPane from "../clock/clock";
import WeatherPane from "../weather/weatherPane";
interface ContainerProps {
  name: string;
}

const LocationPane: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const ClickWelcome = () => {
    // Redirect to the "/Home" route
    history.push("/Home");
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push("/Campuses");
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push("/Search");
  };
  return (
    <div className="flex flex-col p-2 bg-base-100 rounded-2xl">
      <div className="inline-flex justify-between mx-auto w-80 bg-base-100 backdrop-blur-lg rounded-2xl">
       <div className="inline-flex justify-between py-2 mx-auto w-80">
       {/* <a
          
          aria-current="page"
          className="inline-flex items-center px-3 text-xs text-base-content rounded-2xl xl:py-3"
        >
          <Icon icon="fluent:location-12-filled" className="w-6 h-6 mr-2" />
          <small className="text-sm text-left xl:font-bold">
            {t("SanBartolome")}
          </small>

          <span className="sr-only">Home</span>
        </a> */}
        <div className="flex items-center">
              <div className="flex-shrink-0">
              <Icon icon="fluent:location-12-filled" className="w-10 h-10" />
              </div>

              <div className="grow ms-3">
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("SanBartolome")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                 27c | Quezon City 
                </p>
              </div>
            </div>
        <div className="mr-3">
          <ClockPane name={""} />
        </div>
       </div>
      </div>
      <div className="">
      <WeatherPane />
      </div>
    </div>
  );
};

export default LocationPane;
