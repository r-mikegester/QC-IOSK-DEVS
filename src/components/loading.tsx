import { Icon } from "@iconify/react";
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
              <span className="loading loading-infinity w-96 h-96 "></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
