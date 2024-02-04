// import Mp4 from '../../assets/vids/sb/r_belmonte.mp4';
import { Icon } from '@iconify/react';
import React, { useRef } from 'react';

const CreditsModal: React.FC = () => {
  const handleFinishedNavigatingClick = () => {
    const creditsModal = document.getElementById('qrcode');
    if (creditsModal instanceof HTMLDialogElement) {
        creditsModal.showModal();
    }
};
  return (
    <dialog id="VideoTour" className="modal">
      <div className="modal-box mr-80 max-w-7xl">

<div>
  <video className="w-screen rounded-xl"
    width="640"
    height="360"
    autoPlay
    controls
  >
    {/* <source src={Mp4} type="video/mp4" />
    <source src={Mp4} type="video/ogg"></source> */}
    {/* You can add multiple source elements for different video formats */}
    Your browser does not support the video tag.
  </video>

</div>
<div className="justify-center modal-action">
  <a onClick={handleFinishedNavigatingClick} className="btn ">Finish Navigating</a>
</div>
</div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  );
};

export default CreditsModal;