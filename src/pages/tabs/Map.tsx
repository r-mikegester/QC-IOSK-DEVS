import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../components/campus/SanBartolome';
import Dock from '../components/dock';
import Controls from '../components/controls';
import { IonButton, IonHeader, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
interface ContainerProps {
  name: string;
}
const Map: React.FC<ContainerProps> = ({ name }) => {
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
          <dialog id="SelectBuilding" className="modal">
            <div className="modal-box max-w-3xl ">
              <h3 className="font-bold text-center text-5xl">{name} Building</h3>
              <div className="grid grid-cols-6 gap-1">

              </div>
              <h3 className="font-bold text-center text-3xl">Select Floor</h3>
              <div className="grid grid-cols-4 gap-4 mt-10">
                {/* <div className="bg-sky-900 w-20 h-60 m-2 rounded-2xl text-center justify-center py-16 px-auto text-xl backdrop-blur-lg ">1</div> */}
                <div className="flex flex-col w-full">
                  <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box  max-w-3xl">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <span><h3 className="font-bold text-center text-5xl">Select Room</h3></span>
                        <h3 className="font-bold text-center text-3xl">Ground Floor</h3>
                        <div className="grid grid-cols-4 mt-10 gap-1">
                          <div className="">

                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
                              <IonContent>
                              <IonMenuToggle>
                                <IonButton>Click</IonButton>
                              </IonMenuToggle>
                              </IonContent>
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                            <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                  <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                  <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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
                  <div className="grid h-20 card bg-base-300 rounded-box place-items-center" onClick={() => document.getElementById('my_modal_2').showModal()}>
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

        <Dock name={'Dock'} />
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu Content</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonMenuToggle>
              <IonButton>Click to close the menu</IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>
      </IonContent>
    </IonPage>
  );
};

export default Map;
