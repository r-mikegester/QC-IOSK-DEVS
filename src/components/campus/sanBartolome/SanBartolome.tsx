import React, { Suspense, useEffect, useState, useTransition } from "react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import SelectToZoom from "./SelectToZoom";
import RotatingMesh from "./RotatingMesh";
import Clouds from "./Clouds";
import openGrounds from "../../../assets/models/others/sb_final2.glb";
import techvoc from "../../../assets/models/sb_buildings/og_techvoc2.glb";
import multipurpose from "../../../assets/models/sb_buildings/og_multipurpose2.glb";
import chineseB from "../../../assets/models/sb_buildings/og_chineseb2.glb";
import ched from "../../../assets/models/sb_buildings/og_metalcasting2.glb";
import simon from "../../../assets/models/sb_buildings/og_yellow2.glb";
import admin from "../../../assets/models/sb_buildings/og_admin2.glb";
import bautista from "../../../assets/models/sb_buildings/og_bautista2.glb";
import belmonte from "../../../assets/models/sb_buildings/og_belmonte2.glb";
import academic from "../../../assets/models/sb_buildings/og_academic2.glb";
import ballroom from "../../../assets/models/sb_buildings/og_ballroom2.glb";
import landscape from "../../../assets/models/others/landscape.glb";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig, { db } from "../../../utils/firebase";
import { initializeApp } from "firebase/app";
import { useHistory } from "react-router";
interface ContainerProps {
  name: string;
}
interface RoomData {
  [key: number]: string[]; // Key is a number, value is an array of strings
}
interface BuildingsData {
  name: string;
  floors: number;
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  const [isNight, setIsNight] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [buildingData, setBuildingData] = useState<any>(null); // State to store building data
  const firestore = getFirestore(initializeApp(firebaseConfig));
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingsCollection = collection(firestore, "Buildings");
        const buildingsSnapshot = await getDocs(buildingsCollection);

        buildingsSnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Error fetching data from Firebase Firestore:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      const isNightTime = currentHour >= 18 || currentHour < 6;

