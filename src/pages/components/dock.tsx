import { Icon } from '@iconify/react';
interface ContainerProps {
  name: string;
}

const Dock: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="mx-auto w-96 h-20 rounded-2xl  absolute inset-x-0 bottom-5 bg-gray-700 ">
      <div className="tabs absolute inset-0 mx-auto items-center ">
        <a className="btn tab rounded-2xl  justify-center  hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1 " href="/Search"><Icon icon="uil:search-alt" aria-hidden="true" className="w-8 h-8" />Search</a>
        <a className="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1  tab-active" href="/SelectCampus"> <Icon icon="tabler:replace"aria-hidden="true" className="w-10 h-10" />Switch</a>
        <a className="btn tab rounded-2xl  justify-center hover:bg-gray-600 bg-gray-700 border-none h-full w-full hover:scale-75 active:scale-75 flex-col gap-1" href="/Categories"><Icon icon="mingcute:grid-2-line" aria-hidden="true" className="w-10 h-10" />Menu</a>
      </div>
    </div>
  );
};

export default Dock;
