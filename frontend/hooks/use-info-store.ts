import { create } from "zustand";

interface InfoType {
  id: string;
  name: string;
  email: string;
  phone: string;
  hobbies: string[];
}

interface InfoStore {
  infos: InfoType[];
  setInfos: (infos: InfoType[]) => void;
  addInfo: (info: InfoType) => void;
  editInfo: (id: string, info: InfoType) => void;
  deleteInfo: (id: string) => void;
}

const useInfoStore = create<InfoStore>((set) => ({
  infos: [],
  setInfos: (infos: InfoType[]) => set((state) => ({ infos })),
  addInfo: (info) => set((state) => ({ infos: [...state.infos, info] })),
  editInfo: (id, info) =>
    set((state) => ({
      infos: state.infos.map((inf) => (inf.id === id ? info : inf)),
    })),
  deleteInfo: (id) =>
    set((state) => ({ infos: state.infos.filter((inf) => inf.id !== id) })),
}));

export default useInfoStore;
