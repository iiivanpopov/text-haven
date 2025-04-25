"use client";

import { use, useEffect } from "react";
import EditForm from "@features/text/ui/edit-form";
import Preview from "@features/text/ui/preview";
import ChangeMode from "@features/text/ui/change-mode";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { fetchFile } from "@features/text/model/actions";

export default function Text({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { mode } = useAppSelector((state) => state.textReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFile(id));
  }, [id]);

  return (
    <div className="mt-10 grid grid-rows-[5vh_1fr]">
      <ChangeMode />
      {mode == "read" ? <Preview /> : <EditForm />}
    </div>
  );
}
