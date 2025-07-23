import { create } from "zustand";
interface Wall {
    position: { x: number, y: number, z: number},
    width: number,
    height: number,
    depth: number,
    rotationY?: number,
    windows: [
        {
            leftBottomPosition: {
                x: number,
                z: number
            },
            width: number,
            height: number
        }
    ]
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
                    position: { x: 0, y: 0, z: 0},
                    width: 800,
                    height: 500,
                    depth: 30,
                    windows: [
                        {
                            leftBottomPosition: {
                                x: 100,
                                z: 100
                            },
                            width: 600,
                            height: 300
                        }
                    ]
                },
                {
                    position: { x: 0, y: 0, z: 800},
                    width: 800,
                    height: 500,
                    depth: 30,
                    windows: [
                        {
                            leftBottomPosition: {
                                x: 100,
                                z: 100
                            },
                            width: 600,
                            height: 300
                        }
                    ]
                },
                {
                    position: { x: 0, y: 0, z: 0},
                    width: 800,
                    height: 500,
                    depth: 30,
                    rotationY: -Math.PI / 2,
                    windows: [
                    ]
                },
                {
                    position: { x: 800, y: 0, z: 0},
                    width: 800,
                    height: 500,
                    depth: 30,
                    rotationY: -Math.PI / 2,
                    windows: [
                    ]
                }
            ]
        }
    }
});

export  {
  useHouseStore
};