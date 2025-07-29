import { create } from "zustand";
import type { State } from "./types";
import houseType1 from "./houseType1";

const useHouseStore = create<State>((set, get) => {
  return {
    data: houseType1
  };
});

export { useHouseStore };
