import { credits } from '../../data/creditsData';
import { Icon } from '@iconify/react';
// import niki from '../../assets/imgs/ids/niki.jpg';
import React from 'react';

const CreditsModal: React.FC = () => {

  return (
    <dialog id="Credits" className="modal">
      <div className="w-11/12 max-w-5xl modal-box bg-slate-800/70 backdrop-blur-lg">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
        </form>
        <div className="container py-8 mx-auto">
          <div className="max-w-2xl mx-auto mb-10 text-center lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Meet our Team</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Creative people</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {credits.map((person, index) => (
              <div key={index} className="flex flex-col p-4 bg-white border border-gray-200 rounded-3xl hover:drop-shadow-xl shadow-sky-600 md:p-6 dark:bg-slate-800/70 backdrop-blur-lg dark:border-gray-700">
                <div className="flex items-center gap-x-4">
                  <img className="object-cover w-20 h-20 rounded-2xl" src={person.picture} alt={person.name} />
                  <div className="grow">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {person.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase">
                      {person.position}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-x-1">
                  <a className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                  <a className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                  <a className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

            <div className="max-w-2xl mx-auto mb-10 text-center lg:mb-14">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Special Thanks to:</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">for helping us out.</p>
            </div>

            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 ">
              <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-3xl md:p-6 dark:bg-slate-800/70 backdrop-blur-lg dark:border-gray-700">
                <div className="flex items-center gap-x-4 ">
                  {/* <img className="w-20 h-20 rounded-2xl" src={niki}/> */}
                  <div className="grow">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      Niki
                    </h3>
                    <p className="text-xs text-gray-500 uppercase">
                      German Translator
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-x-1">
                  <a className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" target="_blank" href="487659045264687114">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                  <a className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" target="_blank" href="https://www.tiktok.com/@vrnki.gr?lang=en">
                    <Icon icon="ph:tiktok-logo-bold" className="w-5 h-5" />
                  </a>

                </div>
              </div>
              {/* 
              <a className="flex flex-col justify-center p-4 text-center border border-gray-200 border-dashed col-span-full lg:col-span-1 group rounded-xl md:p-6 hover:shadow-sm dark:border-gray-700" href="#">
                <h3 className="text-lg text-gray-800 dark:text-gray-200">
                  We are hiring!
                </h3>
                <div>
                  <span className="inline-flex items-center text-blue-600 gap-x-2 group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400">
                    See all opening positions
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </span>
                </div>
              </a> */}

            </div>

          </div>

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

export default CreditsModal;