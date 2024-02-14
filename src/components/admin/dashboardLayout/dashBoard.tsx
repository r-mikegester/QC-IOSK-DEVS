import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSidebar from "./constant/adminSidebar";
import AdminHeader from "./constant/adminHeader";
import { IonPage, IonContent } from "@ionic/react";
import AdminLayout from "./layout";
import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

interface ContainerProps {
  name: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyANObsAtf2_q9MDeX6HhVamSji62MIsWAk",
  authDomain: "qc-iosk-a8f26.firebaseapp.com",
  databaseURL: "https://qc-iosk-a8f26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qc-iosk-a8f26",
  storageBucket: "qc-iosk-a8f26.appspot.com",
  messagingSenderId: "214553767394",
  appId: "1:214553767394:web:54344b8b3a5510d31e1dbb",
  measurementId: "G-719EHFS9CP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const Dashboard: React.FC<ContainerProps> = ({ name }) => {
  const [visitorsCount, setVisitorsCount] = useState<number | null>(null);
  const [buildingsCount, setBuildingsCount] = useState<number | null>(null);
  const [announcementsCount, setAnnouncementsCount] = useState<number | null>(null);
  const [eventsCount, setEventsCount ] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorsData = async () => {
      try {
        const visitorsCollectionName = 'Visitors';
        const visitorsCollectionRef = collection(db, visitorsCollectionName);
        const visitorsQuerySnapshot = await getDocs(visitorsCollectionRef);
        const visitorsCountValue = visitorsQuerySnapshot.size;

        setVisitorsCount(visitorsCountValue);
      } catch (error) {
        console.error('Error fetching Visitors count:', error);
      }
    };

    const fetchBuildingsData = async () => {
      try {
        const buildingsCollectionName = 'Buildings';
        const buildingsCollectionRef = collection(db, buildingsCollectionName);
        const buildingsQuerySnapshot = await getDocs(buildingsCollectionRef);
        const buildingsCountValue = buildingsQuerySnapshot.size;

        setBuildingsCount(buildingsCountValue);
      } catch (error) {
        console.error('Error fetching Buildings count:', error);
      }
    };

    const fetchAnnouncementsData = async () => {
      try {
        const visitorsCollectionName = 'Announcements';
        const visitorsCollectionRef = collection(db, visitorsCollectionName);
        const visitorsQuerySnapshot = await getDocs(visitorsCollectionRef);
        const visitorsCountValue = visitorsQuerySnapshot.size;

        setAnnouncementsCount(visitorsCountValue);
      } catch (error) {
        console.error('Error fetching Visitors count:', error);
      }
    };

    const fetchEventsData = async () => {
      try {
        const visitorsCollectionName = 'Events';
        const visitorsCollectionRef = collection(db, visitorsCollectionName);
        const visitorsQuerySnapshot = await getDocs(visitorsCollectionRef);
        const visitorsCountValue = visitorsQuerySnapshot.size;

        setEventsCount(visitorsCountValue);
      } catch (error) {
        console.error('Error fetching Visitors count:', error);
      }
    };
    fetchVisitorsData();
    fetchBuildingsData();
    fetchAnnouncementsData();
    fetchEventsData();
  }, [db]);
  const history = useHistory();

  const ClickWelcome = () => {
    // Redirect to the "/Home" route
    history.push("/Home");
  };
  const ClickMap = () => {
    // Redirect to the "/Map" route
    history.push("/Campuses");
  };
  const ClickSearch = () => {
    // Redirect to the "/Search" route
    history.push("/Search");
  };

  const { t } = useTranslation();
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          {/* <AdminLayout name={""}/> */}
          <AdminHeader name={""} />
          <AdminSidebar name={""} />
          <div className="items-center justify-center h-auto text-base-content bg-base-300 lg:ps-64 ">

            <div className="grid w-full min-h-screen grid-cols-4 grid-rows-4 gap-5 p-10 bg-base-100 rounded-tl-3xl">
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                      <h1>{visitorsCount}</h1>
                      <p>no of visitors</p>
                    </div>
                    <div className="flex">
                      <Icon icon="akar-icons:people-group" className="w-10 h-10" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                   <h1> {buildingsCount}</h1>
                     <p>active buildings</p>
                    </div>
                    <div className="flex">
                      <Icon icon="bx:buildings" className="w-10 h-10" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                    <h1>{announcementsCount}</h1>
                      <p>Active Annoucements</p>
                    </div>
                    <div className="flex">
                      <Icon icon="streamline:annoncement-megaphone" className="w-10 h-10" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-span-4 lg:col-span-1 md:col-span-3 sm:col-span-3">
                <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">
                    <div className="flex flex-col items-start">
                    <h1>{eventsCount}</h1>
                      <p>Active Events</p>
                    </div>
                    <div className="flex">
                      <Icon icon="streamline:calendar-star" className="w-10 h-10" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-span-3 row-span-3 ">
                <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">


                </div>
              </div>
              <div className="col-span-1 row-span-3 ">
                <div className="flex flex-col items-center justify-between h-full p-3 shadow-md bg-base-300 rounded-2xl">
                  <div className="flex items-center justify-between space-x-12">

                  </div>

                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>


  )
};

export default Dashboard; 