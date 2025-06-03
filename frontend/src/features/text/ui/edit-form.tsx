"use client";

import {
  setEditableContent,
  setEditableName,
  setFile,
} from "@features/text/model/slice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import ValidatedInput from "@shared/ui/user-input/input/validated-input";
import Textarea from "@shared/ui/user-input/textarea";
import { useEffect } from "react";
import { useFetchFileQuery } from "@features/text/model/api";

export default function EditForm({ fileId }: { fileId: string }) {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useFetchFileQuery(fileId);

  const { editableText } = useAppSelector((state) => state.textReducer);

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

  if (isLoading) return <div>Loading...</div>;
  if (!data || isError || !editableText) return <div>Error loading file</div>;

  return (
    <div className="flex flex-col">
      <ValidatedInput
        name="Title"
        className="text-gray-800 dark:text-gray-100 text-4xl p-0"
        value={editableText.name}
        onChange={(e) => dispatch(setEditableName(e.target.value))}
      />
      <Textarea
        value={editableText.content}
        className="text-md overflow-auto h-[70vh] w-[1270px]"
        onChange={(e) => dispatch(setEditableContent(e.target.value))}
      />
    </div>
  );
}
