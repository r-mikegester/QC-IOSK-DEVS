import { useProgress } from '@react-three/drei'; // Import useProgress
import qculogo from '../assets/imgs/logo/qculogo.png';

const Loading = () => {
  const { progress } = useProgress(); // useProgress hook

  return (
    <div className="z-50 bg-base-100 h-screen w-screen flex justify-center items-center">
      <div className="grid grid-cols-3 grid-rows-3 items-center">
        <div className="flex content-center col-span-3 row-span-3 justify-center h-screen w-screen">
          <div className="content-center">
            <div className="text-center text-base-content h-screen py-52">

              <div className="radial-progress bg-gradient-to-tr from-accent to-primary" style={{ '--value': progress, "--size": "15.5rem", "--thickness": "20px" } as any} role="progressbar">
                <img src={qculogo} className="w-36 h-36 md:w-52 md:h-52" alt="Logo" />
                </div>
              <p className="font-semibold text-3xl text-base-content mt-5">{(progress * 1).toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Loading;
