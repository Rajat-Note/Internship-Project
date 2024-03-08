import { InfoType } from "@/types";
import { create } from "zustand";

interface CheckInfoStore {
  checked: InfoType[];
  countCheck: number;
  addCheck: (data: InfoType) => void;
  removeCheck: (id: string) => void;
}

export const useCheckInfoStore = create<CheckInfoStore>((set) => ({
  checked: [],
  countCheck: 0,
  addCheck: (data: InfoType) =>
    set((state) => ({
      checked: [...state.checked, data],
      countCheck: state.countCheck + 1,
    })),
  removeCheck: (id: string) =>
    set((state) => ({
      checked: state.checked.filter((item) => item.id !== id),
      countCheck: state.countCheck - 1,
    })),
}));
