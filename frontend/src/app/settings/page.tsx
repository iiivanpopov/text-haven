"use client";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  fetchSettings,
  parseSettings,
  saveSettings,
} from "@store/actions/settingsActions";
import Submit from "@components/shared/Submit";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidatedSelect from "@components/shared/ValidatedSelect";
import { TEXT_TYPE_OPTIONS } from "@/app/settings/constants";
import type { TextDefaultType } from "@models/Settings";
import Button from "@components/shared/Button";
import { useEffect } from "react";

interface SettingsForm {
  textDefaultType: TextDefaultType;
}

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const {
    settings: { textDefaultType, theme },
    isLoading,
    error,
  } = useAppSelector((state) => state.settingsSlice);

  const { control, handleSubmit, setValue } = useForm<SettingsForm>({
    defaultValues: {
      textDefaultType,
    },
  });

  useEffect(() => {
    dispatch(parseSettings());
  }, []);

  useEffect(() => {
    if (textDefaultType) {
      setValue("textDefaultType", textDefaultType);
    }
  }, [textDefaultType]);

  const onSubmit: SubmitHandler<SettingsForm> = (data) => {
    dispatch(saveSettings({ ...data, theme }));
  };

  return (
    <main className="mt-20 h-[20vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"grid grid-rows-2 gap-y-10"}
      >
        <div className={"flex space-x-10 items-center"}>
          <h1 className="text-gray-800 dark:text-gray-100 text-5xl">
            Settings
          </h1>
          <Submit />
          <Button name={"Fetch"} onClick={() => dispatch(fetchSettings())} />
        </div>
        <div className="flex items-center gap-x-5">
          <span className="font-semibold text-gray-800 dark:text-gray-100 text-2xl">
            Text default type
          </span>
          {!isLoading && !error && (
            <Controller
              name="textDefaultType"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <ValidatedSelect
                  {...field}
                  options={TEXT_TYPE_OPTIONS}
                  errors={errors}
                />
              )}
            />
          )}
        </div>
      </form>
    </main>
  );
}
