import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/css/dock.css";
interface ContainerProps {
  name: string;
}

const Dock: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const ClickWelcome = () => {
    // Redirect to the "/Home" route
    history.push("/Home");
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push("/Map");
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push("/Search");
  };

  const { t } = useTranslation();
  return (

    <div className="fixed bottom-0 w-screen">
      <div className="flex h-20 mx-auto my-2 shadow-md w-fit bg-base-100/50 backdrop-blur-lg rounded-2xl">
        <div className="px-2 py-2 space-x-1">
          <div className="tooltip " data-tip={t("Home")}>
            <a onClick={ClickWelcome} className="">
              <div className="w-16 h-16 duration-150 ease-in-out border border-none group btn bg-gradient-to-tr rounded-xl hover:-translate-y-5 from-primary to-base-300">
                <Icon icon="octicon:home-16" className="w-10 h-10 " />

              </div>
            </a>
          </div>
          <div className="tooltip " data-tip={t("Maps")}>
            <a
              onClick={ClickMap}
              className="w-16 h-16 duration-150 ease-in-out border-none btn group hover:-translate-y-5 bg-gradient-to-tr rounded-xl from-primary to-base-300"
            >
              <Icon
                icon="carbon:ibm-data-product-exchange"
                className="w-10 h-10 "
              />

            </a>
          </div>
          <div className="tooltip " data-tip={t("Search")}>
            <a
              onClick={ClickSearch}
              className="w-16 h-16 duration-150 ease-in-out border-none btn group hover:-translate-y-5 bg-gradient-to-tr rounded-xl from-primary to-base-300"
            >
              <Icon icon="wpf:search" className="w-10 h-10 " />

            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dock;
