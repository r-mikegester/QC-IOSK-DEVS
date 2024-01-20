import { Icon } from "@iconify/react";
interface ContainerProps {
  name: string;
}

const Loading: React.FC<ContainerProps> = ({ name }) => {

  return (
    
    <div className="z-50 bg-transparent">
      <div className="flex items-center justify-center ">
        <div className="items-center justify-center text-center ">
          <h1 className="text-center w-96 h-96  text-base-content"><span className="loading loading-infinity w-96 h-96"></span></h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
