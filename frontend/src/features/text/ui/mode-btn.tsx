"use client";

import { Check, Wrench } from "lucide-react";
import type { MouseEvent } from "react";
import { FileMode, setMode } from "@features/text/model/slice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import Button from "@shared/ui/user-input/button";

interface ChangeModeProps {
  onSaveAction: () => void;
}

export default function ModeBtn({ onSaveAction }: ChangeModeProps) {
  const { mode, text } = useAppSelector((state) => state.textReducer);

  const dispatch = useAppDispatch();
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (mode === FileMode.EDIT && text.id) {
      onSaveAction();
    }

    dispatch(setMode(mode === FileMode.EDIT ? FileMode.VIEW : FileMode.EDIT));
  };

  return (
    <Button
      name="Configure"
      className="w-48"
      onClick={handleClick}
    >
      {mode === FileMode.VIEW ? <Wrench size={32} /> : <Check size={32} />}
    </Button>
  );
}
