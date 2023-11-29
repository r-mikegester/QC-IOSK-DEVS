// floorsData.ts

// Room interface
interface Room {
    id: number;
    name: string;
  }
  
  // Floor interface
  export interface Floor {
    floorNumber: number;
    rooms: Room[];
  }
  
  // Sample floors data
  export const floors: Floor[] = [
    {
      floorNumber: 1,
      rooms: [
        { id: 1, name: 'Room IC101' },
        { id: 2, name: 'Room IC102' },
        { id: 3, name: 'Room IC103' },
        { id: 4, name: 'Room IC104' },
        { id: 5, name: 'Room IC105' },
        { id: 6, name: 'Room IC106' },
        { id: 7, name: 'Room IC107' },
        { id: 8, name: 'Room IC108' },
        // Add more rooms for floor 1
      ],
    },
    {
      floorNumber: 2,
      rooms: [
        { id: 1, name: 'Room IC201' },
        { id: 2, name: 'Room IC202' },
        { id: 3, name: 'Room IC203' },
        { id: 4, name: 'Room IC204' },
        { id: 5, name: 'Room IC205' },
        { id: 6, name: 'Room IC206' },
        { id: 7, name: 'Room IC207' },
        { id: 8, name: 'Room IC208' },
        // Add more rooms for floor 2
      ],
    },
    {
      floorNumber: 3,
      rooms: [
        { id: 1, name: 'Room IC301' },
        { id: 2, name: 'Room IC302' },
        { id: 3, name: 'Room IC303' },
        { id: 4, name: 'Room IC304' },
        { id: 5, name: 'Room IC305' },
        { id: 6, name: 'Room IC306' },
        { id: 7, name: 'Room IC307' },
        { id: 8, name: 'Room IC308' },
        // Add more rooms for floor 3w
      ],
    },
    {
      floorNumber: 4,
      rooms: [
        { id: 1, name: 'Room IC401' },
        { id: 2, name: 'Room IC402' },
        { id: 3, name: 'Room IC403' },
        { id: 4, name: 'Room IC404' },
        { id: 5, name: 'Room IC405' },
        { id: 6, name: 'Room IC406' },
        { id: 7, name: 'Room IC407' },
        { id: 8, name: 'Room IC408' },
        // Add more rooms for floor 4
      ],
    },
    // Add more floors with respective rooms as needed
  ];
  