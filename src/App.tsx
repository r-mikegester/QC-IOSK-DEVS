/*Imported Dependencies */
import { Redirect, Route } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { IonReactRouter } from '@ionic/react-router';

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

/*Ionic Components*/
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
setupIonicReact();
interface ContainerProps {
  name: string;
}
const App: React.FC<ContainerProps> = ({ name }) => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/Welcome">
          <Welcome name={'Welcome'} />
        </Route>
        <Route exact path="/SelectCampus">
          <SelectCampus />
        </Route>
        <Route exact path="/Map">
          <Map />
        </Route>
        <Route exact path="/Search">
          <Search />
        </Route>
        <Route path="/Categories">
          <Categories />
        </Route>
        <Route exact path="/">
          <Redirect to="/Welcome" />
        </Route>
      </IonRouterOutlet>
      {/* <IonTabs className="bg-transparent">

        <IonTabBar slot="bottom" mode="ios" translucent className=" text-emerald-500 backdrop-blur-sm m-5 p-2 w-64 mx-auto rounded-2xl">
          <IonTabButton tab="Search" href="/Search" className="m-2">
            <Icon icon="uil:search-alt" aria-hidden="true" className="w-10 h-10" />

            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="SelectCampus" href="/SelectCampus">
            <Icon icon="ph:buildings-bold" aria-hidden="true" className="w-10 h-10" />
            <IonLabel>Campus</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Categories" href="/Categories">
            <Icon icon="mingcute:grid-2-line" aria-hidden="true" className="w-10 h-10" />
            <IonLabel>Categories</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
