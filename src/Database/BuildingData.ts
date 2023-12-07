// BuildingData.ts

// Room interface
interface Room {
  id: number;
  name: string;
}

// Floor interface
export interface Floor {
  buildingName: string;
  floorNumber: number;
  rooms: Room[];
}

// Building structure with floor and room details
interface Building {
  buildingName: string;
  floors: Floor[];
}

// Sample floors data
export const BuildingData: Floor[] = [
  //Belmonte Building 
  {
    buildingName: 'Belmonte Building',
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: 1, name: 'Room IC101a' },
          { id: 2, name: 'Room IC102a' },
          { id: 3, name: 'Room IC103a' },
          { id: 4, name: 'Room IC104' },
          { id: 5, name: 'Room IC105a' },
          { id: 6, name: 'Room IC106a' },
          { id: 8, name: 'Comfort Rooms' },
          
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { id: 1, name: 'Room IC201a' },
          { id: 2, name: 'Room IC202a' },
          { id: 3, name: 'Room IC203a' },
          { id: 4, name: 'Room IC204' },
          { id: 5, name: 'Room IC205a' },
          { id: 6, name: 'Room IC206a' },
          { id: 7, name: 'Room IC207a' },
          { id: 8, name: 'Comfort Rooms' },
          
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { id: 1, name: 'Room IC301a' },
          { id: 2, name: 'Room IC302a' },
          { id: 3, name: 'Room IC303a' },
          { id: 4, name: 'Room IC304' },
          { id: 5, name: 'Room IC305a' },
          { id: 6, name: 'Room IC306a' },
          { id: 7, name: 'Room IC307a' },
          { id: 8, name: 'Comfort Rooms' },
          
        ],
      },
      {
        floorNumber: 4,
        rooms: [
          { id: 1, name: 'Room IC401a' },
          { id: 2, name: 'Room IC402a' },
          { id: 3, name: 'Room IC403a' },
          { id: 4, name: 'Room IC404' },
          { id: 5, name: 'Room IC405a' },
          { id: 6, name: 'Room IC406a' },
          { id: 7, name: 'Room IC407a' },
          { id: 8, name: 'Comfort Rooms' },
          
        ],
      },
    
    ],
  },

  //Simon Building
  {
    buildingName: 'Simon Building',
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { id: 1, name: 'Room IC201' },
          { id: 2, name: 'Room IC202' },
          { id: 3, name: 'Room IC203' },
          { id: 4, name: 'Room IC204' },
          { id: 5, name: 'Room IC205' },
          { id: 6, name: 'Room IC206' },
          { id: 7, name: 'Room IC207' },
          { id: 8, name: 'Room IC208' },
          
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
          
        ],
      },
    ],
  },

];
