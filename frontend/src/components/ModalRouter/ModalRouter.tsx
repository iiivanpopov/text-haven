"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Login from "./Modals/Login";
import Register from "./Modals/Register";

export default function ModalRouter() {
  const searchParams = useSearchParams();
  const modalType = searchParams.get("modal");

  const [isOpen, setIsOpen] = useState(!!modalType);

  useEffect(() => {
    setIsOpen(!!modalType);
  }, [modalType]);

  if (!isOpen) {
    return null;
  }

  switch (modalType) {
    case "login":
      return <Login />;
    case "register":
      return <Register />;
    default:
      return null;
  }
}
