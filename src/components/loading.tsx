import { Icon } from "@iconify/react";
import qculogo from '../assets/imgs/logo/qculogo.png';
interface ContainerProps {
  name: string;
}

const Loading: React.FC<ContainerProps> = ({ name }) => {

  return (

    <div className="z-50 bg-base-100 h-screen w-screen">
      <div className="grid grid-cols-3 grid-rows-3 items-center">
        <div className="flex content-center col-span-3 row-span-3 justify-center h-screen w-screen ">
          <div className="content-center">
            <div className="text-center text-base-content h-screen py-52">
              <img src={qculogo} className="animate-bounce w-36 h-36 md:w-52 md:h-52" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
