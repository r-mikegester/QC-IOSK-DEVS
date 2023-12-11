import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Modal from '../Modals/CreditsModal'; // Assuming you have a Modal component
import { Floor, BuildingData } from '../../../Database/BuildingData.ts'; 

const SelectFloorModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    return (
      <div>
        
        {showModal && (
          <Modal onClose={toggleModal}>
            {/* Render BuildingData here */}
            {BuildingData.map((building: Floor) => (
              <div key={building.buildingName}>
                <h2 className="text-xl font-bold mb-2">{building.buildingName}</h2>
                {building.floors.map((floor) => (
                  <div key={floor.floorNumber}>
                    <h3 className="text-lg font-semibold mb-1">Floor {floor.floorNumber}</h3>
                    <ul>
                      {floor.rooms.map((room) => (
                        <li key={room.id}>{room.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </Modal>
        )}
      </div>
    );
  };
  
  export default SelectFloorModal;