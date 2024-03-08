"use client";

import { Plus } from "lucide-react";
import { InfoItem } from "./info-item";
import { useModal } from "@/hooks/use-modal-store";
import useInfoStore from "@/hooks/use-info-store";
import { InfoType } from "@/types";
import { useEffect } from "react";
import axios from "axios";
import { useCheckInfoStore } from "@/hooks/use-check-info-store";

export const Infos = () => {
  const { infos, setInfos } = useInfoStore();
  const API_URL = `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/post`;
  const { onOpen } = useModal();
  const { countCheck, checked } = useCheckInfoStore();

  useEffect(() => {
    const fetchInfos = async () => {
      const response = await axios.get(API_URL);
      const data = response.data.map((info: any) => ({
        id: info._id,
        name: info.name,
        email: info.email,
        phone: info.phone,
        hobbies: info.hobbies,
      }));
      setInfos(data);
    };

    fetchInfos();
  }, []);

  const onSubmit = async () => {
    await axios.post("/api/email", checked);
  };

  return (
    <div className="bg-[#212121] rounde-lg px-8 py-4 flex flex-col ">
      <header className="font-bold text-xl p-4 text-white text-center">
        All Users
      </header>

      <Plus
        onClick={() => onOpen("AddInfo")}
        className="text-white bg-purple-600 rounded-full mx-auto my-4 cursor-pointer"
        size={30}
      />

      <div className="grid grid-rows-1 md:grid-cols-3 gap-4">
        {infos?.map((info: InfoType, index: number) => (
          <InfoItem
            key={index}
            id={info.id}
            name={info.name}
            email={info.email}
            phone={info.phone}
            hobbies={info.hobbies}
          />
        ))}
      </div>

      <div className="pt-5">
        <button
          disabled={countCheck < 1}
          onClick={onSubmit}
          className="bg-purple-800 text-white rounded-md p-2 w-full disabled:bg-zinc-600"
        >
          Send Entries{countCheck > 0 ? `(${countCheck})` : ""}
        </button>
      </div>
    </div>
  );
};
