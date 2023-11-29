/*Imported Dependencies */
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

/* Campuses*/
import SanBartolome from './pages/components/campus/SanBartolome';
import SanFransisco from './pages/components/campus/SanFransisco';
import Batasan from './pages/components/campus/Batasan';

/** Error Catching */

/* Imported Components */
import SelectCampus from './pages/tabs/SelectCampus';
import Map from './pages/tabs/Map';
import Categories from './pages/tabs/Categories';
import Welcome from './pages/components/Welcome';
import Error from './pages/components/Error';
import Search from './pages/tabs/Search';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './index.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SampleD from './pages/components/SampleD';
/*Ionic Components*/
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
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
       
          <Route path="/Welcome">
            <Welcome name={'Welcome'} />
          </Route>

          <Route path="/SampleD">
            <SampleD name={'SampleD'} />
          </Route>

          <Route exact path="/SelectCampus">
            <SelectCampus name={'SelectCampus'} />
          </Route>
       
       
          <Route exact path="/SanBartolome">
            <Map name={'Map'} />
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
       
       

          <Route path="/Categories">
            <Categories name={'Categories'} />
          </Route>
       
       
          <Route exact path="/">
            <Redirect to="/Welcome" />
          </Route>
       
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