      setIsNight(isNightTime);
    };

    checkTime();

    const intervalId = setInterval(checkTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModelClick = async (modelName: string) => {
    setSelectedBuilding(modelName);
    setShowModal(true);
    console.log(`Clicked on ${modelName}`);

    // Fetch the corresponding document data from Firestore
    try {
      const buildingsCollection = collection(firestore, "Buildings");
      const buildingQuery = query(
        buildingsCollection,
        where("buildingName", "==", modelName)
      );
      const buildingDoc = await getDocs(buildingQuery);

      if (!buildingDoc.empty) {
        const data = buildingDoc.docs[0].data();
        console.log(`${modelName} Documents Found!!`);
        setBuildingData({ ...data, id: buildingDoc.docs[0].id }); // Include document ID in the data
      } else {
        console.warn("Document not found");
      }
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const clickFloor = (floor: string) => {
    setSelectedFloor(floor);
    setSelectedRoom('');
  };

  const selectRoom = (room: string) => {
    setSelectedRoom(room);
  };
  // Define room data


  // Define building data
  const buildingsData: BuildingsData[] = [
    { name: "Belmonte Building", floors: 4 },
    { name: "Bautista Building", floors: 9 },
    { name: "Techvoc Building", floors: 2 },
    { name: "Ched Building", floors: 2 },
    { name: "Simon Building", floors: 2 },
    { name: "Admin Building", floors: 5 },
    { name: "Academic Building", floors: 7 },
    { name: "Ballroom Building", floors: 1 },
    { name: "Admin Building", floors: 1 },
    { name: "Multipurpose Building", floors: 1 },
    { name: "ChineseB Building", floors: 1 },
    // Add more buildings as needed
  ];

  const roomData: Record<string, Record<string, { name: string; details: string[]; textGuide: string[] }[]>> = {
    "Bautista Building": {
      "1": [
        { name: "IKLG", details: ["Room Info 1asdasdasdasd", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "IK101", details: ["Room Info 1", "Room Info 2asdasdasd"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK102", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK103b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK104d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK105", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK106", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK107", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK108", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "3": [
        { name: "IK201", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK202", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK203b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK204d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK205", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK206", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK207", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK208", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "4": [
        { name: "IK301", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK302", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK303b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK304d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK305", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK306", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK307", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK308", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "5": [
        { name: "IK401", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK402", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK403b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK404d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK405", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK406", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK407", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK408", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "6": [
        { name: "IK501", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK502", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK503b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK504d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK505", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK506", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK507", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK508", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "7": [
        { name: "IK601", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK602", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK603b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK604d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK605", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK606", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK607", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IK608", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "8": [
        { name: "7th", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "9": [
        { name: "Mezzanine", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Academic Building": {
      "1": [
        { name: "IB101a", details: ["Room Info 1s", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB102a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB103a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB104a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB105a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB106a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB107a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB108a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB108a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB110a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "IB201f", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB202c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB203b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB204b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB205b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB206b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB207b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB208b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB208c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB210d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "3": [
        { name: "IB301a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB302a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB303a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB304a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB305a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB306a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB307a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB308a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB308a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB310a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "4": [
        { name: "IB401a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB402a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB403a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB404a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB405a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB406a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB407a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB408a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB408a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB410a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "5": [
        { name: "IB501a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB502a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB503a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB504a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB505a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB506a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB507a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB508a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB508a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB510a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "6": [
        { name: "IB601a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB602a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB603a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB604a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB605a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB606a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB607a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB608a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB608a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB610a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "7": [
        { name: "IB701a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB702a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB703a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB704a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB705a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB706a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB707a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB708a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB708a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB710a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Admin Building": {
      "1": [
        { name: "Open Lobby", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "IJ201", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ202", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "3": [
        { name: "IJ301", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "4": [
        { name: "IJ401", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ402", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ403", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ404", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ405", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ406", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ407", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IJ408", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "5": [
        { name: "Open Deck", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Belmonte Building": {
      "1": [
        { name: "IC101a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC102a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC103a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC104a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC105a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC106a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "IC201a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC202a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC203a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC204", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC205a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC206a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "3": [
        { name: "IC301a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC302a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC303a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC304", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC305a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC306a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "4": [
        { name: "IC401a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC402a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC403a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC404", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC405a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IC406a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Techvoc Building": {
      "1": [
        { name: "TVGYM", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA101c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA102c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA103", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA104c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA105", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA106", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA107", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA108c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA109", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA110", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA111", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA112c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "IA201a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA202a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA203", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA204c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA205", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA206", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA207", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA208", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA209", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA210", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA211", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA212", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA213", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA214a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA215a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IA216", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Ched Building": {
      "1": [
        { name: "ID101", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "ID102", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "ID103", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "ID104", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "ID105", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "ID106", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "ID107", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "ID201", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Simon Building": {
      "1": [
        { name: "IB101a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB102a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB103a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB104a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB105a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB106a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB107a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB108a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB109a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB110a", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
      "2": [
        { name: "IB201f", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB202c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB203b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB204b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB205b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB206b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB207b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB208b", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB209c", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
        { name: "IB210d", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "ChineseB Building": {
      "1": [
        { name: "1st", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Multipurpose Building": {
      "1": [
        { name: "1st", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
    "Ballroom Building": {
      "1": [
        { name: "1st", details: ["Room Info 1", "Room Info 2"], textGuide:["Text Guide: 1asdasdasdasd", "Room Info 2"] },
      ],
    },
  };

  // Render rooms based on the selected building and floor
  const renderRooms = () => {
    if (!selectedBuilding || !selectedFloor) return null;

    const rooms = roomData[selectedBuilding]?.[selectedFloor];
    if (!rooms) return null;

    return rooms.map((room, index) => (
      <button
        key={index}
        className={`w-full bg-base-100 btn ${selectedRoom === room.name ? 'bg-blue-500 text-white' : ''}`}
        onClick={() => selectRoom(room.name)}
      >
        {room.name}
        {/* Render room information for each room */}

      </button>
    ));
  };

  const renderRoomInfo = () => {
    if (!selectedBuilding || !selectedFloor) return null;

    const rooms = roomData[selectedBuilding]?.[selectedFloor];
    if (!rooms) return null;

    const selectedRoomData = rooms.find((room) => room.name === selectedRoom);
    if (!selectedRoomData) return null;

    return (
      <div className="flex flex-col w-full h-full space-y-3">
        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" checked />
          <div className="text-xl font-medium collapse-title">
            Details
          </div>
          <div className="collapse-content">
            {selectedRoomData.details.map((details: string, index: number) => (
              <>

                <p key={index}>{details}</p>
              </>
            ))}
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" />
          <div className="text-xl font-medium collapse-title">
            Text Navigation
          </div>
          <div className="collapse-content">
            {selectedRoomData.textGuide.map((textGuide: string, index: number) => (
              <>

                <p key={index}>{textGuide}</p>
              </>
            ))}
          </div>
        </div>

      </div>
    );
  };






  return (
    <>
      <Canvas
        camera={{ fov: 25, position: [10, 4, 10] }}
        className={
          isNight
            ? "bg-gradient-to-tr from-stone-950 to-cyan-950"
            : "bg-gradient-to-tr from-sky-900 to-sky-400"
        }
        style={{ position: "absolute" }}
      >
        <OrbitControls
          minPolarAngle={Math.PI / 6} // vertical rotation
          maxPolarAngle={Math.PI / 2.5} // vertical rotation
          enablePan={true}
          zoomSpeed={1} // based sa touchpad
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableZoom={true}
          minDistance={50}
          maxDistance={120}
        />
        <Clouds />

        <Stage environment={isNight ? "night" : "city"}>
          {isNight ? (
            <>
              <directionalLight castShadow intensity={2} position={[0, 0, 0]} />
              <Stars radius={20} depth={50} count={50} factor={3} />
            </>
          ) : null}
          {/* SB FLOORING */}
          <ModelViewer modelPath={openGrounds} position={[0, 0, 0]} />
          <ModelViewer modelPath={landscape} position={[0, -14, 25]} />
          {/* BUILDINGS */}
          <Bounds fit clip observe margin={2}>
            <SelectToZoom>
              {/* TECHVOC */}
              <ModelViewer
                modelPath={techvoc}
                position={[-1, 1, 15]}
                scale={[2.2, 2.2, 2.2]}
                name="Techvoc"
                textPosition={[-1, 3, 15]}
                onClick={() => handleModelClick("Techvoc Building")}
              />

              {/* MULTIPURPOSE */}
              <ModelViewer
                modelPath={multipurpose}
                position={[11.9, 1, 16]}
                name="Multipurpose"
                textPosition={[11.9, 3, 16]}
                onClick={() => handleModelClick("Multipurpose Building")}
              />

              {/* CHINESE B */}
              <ModelViewer
                modelPath={chineseB}
                position={[11.9, 0.65, 10]}
                scale={[1.5, 1.5, 1.5]}
                name="Chinese B"
                textPosition={[11.9, 2.5, 10]}
                onClick={() => handleModelClick("ChineseB Building")}
              />

              {/* BALLROOM */}
              <ModelViewer
                modelPath={ballroom}
                position={[-17.5, 0.1, 11]}
                scale={[1.5, 1.5, 1.5]}
                name="Ballroom"
                textPosition={[-17.5, 1.5, 11]}
                onClick={() => handleModelClick("Ballroom Building")}
              />

              {/* CHED */}
              <ModelViewer
                modelPath={ched}
                position={[-18.5, 0.1, 4]}
                scale={[1.5, 1.5, 1.5]}
                name="CHED"
                textPosition={[-18.5, 2, 4]}
                onClick={() => handleModelClick("Ched Building")}
              />

              {/* YELLOW */}
              <ModelViewer
                modelPath={simon}
                position={[3.1, 1.1, 0]}
                name="Simon Building"
                textPosition={[3.1, 4.5, 0]}
                onClick={() => handleModelClick("Simon Building")}
              />

              {/* BELMONTE */}
              <ModelViewer
                modelPath={belmonte}
                position={[10, 2, -11]}
                scale={[2, 2, 2]}
                name="Belmonte Building"
                textPosition={[10, 5.5, -11]}
                onClick={() => handleModelClick("Belmonte Building")}
              />

              {/* ACADEMIC */}
              <ModelViewer
                modelPath={academic}
                position={[9, 2, -25]}
                scale={[2, 2, 2]}
                name="Academic Building"
                textPosition={[9, 7, -25]}
                onClick={() => handleModelClick("Academic Building")}
              />

              {/* ADMIN */}
              <ModelViewer
                modelPath={admin}
                position={[-6, 2.1, -11.3]}
                name="Admin Building"
                textPosition={[-6, 6.5, -11.3]}
                onClick={() => handleModelClick("Admin Building")}
              />

              {/* BAUTISTA */}
              <ModelViewer
                modelPath={bautista}
                position={[-7, 2, -27]}
                scale={[2.5, 2.5, 2.5]}
                name="Bautista Building"
                textPosition={[-7, 7, -27]}
                onClick={() => handleModelClick("Bautista Building")}
              />
            </SelectToZoom>
          </Bounds>
          <RotatingMesh />
        </Stage>
      </Canvas>
      <Modal
        className="flex items-center justify-center w-screen h-screen bg-black/60 text-base-content"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Building Information"
      >
        <div className="w-full p-6 m-40 shadow-xl bg-base-200 rounded-3xl h-fit">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-center">
              {selectedBuilding}
            </h2>
            <button
              onClick={closeModal}
              className="btn btn-square hover:bg-red-500 hover:text-white"
            >
              <Icon icon="line-md:close-small" className="w-10 h-10" />
            </button>
          </div>
          <div className="flex justify-center mt-6 space-x-3">
            <div className="px-6 shadow-inner bg-base-300 w-96 rounded-3xl">
              <div className="flex justify-center py-6 border-b-2 border-base-100">
                <button className="h-10 btn bg-base-100 btn-block hover:bg-base-200">
                  Overview
                </button>

              </div>
              <div className="h-full overflow-y-auto ">
                <p className="p-2 text-2xl font-semibold">Floors</p>
                <div className="grid grid-cols-2 gap-2 ">
                  {selectedBuilding &&
                    [...Array(buildingsData.find((building: { name: string; }) => building.name === selectedBuilding)?.floors || 0)].map((_, index: number) => (
                      <button
                        key={index}
                        className={`w-full h-10 bg-base-100 btn ${selectedFloor === `${index + 1}` ? 'bg-base-content text-base-100' : ''
                          }`}
                        onClick={() => clickFloor(`${index + 1}`)}
                      >
                        {index + 1}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full h-full shadow-inner bg-base-300 rounded-2xl">
              <div className="flex items-center p-6 pl-0">
                <div className="w-64 p-6 space-y-2 overflow-y-auto h-96">
                  {/* Render rooms or content based on the selected floor */}
                  {renderRooms()}
                </div>
                <div className="w-full p-6 shadow-inner bg-base-200 h-96 rounded-2xl">
                  {/* Render room information */}
                  {renderRoomInfo()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SanBartolome;