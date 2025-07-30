import { create } from "zustand";
import type { State } from "./types";
import houseType1 from "./houseType1";
import houseType2 from "./houseType2";
const useHouseStore = create<State>((set, get) => {
  return {
    data: houseType2
  };
});

export { useHouseStore };
