"use client";

import Button from "@components/shared/Button";
import Input from "@components/shared/Input";
import Select from "@components/shared/Select";
import TextArea from "@components/shared/TextArea";
import { useState } from "react";
import {
  EXPIRY_OPTIONS,
  EXPOSURE_OPTIONS,
  FOLDER_OPTIONS,
} from "./constants/constants";
import type { Expiration, Exposure } from "./types/types";

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [exposure, setExposure] = useState<Exposure>("PRIVATE");
  const [expiresIn, setExpiresIn] = useState<Expiration>(
    EXPIRY_OPTIONS[0].value,
  );
  const [folderId, setFolderId] = useState<string>(FOLDER_OPTIONS[0].value);

  const handleCreate = () => {
    console.log({ title, content, exposure, expiresIn, folderId });
  };

  return (
    <div className="mt-20 grid grid-cols-[2fr_7fr]">
      <div className="flex flex-col">
        <Input
          className="p-2"
          placeholder="Enter a title"
          value={title}
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-wrap gap-4">
          <Select
            value={exposure}
            name="Exposure"
            options={EXPOSURE_OPTIONS}
            onChange={(e) => {
              const value = e.target.value as Exposure;
              setExposure(value);
            }}
          />

          <Select
            value={String(expiresIn)}
            name="Expires In"
            options={EXPIRY_OPTIONS.map((opt) => ({
              name: opt.name,
              value: String(opt.value),
            }))}
            onChange={(e) => {
              const val = e.target.value;
              setExpiresIn(val == "never" ? "never" : Number(val));
            }}
          />
        </div>

        <Select
          value={folderId}
          name={"Folder name"}
          options={FOLDER_OPTIONS}
          onChange={(e) => setFolderId(e.target.value)}
        />

        <Button
          onClick={handleCreate}
          name="Create New"
          className="mt-4 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
        />
      </div>

      <TextArea
        className="p-2"
        placeholder="Enter your content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
