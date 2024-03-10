import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";

interface ContainerProps {
  name: string;
}

interface Building {
  id: string;
  buildingName: string;
}

interface Room {
  id: string;
  roomName: string;
  buildingName: string;
}

const RoomManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingsCollection = collection(db, "buildings");
        const queryBuilding = query(
          buildingsCollection,
          orderBy("buildingName", "asc")
        );
        const buildingsSnapshot = await getDocs(queryBuilding);
        const buildingsData = buildingsSnapshot.docs.map((doc) => {
          const buildingData = doc.data() as Building;
          return { ...buildingData, id: doc.id } as Building;
        });
        setBuildings(buildingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buildings: ", error);
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const fetchRooms = async (buildingName: string) => {
    try {
      const roomsCollection = collection(db, "roomData");
      const q = query(
        roomsCollection,
        where("buildingName", "==", buildingName) // Filter rooms based on selected building
      );

      const querySnapshot = await getDocs(q);
      const roomsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const room: Room = {
          id: doc.id,
          roomName: data.roomName,
          buildingName: data.buildingName,
          // Add other room properties here as needed
        };
        return room;
      });
      setRooms(roomsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
      setLoading(false);
    }
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    const selectedBuildingName = buildings[index].buildingName;
    fetchRooms(selectedBuildingName);
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
              <div role="tablist" className="tabs tabs-lifted tabs-sm">
                {buildings.map((building, index) => (
                  <a
                    key={index}
                    role="tab"
                    className={`tab ${
                      selectedTab === index ? "tab-active" : ""
                    }`}
                    onClick={() => handleTabChange(index)}
                  >
                    {building.buildingName}
                  </a>
                ))}
              </div>

              <br />

              {loading ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 justify-evenly">
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                    </div>
                    <hr className="w-full h-2 rounded-full bg-base-300 " />
                    <div className="flex flex-col w-full gap-4">
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Building Name</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    {rooms.length === 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={6}>
                            <div role="alert" className="alert">
                              <Icon
                                icon="uil:comment-info-alt"
                                className="w-8 h-8"
                              />
                              <span>No Rooms found.</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {rooms.map((room) => (
                          <tr key={room.id}>
                            <th>{room.roomName}</th>

                            <td>
                              <div className="flex items-center space-x-3">
                                <button className="btn btn-square hover:bg-orange-500 hover:text-white">
                                  <Icon
                                    icon="tabler:edit"
                                    className="w-10 h-10"
                                  />
                                </button>

                                <button className="btn btn-square hover:bg-red-500 hover:text-white">
                                  <Icon
                                    icon="mdi:delete-empty-outline"
                                    className="w-10 h-10"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RoomManagement;
