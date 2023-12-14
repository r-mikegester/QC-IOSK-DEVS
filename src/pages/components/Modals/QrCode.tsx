// Modal.tsx
import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import Mp4 from '../../../Vids/sb/r_simon.mp4';
import QRcode from '../../../Imgs/qr.png';
const Qrcode: React.FC = () => {

  return (
    <dialog id="qrcode" className="modal">
        <div className="modal-box justify-center  items-center w-auto mx-auto">
          <img src={QRcode} className="w-64 h-64 mx-auto mt-10 rounded-3xl" />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
          <div className="modal-action justify-center items-center">
            <h1></h1>
            <a href="/Sanbartolome" className="btn btn-error">Exit Navigation</a>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  );
};

export default Qrcode;