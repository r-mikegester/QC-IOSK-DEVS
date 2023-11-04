import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './Search.css';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main id="content" role="main" className="bg-white -mt-40 h-screen w-screen px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto ">
          <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
           
            <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
              <span className="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent">Search</span>
            </h2>

            <form className="mx-auto">
              <div className="mt-8 space-y-4  mx-6">
                <div>
                  <label htmlFor="hs-cover-with-gradient-form-name-1" className="sr-only">Search</label>
                  <div className="relative">
                    <input type="text" id="hs-cover-with-gradient-form-name-1" className="py-3 ps-11 pe-4 block w-full bg-gray-900/[.09] border-white/20 text-gray-600 placeholder:text-white rounded-2xl text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11" placeholder="" />
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                      <svg className="h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Search;
