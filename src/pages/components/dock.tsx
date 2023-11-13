import { Icon } from '@iconify/react';
interface ContainerProps {
  name: string;
}

const Dock: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="mx-auto w-96 h-20 rounded-2xl  absolute inset-x-0 bottom-5 bg-gray-700 ">
      <div className="tabs absolute inset-0 mx-auto items-center ">
        <a className="btn tab rounded-2xl  justify-center  hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 " href="/Search"> <Icon icon="uil:search-alt" aria-hidden="true" className="w-10 h-10" /></a>
        <a className="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75   tab-active" href="/Map"> <Icon icon="ph:buildings-bold" aria-hidden="true" className="w-10 h-10" /></a>
        <a className="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 " href="/Categories"><Icon icon="mingcute:grid-2-line" aria-hidden="true" className="w-10 h-10" /></a>
      </div>
    </div>
  );
};

export default Dock;
