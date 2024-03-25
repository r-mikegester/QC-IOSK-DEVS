// Modal.tsx
import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/modal.css';


// import required modules
// import { Pagination } from 'swiper/modules';
import { Icon } from '@iconify/react';
const KioskModal: React.FC = () => {

    return (
        <dialog id="KioskManual" className="modal">
            <div className="w-11/12 max-w-5xl text-center modal-box backdrop-blur-lg bg-slate-800/80 rounded-3xl">
                <h3 className="text-4xl font-bold ">HOW TO USE QC-IOSK</h3>
                <p className="mb-10 text-center dark:text-gray-200">Use your finger to swipe thru slides </p>
                <div className="w-full bg-transparent rounded-2xl h-96 backdrop-lg ">
                    {/* <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="bg-transparent mySwiper rounded-2xl"
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                    >
                          <SwiperSlide className="text-gray-900 rounded-2xl">
                            <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                                <Icon icon="ph:hand-swipe-left" className="w-20 h-20 text-sky-700" /> 
                                <h2 className="text-2xl font-semibold leadi tracki text-sky-700">Swipe thru this slide </h2>
                                <p className="flex-1 text-center dark:text-gray-700">Use your Fingers to swipe left or right to start navigating the slides.</p>
                               
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="text-gray-900 rounded-2xl">
                            <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                                <Icon icon="material-symbols:pinch-zoom-in-outline-rounded" className="w-20 h-20 text-sky-700" /> 
                                <h2 className="text-2xl font-semibold leadi tracki text-sky-700">Pinch in to Zoom Out </h2>
                                <p className="flex-1 text-center dark:text-gray-700">Use your Fingers to zoom out on the map </p>
                               
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-2xl">
                        <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                               <Icon icon="material-symbols:pinch-zoom-in-outline-rounded" className="w-20 h-20 text-sky-700" /> 
                               <h2 className="text-2xl font-semibold leadi tracki text-sky-700">Pinch in to Zoom In </h2>
                               <p className="flex-1 text-center dark:text-gray-700">Use your Fingers to zoom in on the map </p>
                              
                           </div>
                        </SwiperSlide>
                        <SwiperSlide className="rounded-2xl"><div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                               <Icon icon="streamline:two-finger-drag-hotizontal" className="w-20 h-20 text-sky-700" /> 
                               <h2 className="text-2xl font-semibold leadi tracki text-sky-700">Swipe thru the map to drag </h2>
                               <p className="flex-1 text-center dark:text-gray-700">Use your Fingers to Drag and Explore the map </p>
                              
                           </div></SwiperSlide>
                        <SwiperSlide className="rounded-2xl"><div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                               <Icon icon="streamline:one-finger-drag-horizontal" className="w-20 h-20 text-sky-700" /> 
                               <h2 className="text-2xl font-semibold leadi tracki text-sky-700">Slide Outside the map to rotate </h2>
                               <p className="flex-1 text-center dark:text-gray-700">Use your Fingers to rotate thru the map </p>
                              
                               </div>
                           </SwiperSlide>
                           <SwiperSlide className="rounded-2xl"><div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                               <Icon icon="tdesign:gesture-click"className="w-20 h-20 text-sky-700" /> 
                               <h2 className="text-2xl font-semibold leadi tracki text-sky-700">You can click on the Building</h2>
                               <p className="flex-1 text-center dark:text-gray-700">Use your Fingers to click on the different Building and explore floors and rooms.  </p>
                              
                               </div>
                           </SwiperSlide>
                           <SwiperSlide className="rounded-2xl"><div className="relative flex flex-col items-center max-w-lg gap-4 p-6 my-10 rounded-md sm:py-8 sm:px-12 dark:bg-white dark:text-gray-100">
                               
                               <Icon icon="mingcute:check-2-line"  className="w-20 h-20 text-emerald-700" /> 
                               <h2 className="text-2xl font-semibold leadi tracki text-sky-700">Now your Done and Good to Go!</h2>
                               <p className="flex-1 text-center dark:text-gray-700">You can now freely explore the map with your own will. you can now close this manual. </p>
                              
                               </div>
                           </SwiperSlide>
                        ...
                    </Swiper> */}
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default KioskModal;