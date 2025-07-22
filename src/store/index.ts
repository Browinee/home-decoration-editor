import { create } from "zustand";

interface Wall {
    p1: {
        x: number,
        z: number
    },
    p2: {
        x: number,
        z: number
    },
    p3: {
        x: number,
        z: number
    },
    p4: {
        x: number,
        z: number
    }
}


interface State {
  data: {
    walls: Wall[]
  }
}
const useHouseStore = create<State>((set, get) => {
  return {
      data: {
          walls: [
              {
                  p1: {x: 0, z: 0},
                  p2: {x: 500, z: 0},
                  p3: {x: 500, z: 30},
                  p4: {x: 0, z: 30}
              },
              {
                  p1: {x: 0, z: 0},
                  p2: {x: 0, z: 500},
                  p3: {x: 30, z: 500},
                  p4: {x: 30, z: 0}
              }
          ]
      }
  }
});

export  {
  useHouseStore
};