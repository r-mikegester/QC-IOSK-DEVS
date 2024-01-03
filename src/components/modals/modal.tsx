// Modal.tsx
import { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [animation, setAnimation] = useState('');

  // Add or remove the 'animate-pop' class based on modal open/close
  const modalClasses = `fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  const closeModal = () => {
    setAnimation('animate-pop');
    setTimeout(() => {
      onClose();
      setAnimation('');
    }, 150); // adjust timing to match your animation duration
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Clicked on the backdrop area
      closeModal();
    }
  };

  return (
    <div id="BuildingSelect" className={modalClasses} onClick={handleBackdropClick}>
      <div className={`bg-base-100 p-6 rounded-2xl shadow-md ${animation}`}>
        <button className="absolute text-base-content top-2 right-2" onClick={closeModal}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="mb-4 text-lg font-bold text-base-content">Modal Title</h2>
        <p>Modal Content Goes Here</p>
      </div>
    </div>
  );
};

export default Modal;
