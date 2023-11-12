import { Icon } from '@iconify/react';
interface ContainerProps {
    name: string;
}

const Keyboard: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container mx-auto bg-red-500">
            <div className="mx-auto">
                <div className="row-1 mx-10 w-full h-16">
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">`</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">1</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">2</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">3</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">4</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">5</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">6</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">7</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">8</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">9</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">0</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">-</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">=</button>
                    <button className="back w-32 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Backspace</button>
                </div>
                <div className="row-2 mx-10 w-full h-16">
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Tab</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Q</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">W</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">E</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">R</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">T</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Y</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">U</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">I</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">O</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">P</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">[</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">]</button>
                    <button className="slash w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">\</button>
                </div>
                <div className="row-3 mx-10 w-full h-16">
                    <button className="w-28 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Capslock</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">A</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">S</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">D</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">F</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">G</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">H</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">J</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">K</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">L</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">;</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">'</button>
                    <button className="enter w-28 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Enter</button>
                </div>
                <div className="row-4 mx-10 w-full h-16">
                    <button className="w-28 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Shift</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Z</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">X</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">C</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">V</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">B</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">N</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">M</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">,</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">.</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">/</button>
                    <button className="shift w-28 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Shift</button>
                </div>
                <div className="row-5 mx-10 w-full h-16">
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Ctrl</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Fn</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90"><Icon icon="simple-icons:windows" className="w-3 h-3 mx-auto" /></button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Alt</button>
                    <button className="w-80 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Space</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-95">Alt</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Fn</button>
                    <button className="w-14 h-14 bg-gray-900 mx-1 rounded-2xl hover:drop-shadow-xl hover:scale-105 duration-300 ease-in-out active:scale-90">Ctrl</button>
                </div>
            </div>
        </div>
    );
};

export default Keyboard;
