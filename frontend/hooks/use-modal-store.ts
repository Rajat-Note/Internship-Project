import { InfoType } from "@/types";
import { create } from "zustand";

export type ModalType = "AddInfo" | "EditInfo";

interface ModalStore {
  type: ModalType | null;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  hobbies?: string[];
  isOpen: boolean;
  onOpen: (
    type: ModalType,
    id?: string,
    name?: string,
    email?: string,
    phone?: string,
    hobbies?: string[]
  ) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, id = "", name = "", email = "", phone = "", hobbies = []) =>
    set({ isOpen: true, type, id, name, email, phone, hobbies }),
  onClose: () => set({ isOpen: false, type: null }),
}));
