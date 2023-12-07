import { IonContent, IonPage } from '@ionic/react';
import SanBartolome from '../campus/SanBartolome';
import Dock from '../components/dock';
import { Icon } from '@iconify/react';
import Controls from '../components/controls';
//import { BuildingData, Floor, Room } from '../../database/BuildingData.ts';
import React, { useState, useRef } from 'react';
import Backbtn from '../components/Backbtn';
import { useHistory } from 'react-router-dom';
interface ContainerProps {
  name: string;
}


const Map: React.FC<ContainerProps> = ({ name }) => {
  const [showModal, setShowModal] = useState(false);
  //const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);

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

  // const handleFloorClick = (floor: Floor) => {
  //if (selectedFloor && selectedFloor.floorNumber === floor.floorNumber) {
  // Clicking on the selected floor again hides the rooms
  //      setSelectedFloor(null);
  //   } else {
  //     setSelectedFloor(floor);
  //   }
  // };
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
        <div className="absolute bottom-10 right-10">
          {/* {BuildingData && BuildingData.length > 0 && BuildingData.map((building: Building) => (
            building.floors.map((floor: Floor) => (
              <dialog id="SelectBuilding" className="modal">
                <div className="modal-box max-w-3xl ">
                  <div key={floor.floorNumber}>
                    <h3>Floor {floor.floorNumber}</h3>
                    <form method="dialog" className="modal-backdrop">
                      <button className="btn btn-square hover:scale-110 absolute top-10 left-10"><Icon icon="typcn:arrow-back-outline" className="w-8 h-8" /></button>
                    </form>
                    <h3 className="font-bold text-center text-3xl">Selected Floor: {selectedFloor.floorNumber}</h3>
                    <div className="grid grid-cols-4 gap-4 mt-10">
                      <div>
                     
                        {floor.rooms && floor.rooms.length > 0 ? (
                          floor.rooms.map((room: Room) => (
                            <div key={room.id}
                             className="flex flex-col w-full"
                            onClick={() => handleRoomClick(room.id)}
                            >
                              <p>Room: {room.name}</p>
                     
                            </div>
                          ))
                        ) : (
                          <p>No rooms found on this floor.</p>
                        )} */}
        </div>
  <Dock name={'Dock'} />
      </IonContent >
    </IonPage >
  );
};

export default Map;
