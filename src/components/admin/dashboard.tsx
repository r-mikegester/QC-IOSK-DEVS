import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSidebar from "./constant/adminSidebar";
import AdminHeader from "./constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import AdminLayout from "./constant/layout";
interface ContainerProps {
  name: string;
}

const Dashboard: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

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

  const { t } = useTranslation();
  return (
    <>
    <IonPage>
      <IonContent fullscreen>
       {/* <AdminLayout name={""}/> */}
       <AdminHeader name={""}/>
       <AdminSidebar name={""}/>
      <div className="items-center justify-center h-auto text-base-content bg-base-300 lg:ps-64 ">

        <div className="grid w-full min-h-screen grid-cols-4 grid-rows-4 gap-5 p-10 bg-base-100 rounded-tl-3xl">
          <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
            <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
              <div className="flex items-center justify-between space-x-12">
                <div className="flex flex-col items-start">
                  <h1>562</h1>
                  <p>no of visitors</p>
                </div>
                <div className="flex">
                  <Icon icon="akar-icons:people-group" className="w-10 h-10" />
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
            <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
              <div className="flex items-center justify-between space-x-12">
                <div className="flex flex-col items-start">
                  <h1>12</h1>
                  <p>active buildings</p>
                </div>
                <div className="flex">
                  <Icon icon="bx:buildings" className="w-10 h-10" />
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
            <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
              <div className="flex items-center justify-between space-x-12">
                <div className="flex flex-col items-start">
                  <h1>5</h1>
                  <p>Active Annoucements</p>
                </div>
                <div className="flex">
                  <Icon icon="streamline:annoncement-megaphone" className="w-10 h-10" />
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
            <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
              <div className="flex items-center justify-between space-x-12">
                <div className="flex flex-col items-start">
                  <h1>3</h1>
                  <p>Active Events</p>
                </div>
                <div className="flex">
                  <Icon icon="streamline:calendar-star" className="w-10 h-10" />
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-span-3 row-span-3 ">
            <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">


            </div>
          </div>
          <div className="col-span-1 row-span-3 ">
            <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
              <div className="flex items-center justify-between space-x-12">

              </div>
              
            </div>
          </div>
        </div>
      </div>
</IonContent>
</IonPage>
    </>


  )
};

export default Dashboard; 