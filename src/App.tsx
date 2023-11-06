import { Redirect, Route } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './index.css';
import {
  IonApp,
 // IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
//import { ellipse, square, triangle } from 'ionicons/icons';
import SelectCampus from './pages/tabs/SelectCampus';
import Map from './pages/tabs/Map';
import Categories from './pages/tabs/Categories';
import Welcome from './pages/components/Welcome';
import Error from './pages/components/Error';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

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
import Search from './pages/tabs/Search';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs className="bg-transparent">
        <IonRouterOutlet>
        <Route path="/Welcome">
            <Welcome name={'Welcome'} />
          </Route>
          <Route exact path="/SelectCampus">
            <SelectCampus />
          </Route>
          <Route exact  path="/Map">
            <Map />
          </Route>
          <Route exact path="/Search">
            <Search />
          </Route>
          <Route path="/Categories">
            <Categories />
          </Route>
          <Route exact path="/">
            <Redirect to="/Error" />
            <Error name={'Error'} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className=" text-emerald-500  m-5 p-2 w-64 mx-auto rounded-2xl">
          <IonTabButton tab="Search" href="/Search" className="m-2">
          <Icon icon="uil:search-alt" aria-hidden="true" className="w-10 h-10"/>
     
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="SelectCampus" href="/SelectCampus">
          <Icon icon="ph:buildings-bold"  aria-hidden="true" className="w-10 h-10"/>
            <IonLabel>Campus</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Categories" href="/Categories">
          <Icon icon="mingcute:grid-2-line"  aria-hidden="true" className="w-10 h-10"/>
            <IonLabel>Categories</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
