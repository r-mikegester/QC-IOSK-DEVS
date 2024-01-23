import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
interface ContainerProps {
  name: string;
}

const RoomManagement: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent fullscreen>
    <div>
      <AdminSideBar name={""} />
      <AdminHeader name={""} />
      <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">

        <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-4xl">Room Management</h1>
              </div>
        </div>
      </div>
    </div>
    </IonContent>
    </IonPage>
  );
};

export default RoomManagement;
