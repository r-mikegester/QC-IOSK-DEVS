import { credits } from '../../../database/creditsData';
import { Icon } from '@iconify/react';
import React from 'react';

const CreditsModal: React.FC = () => {

  return (
    <dialog id="Credits" className="modal">
      <div className="modal-box bg-slate-800/70 backdrop-blur-lg w-11/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="container mx-auto py-8">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Meet our Team</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Creative people</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credits.map((person, index) => (
              <div key={index} className="flex flex-col rounded-3xl hover:drop-shadow-xl shadow-sky-600 p-4 md:p-6 bg-white border border-gray-200 dark:bg-slate-800/70 backdrop-blur-lg  dark:border-gray-700">
                <div className="flex items-center gap-x-4">
                  <img className="rounded-2xl w-20 h-20 object-cover" src={person.picture} alt={person.name} />
                  <div className="grow">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {person.name}
                    </h3>
                    <p className="text-xs uppercase text-gray-500">
                      {person.position}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-x-1">
                  <a className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                  <a className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                  <a className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Special Thanks to:</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">for helping us out.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 justify-center ">
              <div className="flex flex-col rounded-3xl p-4 md:p-6 bg-white border  border-gray-200 dark:bg-slate-800/70 backdrop-blur-lg  dark:border-gray-700">
                <div className="flex items-center gap-x-4 ">
                  <img className="rounded-2xl w-20 h-20" src="/src/Imgs/ids/niki.jpg" />
                  <div className="grow">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      Niki
                    </h3>
                    <p className="text-xs uppercase text-gray-500">
                      German Translator
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-x-1">
                  <a className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" target="_blank" href="487659045264687114">
                    <Icon icon="radix-icons:discord-logo" className="w-5 h-5" />
                  </a>
                  <a className="inline-flex justify-center items-center w-8 h-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" target="_blank" href="https://www.tiktok.com/@vrnki.gr?lang=en">
                    <Icon icon="ph:tiktok-logo-bold" className="w-5 h-5" />
                  </a>

                </div>
              </div>
              {/* 
              <a className="col-span-full lg:col-span-1 group flex flex-col justify-center text-center rounded-xl p-4 md:p-6 border border-dashed border-gray-200 hover:shadow-sm dark:border-gray-700" href="#">
                <h3 className="text-lg text-gray-800 dark:text-gray-200">
                  We are hiring!
                </h3>
                <div>
                  <span className="inline-flex items-center gap-x-2 text-blue-600 group-hover:text-blue-700 dark:text-blue-500 dark:group-hover:text-blue-400">
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