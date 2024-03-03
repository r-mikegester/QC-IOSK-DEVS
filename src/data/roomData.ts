import IB101 from "../assets/animation/yellow/101a.glb";
import IB102 from "../assets/animation/yellow/102.glb";
import IB103 from "../assets/animation/yellow/103a.glb";
import IB101Voice from "../assets/audio/voice101a.mp3";

import IL401a from "../assets/animation/academic/Academic-IL401a.glb";
import IL301a from "../assets/animation/academic/Acad - IL301.glb";

export const roomData: Record<
  string,
  Record<
    string,
    {
      buildingName: string;
      floorNumber: string;
      officeName?: string;
      name: string;
      modelPath: string;
      voice: string;
      details: string[];
      textGuide: string[];
    }[]
  >
> = {
  "Academic Building": {
    "3": [
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "LESIT (Sample)",
        name: "IB301a",
        modelPath: IL301a,
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        officeName: "SSC (Sample)",
        name: "IB302a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB303a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB304a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB305a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB306a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB307a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB308a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB308a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Academic Building",
        floorNumber: "3rd",
        name: "IB310a",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },

  "Simon Building": {
    "1": [
      {
        buildingName: "Simon Building",
        floorNumber: "1st",
        name: "IB101a",
        modelPath: IB101,
        voice: IB101Voice,
        details: ["Room Info 1", "Room Info 2"],
        textGuide: [
          "Text Guide: 1asdasdasdasd",
          "Text Guide 2",
          "Text Guide 3",
          "Text Guide 4",
          "QWERTY",
        ],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st",
        name: "IB102a",
        modelPath: IB102,
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
      {
        buildingName: "Simon Building",
        floorNumber: "1st",
        name: "IB103a",
        modelPath: IB103,
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
    "2": [
      {
        buildingName: "Simon Building",
        floorNumber: "2nd",
        name: "IB201f",
        modelPath: "",
        voice: "",
        details: ["Room Info 1", "Room Info 2"],
        textGuide: ["Text Guide: 1asdasdasdasd", "Room Info 2"],
      },
    ],
  },
};
