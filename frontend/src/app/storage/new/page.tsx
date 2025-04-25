"use client";

import { EXPIRY_OPTIONS, EXPOSURE_OPTIONS } from "./constants/constants";
import type { Expiration, Exposure } from "./types/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import ValidatedInput from "@components/shared/ValidatedInput";
import ValidatedSelect from "@components/shared/ValidatedSelect";
import Submit from "@components/shared/Submit";
import { useEffect, useMemo } from "react";
import ValidatedTextarea from "@components/shared/ValidatedTextarea";
import { createFile, fetchFolders } from "@store/actions/storageActions";
import type { TextType } from "@models/Settings";
import { TEXT_TYPE_OPTIONS } from "@/app/settings/constants";

interface NewFileFields {
  folderId: string;
  exposure: Exposure;
  content: string;
  title: string;
  type: TextType;
  expiresIn: Expiration;
}

export default function NewFile() {
  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  const { allFolders } = useAppSelector((state) => state.storageReducer);
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue } = useForm<NewFileFields>({
    defaultValues: {
      folderId: "",
      exposure: EXPOSURE_OPTIONS[0].value,
      content: "",
      title: "",
      type: TEXT_TYPE_OPTIONS[0].value,
      expiresIn: EXPIRY_OPTIONS[0].value,
    },
  });

  const onSubmit: SubmitHandler<NewFileFields> = (data) => {
    // TODO: use single object type
    const now = new Date();
    dispatch(
      createFile({
        name: data.title,
        expiresAt: new Date(
          now.getTime() + Number(data.expiresIn),
        ).toISOString(),
        folderId: data.folderId,
        exposure: data.exposure,
        type: data.type,
        content: data.content,
      }),
    );
  };

  const FOLDERS: { name: string; value: string }[] = useMemo(() => {
    return allFolders.map((folder) => {
      return { name: folder.name, value: folder.id };
    });
  }, [allFolders]);

  useEffect(() => {
    if (FOLDERS[0]) {
      setValue("folderId", FOLDERS[0].value);
    }
  }, [FOLDERS]);

  return (
    <div className="mt-20 grid grid-cols-[2fr_7fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Controller
          control={control}
          name={"title"}
          rules={{ required: { message: "Title is required", value: true } }}
          render={({ field, formState: { errors } }) => (
            <ValidatedInput
              {...field}
              errors={errors}
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
                options={TEXT_TYPE_OPTIONS}
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
          <ValidatedTextarea
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
