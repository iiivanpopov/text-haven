"use client";

import ValidatedInput from "@shared/ui/user-input/input";
import { EXPIRY_OPTIONS, EXPOSURE_OPTIONS } from "./constants";
import type { Expiration, Exposure } from "./types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidatedSelect from "@shared/ui/user-input/select";
import Submit from "@shared/ui/user-input/submit";
import Textarea from "@shared/ui/user-input/textarea";

interface NewFileFields {
  folderId: string;
  exposure: Exposure;
  content: string;
  title: string;
  type: string;
  expiresIn: Expiration;
}

export default function NewFile() {
  const { control, handleSubmit } = useForm<NewFileFields>();

  const onSubmit: SubmitHandler<NewFileFields> = (data) => {};

  return (
    <div className="mt-20 grid grid-cols-[2fr_7fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Controller
          control={control}
          name={"title"}
          rules={{ required: { message: "Title is required", value: true } }}
          render={({ field, fieldState: { error } }) => (
            <ValidatedInput
              {...field}
              error={error ? error.message : undefined}
              placeholder="Enter a title"
              className="p-0"
            />
          )}
        />

        <div className="flex flex-wrap gap-4">
          <Controller
            control={control}
            name={"exposure"}
            rules={{
              required: { message: "Exposure is required", value: true },
            }}
            render={({ field, fieldState: { error } }) => (
              <ValidatedSelect
                {...field}
                error={error ? error.message : undefined}
                options={EXPOSURE_OPTIONS}
                className="p-0"
              />
            )}
          />

          <Controller
            control={control}
            name={"expiresIn"}
            rules={{
              required: { message: "Expiration time is required", value: true },
            }}
            render={({ field, fieldState: { error } }) => (
              <ValidatedSelect
                {...field}
                error={error ? error.message : undefined}
                options={EXPIRY_OPTIONS}
                className="p-0"
              />
            )}
          />

          <Controller
            control={control}
            name={"type"}
            rules={{
              required: { message: "Text type is required", value: true },
            }}
            render={({ field, fieldState: { error } }) => (
              <ValidatedSelect
                {...field}
                error={error ? error.message : undefined}
                options={[]}
                className="p-0"
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name={"folderId"}
          rules={{
            required: { message: "Folder is required", value: true },
          }}
          render={({ field, fieldState: { error } }) => (
            <ValidatedSelect
              {...field}
              error={error ? error.message : undefined}
              options={[]}
              className="p-0"
            />
          )}
        />

        <Submit />
      </form>

      <Controller
        control={control}
        name={"content"}
        rules={{
          required: { message: "Content is required", value: true },
        }}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            {...field}
            error={error ? error.message : undefined}
            className="p-2"
            placeholder="Enter your content"
          />
        )}
      />
    </div>
  );
}
