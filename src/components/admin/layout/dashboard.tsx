import { IonContent, IonPage } from "@ionic/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../../utils/firebase";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";
import Sidebar from "../../controls/sidebarControls/sidebar";

interface ContainerProps {
  name: string;
}

const Dashboard: React.FC<ContainerProps> = ({ name }) => {
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
        <div className="flex gap-5">
          <main className="flex-1 max-w-5xl px-6 py-4 mx-auto text-base-content">
            <h1>WELCOME TO DASHBOARD</h1>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
