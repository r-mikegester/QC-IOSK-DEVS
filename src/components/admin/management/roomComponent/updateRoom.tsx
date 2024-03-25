import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { roomData } from "../../../../data/roomData";

const UpdateRoom: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>(); // Extract roomName from URL params
  const [newRoomName, setNewRoomName] = useState(""); // State to hold new room name
  const history = useHistory();

  // Function to handle update
  const handleUpdate = () => {
    // Update the room name in roomData
    const updatedRoomData = { ...roomData };
    for (const buildingName in updatedRoomData) {
      for (const floorNumber in updatedRoomData[buildingName]) {
        const rooms = updatedRoomData[buildingName][floorNumber];
        for (const room of rooms) {
          if (room.name === roomName) {
            room.name = newRoomName;
          }
        }
      }
    }
    // Here you would implement logic to save the updated room data, for now, let's just navigate back to the room management page
    history.push("/Rooms");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h1 className="text-base-content">Update Room</h1>
          <div>
            <label htmlFor="newRoomName" className="text-base-content">
              New Room Name:
            </label>
            <input
              type="text"
              id="newRoomName"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
          </div>
          <button onClick={handleUpdate} className="text-base-content">
            Update Room
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpdateRoom;