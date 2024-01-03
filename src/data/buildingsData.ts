export interface Room {
  name: string;
  id: string;
}

export interface Floor {
  floorNumber: number;
  rooms: Room[];
}

export interface Building {
  name: string;
  floors: Floor[];
}

export const BuildingsData: Building[] = [
  {
    name: 'Belmonte Building', // Belmonte Hell
    floors: [
      {
        floorNumber: 1,
        rooms: [
          {id: '1', name: 'Room IC201' },
          { id: '2', name: 'Room IC202' },
          { id: '3', name: 'Room IC203' },
          { id: '4', name: 'Room IC204' },
          { id: '5', name: 'Room IC205' },
          { id: '6', name: 'Room IC206' },
          { id: '7', name: 'Room IC207' },
          { id: '8', name: 'Room IC208' },
          // Add more rooms for Floor 1 if needed
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          {id: '1', name: 'Room IC201' },
          { id: '2', name: 'Room IC202' },
          { id: '3', name: 'Room IC203' },
          { id: '4', name: 'Room IC204' },
          { id: '5', name: 'Room IC205' },
          { id: '6', name: 'Room IC206' },
          { id: '7', name: 'Room IC207' },
          { id: '8', name: 'Room IC208' },
          // Add more rooms for Floor 2 if needed
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          {id: '1', name: 'Room IC201' },
          { id: '2', name: 'Room IC202' },
          { id: '3', name: 'Room IC203' },
          { id: '4', name: 'Room IC204' },
          { id: '5', name: 'Room IC205' },
          { id: '6', name: 'Room IC206' },
          { id: '7', name: 'Room IC207' },
          { id: '8', name: 'Room IC208' },
          // Add more rooms for Floor 2 if needed
        ],
      },
      {
        floorNumber: 4,
        rooms: [
          {id: '1', name: 'Room IC201' },
          { id: '2', name: 'Room IC202' },
          { id: '3', name: 'Room IC203' },
          { id: '4', name: 'Room IC204' },
          { id: '5', name: 'Room IC205' },
          { id: '6', name: 'Room IC206' },
          { id: '7', name: 'Room IC207' },
          { id: '8', name: 'Room IC208' },
          // Add more rooms for Floor 2 if needed
        ],
      },
      // Add more floors for 'Mike Gester Sabuga' building if needed
    ],
  },
  {
    name: 'Simon Building', // Yellow Building
    floors: [
      {
        floorNumber: 1,
        rooms: [
          {id: '1', name: 'Room IC201' },
          { id: '2', name: 'Room IC202' },
          { id: '3', name: 'Room IC203' },
          { id: '4', name: 'Room IC204' },
          { id: '5', name: 'Room IC205' },
          { id: '6', name: 'Room IC206' },
          { id: '7', name: 'Room IC207' },
          { id: '8', name: 'Room IC208' },
          // Add more rooms for Floor 1 if needed
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          {id: '1', name: 'Room IC201' },
          { id: '2', name: 'Room IC202' },
          { id: '3', name: 'Room IC203' },
          { id: '4', name: 'Room IC204' },
          { id: '5', name: 'Room IC205' },
          { id: '6', name: 'Room IC206' },
          { id: '7', name: 'Room IC207' },
          { id: '8', name: 'Room IC208' },
          // Add more rooms for Floor 2 if needed
        ],
      },
      // Add more floors for 'Mike Gester Sabuga' building if needed
    ],
  },
  // Add more buildings as needed
];
