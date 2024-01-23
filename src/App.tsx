/*Imported Dependencies */
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Map*/
import SanBartolome from './components/campus/SanBartolome';
import SanFransisco from './components/campus/SanFransisco';
import Batasan from './components/campus/Batasan';


/** Error Catching */

/* Main Routing */

import Map from './pages/maps';
import Home from './pages/home';
import Search from './pages/search';
import Layout from './pages/layout';


/** Admin Routing */
import Login from "./components/admin/auth/login";
import Signup from "./components/admin/auth/signup";
import Dashboard from "./components/admin/dashboardLayout/dashboard";

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

import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import ManageAnnouncements from './components/admin/dashboardLayout/management/manageAnnoucements';
import RoomManagement from './components/admin/dashboardLayout/management/manageRooms';
import BuildingManagement from './components/admin/dashboardLayout/management/manageBuilding';
import AdminSettings from './components/admin/dashboardLayout/management/adminSettings';
import EventManagement from './components/admin/dashboardLayout/management/manageEvents';
import ThemesManagement from './components/admin/dashboardLayout/management/manageThemes';
import MikeGester from './components/admin/dashboardLayout/management/manualInlineKioskEditor';
import CreateEvent from "./components/admin/dashboardLayout/management/eventsComponent/createEvent";
import UpdateEvent from "./components/admin/dashboardLayout/management/eventsComponent/updateEvent";
setupIonicReact();
interface ContainerProps {
  name: string;
}

declare global {
  interface Window {
    my_modal_2: {
      showModal: () => void;
    };
    select_room: {
      showModal: () => void;
    };
    select_floor: {
      showModal: () => void;
    };
  }
}

const App: React.FC<ContainerProps> = ({ name }) => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
            <Redirect to="/Home" />
          </Route> 
       
          <Route path="/Home">
            <Home name={'Home'} />
          </Route>

          <Route exact path="/Map">
            <Map name={'Map'} />
          </Route>
       
          <Route exact path="/SanBartolome">
            <Layout name={'Layout'} buildingName={''} />
          </Route>
       
          <Route exact path="/SanFransisco">
            <SanFransisco name={'SanFransisco'} />
          </Route>
       
          <Route exact path="/Batasan">
            <Batasan name={'Batasan'} />
          </Route>
       
          <Route exact path="/Search">
            <Search name={'Search'} />
          </Route>
       
         

          <Route exact path="/Login">
          <Login name={"Login"} />
        </Route>

        <Route exact path="/Signup">
          <Signup name={"Signup"} />
        </Route>

        {/* ADMIN ROUTES */}

        <Route exact path="/Dashboard">
          <Dashboard name={"Dashboard"} />
        </Route>

        <Route exact path="/Announcements">
          <ManageAnnouncements name={"Annoucements"} />
        </Route>

        <Route exact path="/Rooms">
          <RoomManagement name={"Room Management"} />
        </Route>

        <Route exact path="/Buildings">
          <BuildingManagement name={"Building Management"} />
        </Route>

        <Route exact path="/Settings">
          <AdminSettings name={"Settings"} />
        </Route>

        <Route exact path="/Events">
          <EventManagement name={"Event Management"} />
        </Route>

        <Route exact path="/Themes">
          <ThemesManagement name={"Themes Management"} />
        </Route>

        <Route exact path="/createEvent">
          <CreateEvent name={"Create Events"} />
        </Route>

        <Route exact path="/updateEvent/:eventId">
          <UpdateEvent name={"Update Events"} />
        </Route>

        <Route exact path="/MikeGester">
          <MikeGester name={"Mike Gester"} />
        </Route>
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
