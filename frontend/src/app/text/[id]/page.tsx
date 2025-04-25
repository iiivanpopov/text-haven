"use client";

import Input from "@components/shared/Input";
import TextArea from "@components/shared/TextArea";
import { use, useEffect, useState } from "react";
import ChangeModeBtn from "../components/ChangeModeBtn";
import Content from "../components/Content";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchFile } from "@store/actions/storageActions";

const isUserOwner = true;

export default function Text({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { currentFile } = useAppSelector((state) => state.storageReducer);
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<"edit" | "read">("read");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (id.trim()) dispatch(fetchFile(id));
  }, []);

  useEffect(() => {
    if (!currentFile) return;

    setTitle(currentFile.name);
    setContent(currentFile.content);
  }, [currentFile]);

  return (
    <div className="mt-10 grid grid-rows-[5vh_1fr]">
      <div className="w-full flex items-center">
        {isUserOwner && (
          <ChangeModeBtn
            mode={mode}
            onClick={() =>
              setMode((prev) => (prev == "read" ? "edit" : "read"))
            }
          />
        )}
      </div>
      <div className="flex flex-col">
        {mode == "read" ? (
          <>
            <h4 className={"text-gray-800 dark:text-gray-100 text-4xl"}>
              {title}
            </h4>
            <Content>{content}</Content>
          </>
        ) : (
          <>
            <Input
              name="Title"
              className="text-gray-800 dark:text-gray-100 text-4xl p-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-md overflow-auto h-[70vh] w-[1270px]"
            />
          </>
        )}
      </div>
    </div>
  );
}
