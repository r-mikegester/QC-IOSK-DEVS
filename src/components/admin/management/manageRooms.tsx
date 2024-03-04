import { Icon } from "@iconify/react";
import { Route, Switch, useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import React, { useState } from "react";
import { roomData } from "../../../data/roomData";
import UpdateRoom from "./roomComponent/updateRoom";
interface ContainerProps {
  name: string;
}

const RoomManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(0);

  const renderTableRows = () => {
    const buildings = Object.keys(roomData);
    const selectedBuilding = buildings[activeTab];
    return Object.keys(roomData[selectedBuilding]).map((floorNumber) => {
      return roomData[selectedBuilding][floorNumber].map((room, index) => (
        <tr key={index}>
          <td>{room.name}</td>
          <td>{room.floorNumber}</td>
          <td>{room.officeName || ""}</td>
          <td>{room.details.join(", ")}</td>
          <td>
            <button
              className="btn btn-square hover:bg-emerald-500 hover:text-white"
              onClick={() => handleEdit(room.name)}
            >
              <Icon icon="icon-park-outline:add-three" className="w-10 h-10" />
            </button>
            <button className="btn btn-square hover:bg-red-500 hover:text-white">
              <Icon icon="mdi:delete-alert-outline" className="w-10 h-10" />
            </button>
          </td>
        </tr>
      ));
    });
  };

  const handleEdit = (roomName: string) => {
    // Handle editing the room
    history.push(`/updateRoom/${roomName}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Room Management</h1>
              </div>

              <br />
              <br />

              <div role="tablist" className="tabs tabs-lifted tabs-lg">
                {Object.keys(roomData).map((buildingName, index) => (
                  <React.Fragment key={index}>
                    <input
                      type="radio"
                      name="building_tabs"
                      role="tab"
                      className="tab w-auto"
                      // aria-label={`Tab ${index + 1}`}
                      aria-label={buildingName}
                      checked={activeTab === index}
                      onChange={() => setActiveTab(index)}
                    />
                    <div
                      role="tabpanel"
                      className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                    >
                      <h2>{buildingName} Information</h2>
                      <div className="overflow-x-auto">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Room Code</th>
                              <th>Floor</th>
                              <th>Office</th>
                              <th>Text Guide</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{renderTableRows()}</tbody>
                        </table>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RoomManagement;
