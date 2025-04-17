"use client";

import Button from "@components/shared/Button";
import Input from "@components/shared/Input";
import Select from "@components/shared/Select";
import TextArea from "@components/shared/TextArea";
import { useState } from "react";

type Exposure = "PUBLIC" | "PRIVATE";
type ExpiryOption = number | "never";

// TODO: move this wherever later
const EXPOSURE_OPTIONS: { name: string, value: string }[] = [
  { name: "Private", value: "PRIVATE" },
  { name: "Public", value: "PUBLIC" },
];

const EXPIRY_OPTIONS: { name: string, value: ExpiryOption }[] = [
  { name: "1 min", value: 1000 * 60 },
  { name: "30 mins", value: 1000 * 60 * 30 },
  { name: "1 hour", value: 1000 * 60 * 60 },
  { name: "Never", value: "never" },
];

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [exposure, setExposure] = useState<Exposure>("PRIVATE");
  const [expiresIn, setExpiresIn] = useState<ExpiryOption>(EXPIRY_OPTIONS[0].value);

  const handleCreate = () => {
    console.log({ title, content, exposure, expiresIn });
  };

  return (
    <div className="mt-20 grid grid-cols-[2fr_7fr]">
      <div>
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
