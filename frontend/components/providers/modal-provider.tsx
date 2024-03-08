"use client";

import { useEffect, useState } from "react";

import { CreateFormModal } from "@/components/modals/create-form-modal";
import { EditFormModal } from "../modals/edit-form-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateFormModal />
      <EditFormModal />
    </>
  );
};
