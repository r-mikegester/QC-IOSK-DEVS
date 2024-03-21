import { useProgress } from '@react-three/drei'; // Import useProgress
import qculogo from '../assets/imgs/logo/qculogo.png';

const Loading = () => {
  const { progress } = useProgress(); // useProgress hook

  return (
    <div className="z-50 flex items-center justify-center w-screen h-screen skeleton bg-base-100">
      <div className="grid items-center grid-cols-3 grid-rows-3">
        <div className="flex content-center justify-center w-screen h-screen col-span-3 row-span-3">
          <div className="content-center">
            <div className="h-screen text-center text-base-content py-52">

              <div className="border-2 border-accent radial-progress text-accent" style={{ '--value': progress, "--size": "15.5rem", "--thickness": "20px" } as any} role="progressbar">
                <img src={qculogo} className="w-36 h-36 md:w-52 md:h-52" alt="Logo" />
                </div>
              <p className="mt-5 text-3xl font-semibold text-base-content">{(progress * 1).toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Loading;
