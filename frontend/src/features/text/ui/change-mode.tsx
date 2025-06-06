"use client";

import { Check, Wrench } from "lucide-react";
import type { MouseEvent } from "react";
import { updateFile } from "@features/text/model/actions";
import { setMode } from "@features/text/model/slice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import Button from "@shared/ui/user-input/button";

export default function ChangeMode() {
  const {
    mode,
    text: { name, content, id },
  } = useAppSelector((state) => state.textReducer);
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name && content && mode == "edit") {
      dispatch(updateFile({ id, meta: { name }, content }));
    }

    dispatch(setMode(mode == "edit" ? "read" : "edit"));
  };

  return (
    <Button name="Configure" className={"w-48"} onClick={handleClick}>
      {mode == "read" ? <Wrench size={32} /> : <Check size={32} />}
    </Button>
  );
}
