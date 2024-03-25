import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where, // Import 'where' for filtering documents
} from "firebase/firestore";
import { db } from "../../utils/firebase";

interface ContainerProps {
  name: string;
}

interface Building {
  id: string;
  buildingName: string;
  floors: string[];
}

const BuildingManagement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeBuildings: () => void;

    const fetchBuildings = async () => {
      try {
        const buildingsCollection = collection(db, "buildings");
        const q = query(buildingsCollection, orderBy("buildingName", "asc"));

        unsubscribeBuildings = onSnapshot(q, (querySnapshot) => {
          const buildingsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const building: Building = {
              id: doc.id,
              buildingName: data.buildingName,
              floors: data.floors, // Assuming floors are stored in data.floors
            };
            return building;
          });
          setBuildings(buildingsData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching buildings: ", error);
        setLoading(false);
      }
    };

    fetchBuildings();

    return () => {
      if (unsubscribeBuildings) {
        unsubscribeBuildings();
      }
    };
  }, []);

  // Function to calculate total number of floors for a building
  const calculateTotalFloors = (floors: { [key: string]: any } | undefined) => {
    return floors ? Object.keys(floors).length : 0;
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-full p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Building Management</h1>
              </div>

              <br />
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
                        <th>Floors</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {buildings.length === 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={6}>
                            <div role="alert" className="alert">
                              <Icon
                                icon="uil:comment-info-alt"
                                className="w-8 h-8"
                              />
                              <span>No Buildings found.</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {buildings.map((building, index) => (
                          <tr key={index}>
                            <th>{building.buildingName}</th>
                            <td>{calculateTotalFloors(building.floors)}</td>
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

export default BuildingManagement;