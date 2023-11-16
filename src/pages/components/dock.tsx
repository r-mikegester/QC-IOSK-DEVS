import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
interface ContainerProps {
  name: string;
}

const Dock: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const ClickWelcome = () => {
    // Redirect to the "/Welcome" route
    history.push('/Welcome');
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push('/SelectCampus');
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push('/Search');
  };
  return (
    // <div classNameName="mx-auto w-96 h-20 rounded-2xl  absolute inset-x-0 bottom-5 bg-gray-700 ">
    //   <div classNameName="tabs absolute inset-0 mx-auto items-center ">
    //     <a classNameName="btn tab rounded-2xl  justify-center  hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1 " href="/Search"><Icon icon="uil:search-alt" aria-hidden="true" classNameName="w-8 h-8" />Search</a>
    //     <a classNameName="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1  tab-active" href="/SelectCampus"> <Icon icon="tabler:replace"aria-hidden="true" classNameName="w-10 h-10" />Switch</a>
    //     <a classNameName="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1" href="/Categories"><Icon icon="mingcute:grid-2-line" aria-hidden="true" classNameName="w-10 h-10" />Menu</a>
    //   </div>
    // </div>

    <div className="fixed bottom-6 left-1/2 h-20 transform -translate-x-1/2 inline-flex mx-auto justify-between border-t-2 dark:border-slate-600/60 backdrop-blur-lg dark:bg-slate-800/50 w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12 rounded-2xl">
      <a onClick={ClickWelcome}
        aria-current="page"
        className="inline-flex flex-col hover:scale-75 ease-in-out hover:bg-sky-900 rounded-2xl  duration-200 hover:text-white active:text-white items-center text-xs font-medium py-5 px-4  text-blue-300 flex-grow"
        
      >
        <Icon icon="icon-park-outline:back" className="w-10 h-10" />
        <small className="text-center text-xs font-medium"> Home</small>
        <span className="sr-only">Home</span>
      </a>

      <a onClick={ClickMap} className="btn bg-transparent border-none hover:bg-transparent relative inline-flex flex-col items-center text-xs font-medium text-blue-300  py-3 px-6 flex-grow">
        <div className=" group absolute -bottom-5 py-6 px-5 w-24  h-24 hover:bg-sky-900  duration-200 hover:text-white active:text-white  rounded-full border-4 border-blue-300 hover:border-white dark:bg-slate-800 ease-in-out animate-bounce">
          <Icon icon="fluent-mdl2:home-group" className="w-10 h-10  focus:animate-ping group-hover:scale-75 ease-in-out duration-200" />
        </div>
        <span className="sr-only">Map</span>
      </a>
      <a onClick={ClickSearch}
        className="inline-flex flex-col hover:scale-75 hover:bg-sky-900 rounded-2xl ease-in-out duration-200 hover:text-white active:text-white items-center text-xs font-medium text-blue-300 py-5 px-4 flex-grow"
       
      >
        <Icon icon="wpf:search" className="w-10 h-10" />
        <small className="text-center text-xs font-medium"> Search</small>    
         <span className="sr-only">Search</span>
      </a>
 

    </div>

  );
};

export default Dock;
