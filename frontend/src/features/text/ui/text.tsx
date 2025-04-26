"use client";

import { use, useEffect } from "react";
import EditForm from "@features/text/ui/edit-form";
import Preview from "@features/text/ui/preview";
import ChangeMode from "@features/text/ui/change-mode";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { fetchFile } from "@features/text/model/actions";
import { twMerge } from "tailwind-merge";

export default function Text({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

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
