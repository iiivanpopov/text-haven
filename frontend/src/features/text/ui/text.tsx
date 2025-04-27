"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { fetchFile } from "@features/text/model/actions";
import ChangeMode from "@features/text/ui/change-mode";
import EditForm from "@features/text/ui/edit-form";
import Preview from "@features/text/ui/preview";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";

export default function Text() {
  const { id } = useParams<{ id: string }>();

  const {
    mode,
    text: { userId },
  } = useAppSelector((state) => state.textReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFile(id));
  }, [id]);

  return (
    <div
      className={twMerge(
        "mt-10 grid",
        user?.id == userId ? "grid-rows-[5vh_1fr]" : "grid-rows-1",
      )}
    >
      {user?.id == userId && <ChangeMode />}
      {mode == "read" ? <Preview /> : <EditForm />}
    </div>
  );
}
