/*Imported Dependencies */

import { Redirect, Route } from 'react-router-dom';

import { IonReactRouter } from "@ionic/react-router";
/* Map*/
// import SanFrancisco from "./components/campus/sanFrancisco/SanFransisco";
// import Batasan from "./components/campus/batasan/Batasan";

/** Error Catching */

/* Main Routing */

import Maps from "./pages/maps";
import Home from "./pages/layout";
import SearchTab from "./pages/Search";


/** Admin Routing */
import Login from "./components/sidebar/auth/unlogin";
import Signup from "./components/sidebar/auth/signup";
import Dashboard from "./components/admin/dashboard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./assets/css/index.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/typography.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/padding.css";
/* Theme variables */
import "./assets/css/variables.css";
/*Ionic Components*/

import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import ManageAnnouncements from "./components/admin/management/manageAnnoucements";
import RoomManagement from "./components/admin/management/manageRooms";
import BuildingManagement from "./components/admin/management/manageBuilding";
import AdminSettings from "./components/admin/management/adminSettings";
import EventManagement from "./components/admin/management/manageEvents";
import CreateEvent from "./components/admin/management/eventsComponent/createEvent";
import UpdateEvent from "./components/admin/management/eventsComponent/updateEvent";
import CreateAnnouncement from "./components/admin/management/announcementsComponent/createAnnoncement";
import UpdateAnnouncement from "./components/admin/management/announcementsComponent/updateAnnouncement";
import Archive from "./components/admin/management/manageArchive";
import ManageManual from "./components/admin/management/manualInlineKioskEditor";
import CreateManual from "./components/admin/management/mikeComponent/createManual";
import UpdateManual from "./components/admin/management/mikeComponent/updateManual";
import { Suspense } from "react";
import Loading from "./pages/loading";
import SanFrancisco from './components/campus/sanFrancisco/SanFrancisco';
import Batasan from './components/campus/batasan/Batasan';
setupIonicReact();
interface ContainerProps {
  name: string;
}

const App: React.FC<ContainerProps> = ({ name }) => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/">
          <Redirect to="/Home" />
        </Route>

        <Route path="/Home">
          <Home name={"Home"} buildingName={""} />
        </Route>

        <Route path="/Maps">
          <Maps name={''} />
        </Route>

        <Route path="/SanBartolome">
          <Home name={"home"} buildingName={""} />
        </Route>

        <Route path="/SanFrancisco">
          <SanFrancisco name={"SanFrancisco"} />
        </Route>

        <Route path="/Batasan">
          <Batasan name={"Batasan"} />
        </Route>

        <Route path="/Search">
          <SearchTab />
        </Route>

        <Route path="/Login">
          <Login name={"Login"} />
        </Route>

        <Route path="/Signup">
          <Signup name={"Signup"} />
        </Route>

        {/* ADMIN ROUTES */}

        <Route path="/Dashboard">
          <Dashboard name={"Dashboard"} />
        </Route>

        <Route path="/Announcements">
          <ManageAnnouncements name={"Annoucements"} />
        </Route>

        <Route path="/Rooms">
          <RoomManagement name={"Room Management"} />
        </Route>

        <Route path="/Buildings">
          <BuildingManagement name={"Building Management"} />
        </Route>

        <Route path="/Settings">
          <AdminSettings name={"Settings"} />
        </Route>

        <Route path="/Events">
          <EventManagement name={"Event Management"} />
        </Route>

        <Route path="/createEvent">
          <CreateEvent name={"Create Events"} />
        </Route>

        <Route path="/updateEvent/:eventId">
          <UpdateEvent name={"Update Events"} />
        </Route>

        <Route path="/createAnnouncement">
          <CreateAnnouncement name={"Create Announcements"} />
        </Route>

        <Route path="/updateAnnouncement/:announcementId">
          <UpdateAnnouncement name={"Update Announcements"} />
        </Route>

        <Route path="/Archive">
          <Archive name={"Archive"} />
        </Route>

        <Route path="/Mike">
          <ManageManual name={"Mike"} />
        </Route>

        <Route path="/createManual">
          <CreateManual name={"Create Manual"} />
        </Route>

        <Route path="/updateManual/:manualId">
          <UpdateManual name={"Update Manual"} />
        </Route>

        {/* sheeesh */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
