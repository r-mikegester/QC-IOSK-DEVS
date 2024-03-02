import { IonContent, IonPage } from "@ionic/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../utils/firebase";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";
import ThemeSelection from "../../sidebar/themes/themeSelection";
import ManageEvents from "../management/manageEvents";
import manageAnnouncements from "../management/manageAnnoucements";
import ManageAnnouncements from "../management/manageAnnoucements";
import { ToastContainer } from "react-toastify";

interface ContainerProps {
  name: string;
}

const AdminLayout: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        history.push("/Dashboard");
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        history.push("/Login");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/Login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-full h-full bg-base-100">
          <AdminHeader name={"adminHeader"} />
          <AdminSidebar name={"adminSidebar"} />
          <ToastContainer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminLayout;
