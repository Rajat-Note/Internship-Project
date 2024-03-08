"use client";

import { useCheckInfoStore } from "@/hooks/use-check-info-store";
import useInfoStore from "@/hooks/use-info-store";
import { useModal } from "@/hooks/use-modal-store";
import { InfoType } from "@/types";
import axios from "axios";

interface InfoItemProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  hobbies: string[];
}

const API_URL = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/post`;

export const InfoItem = ({
  id,
  name,
  email,
  phone,
  hobbies,
}: InfoItemProps) => {
  const { deleteInfo } = useInfoStore();
  const { onOpen } = useModal();
  const { addCheck, removeCheck } = useCheckInfoStore();

  const onDelete = async (id: string) => {
    await axios.delete(API_URL + `/${id}`);
    deleteInfo(id);
  };

  const onCheck = (e: any) => {
    const info: InfoType = {
      id,
      name,
      email,
      phone,
      hobbies,
    };
    if (e.target.checked) {
      addCheck(info);
    } else {
      removeCheck(id);
    }
  };

  return (
    <div className="bg-[#303030] p-4 text-white rounded-md">
      <div className="flex flex-col gap-2 font-semibold">
        <div className="flex justify-between">
          <h1>Id: {id}</h1>
          <input type="checkbox" onClick={onCheck} className="h-4 w-4" />
        </div>

        <h1>Name: {name}</h1>
        <h1 className="overflow-hidden">Email: {email}</h1>
        <h1>Phone: {phone}</h1>
        <h1 className="pt-2">Hobbies: </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {hobbies.map((hobby, ind) => (
            <div
              key={ind}
              className="overflow-hidden text-center px-4 py-1 rounded-full bg-purple-600 text-white"
            >
              {hobby}
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => onOpen("EditInfo", id, name, email, phone, hobbies)}
            className="bg-green-400 rounded-md p-2 w-full"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 rounded-md p-2 w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
