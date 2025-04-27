"use client";

import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateFileMutation,
  useGetFoldersQuery,
} from "@features/storage/model/api";
import {
  EXPIRY_OPTIONS,
  EXPOSURES,
  TEXT_CATEGORIES,
} from "@shared/constants/input-fields";
import type { Exposure, SelectOptions, TextCategory } from "@shared/types";
import Input from "@shared/ui/user-input/input";
import ValidatedSelect from "@shared/ui/user-input/select";
import Submit from "@shared/ui/user-input/submit";
import Textarea from "@shared/ui/user-input/textarea";

interface NewFileFields {
  folderId: string;
  exposure: Exposure;
  content: string;
  name: string;
  type: TextCategory;
  expiresAt: string;
}

export default function NewFileForm() {
  const { control, handleSubmit, setValue } = useForm<NewFileFields>({
    defaultValues: {
      folderId: "",
      exposure: EXPOSURES[0].value,
      content: "",
      name: "",
      type: TEXT_CATEGORIES[0].value,
      expiresAt: EXPIRY_OPTIONS[0].value,
    },
  });
  const [createFile] = useCreateFileMutation();
  const { data, isError, isLoading } = useGetFoldersQuery();

  const FOLDERS: SelectOptions = useMemo(() => {
    if (!data) return [];
    return data.map((folder) => ({ name: folder.name, value: folder.id }));
  }, [data]);

  useEffect(() => {
    if (data) setValue("folderId", data[0].id);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading storage</div>;
  }

  const onSubmit: SubmitHandler<NewFileFields> = async (data) => {
    await createFile({
      ...data,
      expiresAt: new Date(Date.now() + Number(data.expiresAt)).toISOString(),
    });
  };

  return (
    <div className="mt-20 grid grid-cols-[2fr_7fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Controller
          control={control}
          name={"name"}
          rules={{ required: { message: "Name is required", value: true } }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              error={error ? error.message : undefined}
              placeholder="Enter a name"
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
                options={EXPOSURES}
                className="p-0"
              />
            )}
          />

          <Controller
            control={control}
            name={"expiresAt"}
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
                options={TEXT_CATEGORIES}
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
              options={FOLDERS}
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
