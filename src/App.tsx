/*Imported Dependencies */
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Campuses*/
import SanBartolome from './components/campus/SanBartolome';
import SanFransisco from './components/campus/SanFransisco';
import Batasan from './components/campus/Batasan';

/** Error Catching */

/* Main Routing */
import Campuses from './pages/Campuses';
import Home from './pages/Home';
import Search from './pages/Search';
import Layout from './pages/layout';

/** Admin Routing */
import Login from "./components/admin/auth/login";
import Signup from "./components/admin/auth/signup";
import Dashboard from "./components/admin/layout/dashboard";



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './assets/css/index.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/typography.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';


/* Optional CSS utils that can be commented out */
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/padding.css';
/* Theme variables */
import './assets/css/variables.css';
/*Ionic Components*/
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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

          <Route exact path="/Campuses">
            <Campuses name={'Campuses'} />
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

        <Route exact path="/Dashboard">
          <Dashboard name={"Dashboard"} />
        </Route>
       
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
