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
  buildingName: string;
  roomCode: string;
  description: string;
  textGuide: string[];
  squareMeter: number;
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

  useEffect(() => {
    // Fetch rooms when buildings data is loaded or when the component mounts
    if (buildings.length > 0) {
      const selectedBuildingName = buildings[selectedTab].buildingName;
      fetchRooms(selectedBuildingName);
    }
  }, [buildings, selectedTab]);

  const fetchRooms = async (buildingName: string) => {
    try {
      const buildingsCollection = collection(db, "buildings");
      const q = query(
        buildingsCollection,      
        where("buildingName", "==", buildingName)
      );

      const querySnapshot = await getDocs(q);
      const buildingDoc = querySnapshot.docs[0]; // Assuming there's only one document per building name
      const buildingData = buildingDoc.data();
      const floors = buildingData.floors;

      // Check if floors is a map
      if (typeof floors === "object" && floors !== null) {
        // Iterate over each floor
        const roomsData: Room[] = [];
        Object.values(floors).forEach((floor: any) => {
          // Check if floor is a map and contains rooms
          if (typeof floor === "object" && floor !== null) {
            Object.values(floor).forEach((room: any) => {
              // Assuming each room has a "roomName" and a "textGuide" field
              roomsData.push({
                id: room.id, // Assuming you have an id field for each room
                roomCode: room.roomCode,
                squareMeter: room.squareMeter,
                description: room.description,
                buildingName: room.buildingName,
                textGuide: room.textGuide || [], // Ensure textGuide is an array, default to empty array
              });
            });
          }
        });

        setRooms(roomsData);
        setLoading(false);
      } else {
        // Handle if floors is not an object or null
        console.error("Floors data is not in the expected format");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching rooms: ", error);
      setLoading(false);
    }
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
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
                        <th>Room Code</th>
                        <th>No. of m^2</th>
                        <th>Description</th>
                        <th>Text Guide</th>
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
                            <th>{room.roomCode}</th>
                            <th>{room.squareMeter}</th>
                            <th>{room.description}</th>
                            <td>{room.textGuide}</td>

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