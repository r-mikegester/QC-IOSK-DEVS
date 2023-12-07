import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';
import { Icon } from '@iconify/react';
import Controls from '../components/controls';
import { BuildingData, Floor } from '../../database/BuildingData.ts';
//import Directions from './../components/directions';
import React, { useState, useRef } from 'react';
import Backbtn from '../components/Backbtn';
import { useHistory } from 'react-router-dom';
interface ContainerProps {
  name: string;
}


const Map: React.FC<ContainerProps> = ({ name }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);

  const handleRoomClick = (roomId: number) => {
    // Handle room click action here, for example, navigate to the room details
    history.push(`/room/${roomId}`); // Replace with your desired routing logic
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const history = useHistory();

  const handleFloorClick = (floors: Floor) => {
    if (selectedFloor && selectedFloor.floorNumber === floor.floorNumber) {
      // Clicking on the selected floor again hides the rooms
      setSelectedFloor(null);
    } else {
      setSelectedFloor(floor);
    }
  };
  const handleClick = () => {
    // Redirect to the "/Map" route
    history.push('/SampleD');
  };
  const contentRef = useRef<HTMLIonContentElement>(null);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="absolute top-0 right-20 z-50 ">
          <Controls name={'Controls'} />
        </div>
        <div className="z-10">
          <SanBartolome name={'SanBartolome'} />
        </div>


        <div className="absolute bottom-10 right-10 ">
          {floors.map((floor) => (
            <dialog id="SelectBuilding" className="modal">
              <div className="modal-box max-w-3xl ">

                <h3 className="font-bold text-center text-5xl">{BuildingName}</h3>
                <form method="dialog" className="modal-backdrop">
                  <button className="btn btn-square hover:scale-110 absolute top-10 left-10"><Icon icon="typcn:arrow-back-outline" className="w-8 h-8" /></button>
                </form>
                <h3 className="font-bold text-center text-3xl">Selected Floor: {selectedFloor.floorNumber}</h3>
                <div className="grid grid-cols-4 gap-4 mt-10">

                  <div
                    key={floor.floorNumber}
                    className="flex flex-col w-full"
                    onClick={() => handleFloorClick(floor)}
                  >
                    <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110 ease-in-out duration-200 rounded-box place-items-center">
                      <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">
                        {floor.floorNumber}
                      </h3>
                    </div>
                  </div>

                  {/* Display rooms for the selected floor*/}
                  {selectedFloor && (
                    <div>
                      <h3 className="font-bold text-center text-3xl">
                        Select Room - Floor {selectedFloor.floorNumber}
                      </h3>
                      <div className="grid grid-cols-4 mt-10 gap-1">
                        {selectedFloor.rooms.map((room) => (
                          <div
                            key={room.id}
                            className="flex flex-col w-full"
                            onClick={() => handleRoomClick(room.id)}
                          >
                            <div className="grid h-20 shadow-lg bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110 ease-in-out duration-200 rounded-box place-items-center">
                              <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">
                                {room.name}
                              </h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}


                  <div className="flex flex-col w-full">
                    <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('select_floor').showModal()}>
                      <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">Ground</h3>

                      <dialog id="select_floor" className="modal">
                        <div className="modal-box  max-w-3xl">
                          <form method="dialog">

                            <button className="btn btn-square hover:scale-110 absolute left-5 top-10"><Icon icon="typcn:arrow-back-outline" className="w-8 h-8" /></button>
                          </form>
                          <span><h3 className="font-bold text-center text-5xl">Select Room</h3></span>
                          <h3 className="font-bold text-center text-3xl">Ground Floor</h3>
                          <div className="grid grid-cols-4 mt-10 gap-1">
                            <div className="flex flex-col w-full">

                              <div className="grid h-20 shadow-lg bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('select_room').showModal()}>

                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC101</h3>
                                <dialog id="select_room" className="modal">

                                  <div className="modal-box w-96 absolute right-0 top-0 transition-transform transform translate-x-0 ease-in-out duration-300  drawer-overlay  min-h-screen rounded-r-none p-5 ">
                                    <h3 className="font-bold text-center text-3xl">Details</h3>

                                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-0 lg:py-5 mx-auto">

                                      <div className="grid md:grid-cols-1 border border-gray-200 shadow-sm rounded-xl overflow-hidden dark:border-gray-700">

                                        <h3 className="font-bold text-center text-xl">IC101</h3>
                                        <a className="block p-4 md:p-5  hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full  before:first:bg-transparent  dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                          <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                            <Icon icon="mdi:information-variant-circle-outline" className="w-10 h-10 text-gray-500" />

                                            <div className="grow">
                                              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-gray-200">
                                                Belmonte Building
                                              </p>
                                              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-gray-500">
                                                2nd Floor
                                              </h3>
                                              <div className="mt-1 flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                  Room: <span className="font-semibold text-gray-800 dark:text-gray-200">IC101</span>
                                                </p>

                                              </div>
                                            </div>
                                          </div>

                                        </a>
                                        <a className="block p-4 md:p-5  hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full  before:first:bg-transparent  dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                          <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                            <Icon icon="pepicons-pop:rewind-time" className="w-10 h-10 text-gray-500" />

                                            <div className="grow">
                                              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-gray-200">
                                                Estimated Time of Arrival ( ETA )
                                              </p>
                                              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-gray-500">
                                                4:26
                                              </h3>
                                              <div className="mt-1 flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                  Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                                                </p>

                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                        <hr className="bg-gray-400/50 m-6" />
                                        <h3 className="font-bold text-center text-3xl">Directions</h3>
                                        <a className="block p-4 md:p-5  hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full  before:first:bg-transparent  dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                          <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                            <Icon icon="mdi:arrow-up-thick" className="w-10 h-10 text-gray-500" />

                                            <div className="grow">
                                              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-gray-200">
                                                Head towards Techvoc Building
                                              </p>

                                              <div className="mt-1 flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                  Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                                                </p>

                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                        <a className="block p-4 md:p-5  hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full  before:first:bg-transparent  dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                          <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                            <Icon icon="mdi:arrow-left-top-bold" className="w-10 h-10 text-gray-500" />

                                            <div className="grow">
                                              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-gray-200">
                                                Head towards Techvoc Building
                                              </p>

                                              <div className="mt-1 flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                  Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                                                </p>

                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                        <a className="block p-4 md:p-5  hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full  before:first:bg-transparent  dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                          <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                            <Icon icon="mdi:arrow-right-top-bold" className="w-10 h-10 text-gray-500" />

                                            <div className="grow">
                                              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-gray-200">
                                                Head towards Techvoc Building
                                              </p>

                                              <div className="mt-1 flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                  Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                                                </p>

                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                        <a className="block p-4 md:p-5  hover:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full  before:first:bg-transparent  dark:hover:bg-slate-800 dark:before:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                          <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                                            <Icon icon="mdi:arrow-up-thick" className="w-10 h-10 text-gray-500" />

                                            <div className="grow">
                                              <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-gray-200">
                                                Head towards Techvoc Building
                                              </p>

                                              <div className="mt-1 flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                  Average: <span className="font-semibold text-gray-800 dark:text-gray-200">4:11</span>
                                                </p>

                                              </div>
                                            </div>
                                          </div>
                                        </a>


                                      </div>

                                      <div className="absolute bottom-5 inset-x-0 mx-6">
                                        <button onClick={handleClick} className="btn w-full bg-sky-800 rounded-xl">
                                          <Icon icon="material-symbols:moved-location-rounded" className="w-8 h-8" />
                                          Start Navigation
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>
                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC102</h3>
                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Press ESC key or click outside to close</p>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>
                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC103</h3>

                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Press ESC key or click outside to close</p>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>
                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC104</h3>

                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-center text-5xl">Select Room</h3>
                                    <div className="grid grid-cols-6 gap-1">



                                    </div>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>


                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC105</h3>

                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Press ESC key or click outside to close</p>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>


                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC106</h3>
                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Press ESC key or click outside to close</p>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>


                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC107</h3>
                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-center text-5xl">Select Room</h3>
                                    <div className="grid grid-cols-6 gap-1">



                                    </div>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>


                            </div>
                            <div className="flex flex-col w-full">
                              <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">IC108</h3>
                                <dialog id="my_modal_2" className="modal">
                                  <div className="modal-box max-w-3xl">
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Press ESC key or click outside to close</p>
                                  </div>
                                  <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                  </form>
                                </dialog>
                              </div>


                            </div>
                          </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                      <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">2nd</h3>
                      <dialog id="my_modal_2" className="modal">
                        <div className="modal-box max-w-3xl">
                          <h3 className="font-bold text-center text-5xl">Select Room</h3>
                          <div className="grid grid-cols-6 gap-1">



                          </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>


                  </div>
                  <div className="flex flex-col w-full">
                    <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                      <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">3rd</h3>
                      <dialog id="my_modal_2" className="modal">
                        <div className="modal-box max-w-3xl">
                          <h3 className="font-bold text-lg">Hello!</h3>
                          <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>


                  </div>
                  <div className="flex flex-col w-full">
                    <div className="grid h-20 card bg-gray-400/50 btn glass hover:text-gray-300 group hover:scale-110  ease-in-out duration-200 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                      <h3 className="text-gray-900 group-hover:text-gray-300 font-extrabold text-4xl">4th</h3>
                      <dialog id="my_modal_2" className="modal">
                        <div className="modal-box max-w-3xl">
                          <h3 className="font-bold text-lg">Hello!</h3>
                          <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>


                  </div>

                </div>
              </div>

              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          ))
          }
        </div >

        <Dock name={'Dock'} />
      </IonContent >
    </IonPage >
  );
};

export default Map;
