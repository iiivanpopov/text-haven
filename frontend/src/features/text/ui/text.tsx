"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FileMode, setFile } from "@features/text/model/slice";
import ModeBtn from "@features/text/ui/mode-btn";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import {
  useFetchFileQuery,
  useUpdateFileMutation,
} from "@features/text/model/api";
import { useEffect } from "react";
import { useGetUserQuery } from "@features/profile/model/api";

const LazyPreview = dynamic(() => import("@features/text/ui/preview"));
const LazyEdit = dynamic(() => import("@features/text/ui/edit-form"));

export default function Text() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { mode, text, editableText } = useAppSelector(
    (state) => state.textReducer,
  );

  const { data: user } = useGetUserQuery(undefined);

  const { data, error, isLoading } = useFetchFileQuery(id);
  const [updateFile] = useUpdateFileMutation();

  useEffect(() => {
    if (data) {
      dispatch(
        setFile({
          ...data.meta,
          content: data.content.content,
        }),
      );
    }
  }, [data, dispatch]);

  const onSave = async () => {
    await updateFile({
      id: text.id,
      meta: {
        name: editableText.name,
        exposure: editableText.exposure,
        textCategory: editableText.textCategory,
      },
      content: { content: editableText.content },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading file</div>;

  return (
    <div
      className={twMerge(
        "mt-10 grid",
        user?.id === text.userId ? "grid-rows-[5vh_1fr]" : "grid-rows-1",
      )}
    >
      {user?.id === text.userId && <ModeBtn onSaveAction={onSave} />}
      {mode === FileMode.VIEW ? (
        <LazyPreview data={data} />
      ) : (
        <LazyEdit fileId={id} />
      )}
    </div>
  );
}
