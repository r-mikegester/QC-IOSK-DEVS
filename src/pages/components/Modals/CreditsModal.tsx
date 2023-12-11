// Modal.tsx
import React from 'react';
import { credits } from '../../../Database/CreditsData.ts';
const CreditsModal: React.FC<ModalProps> = () => {

  return (
    <dialog id="Credits" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Credits</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {credits.map((person, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={person.picture}
                  alt={person.name}
                  className="w-40 h-40 rounded-3xl mb-2 object-cover"
                />
                <h2 className="text-xl text-gray-900 font-bold">{person.name}</h2>
                <p className="text-gray-600">{person.position}</p>
              </div>
            ))}
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