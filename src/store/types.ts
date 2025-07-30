
export interface Wall {
  position: { x: number; y: number; z: number };
  width: number;
  height: number;
  depth: number;
  rotationY?: number;
  windows?: {
    leftBottomPosition: {
      left: number;
      bottom: number;
    };
    width: number;
    height: number;
  }[];
  doors?: {
    leftBottomPosition: {
      left: number;
      bottom: number;
    };
    width: number;
    height: number;
  }[];
}

export interface Floor {
  points: { x: number; z: number }[];
  textureUrl?: string;
}

export interface Ceiling {
  points: { x: number; z: number }[];
  height: number;
}

export interface State {
  data: {
    walls: Wall[];
    floors: Floor[];
    ceilings: Ceiling[];
  };
}