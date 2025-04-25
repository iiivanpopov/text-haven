"use client";

import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import ValidatedSelect from "@shared/ui/user-input/select";
import Submit from "@shared/ui/user-input/submit";
import Button from "@shared/ui/user-input/button";
import { TEXT_CATEGORIES, THEMES } from "@features/settings/constants";
import {
  useLazyGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@features/settings/model/api";
import type { TextCategory, Theme } from "@shared/types";
import { useEffect } from "react";
import { parseSettings, setSettings } from "@shared/lib/local-storage";
import { Settings } from "@entities/settings/types";

interface SettingsForm {
  textCategory: TextCategory;
  theme: Theme;
}

export default function EditForm() {
  const { control, handleSubmit, setValue } = useForm<SettingsForm>({
    defaultValues: {
      theme: "light",
      textCategory: "NOTE",
    },
  });

  const watchedValues = useWatch({ control });

  const [trigger, { isFetching, data, isError }] = useLazyGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  useEffect(() => {
    // on fetch
    if (!data) return;

    setSettings(data);
    setValue("theme", data.theme);
    setValue("textCategory", data.textCategory);
  }, [data]);

  useEffect(() => {
    // on load
    const parsed = parseSettings();
    if (!parsed) return;

    setSettings(parsed);
    setValue("theme", parsed.theme);
    setValue("textCategory", parsed.textCategory);
  }, []);

  useEffect(() => {
    // every change
    setSettings(watchedValues as Settings);
  }, [watchedValues]);

  const onSubmit: SubmitHandler<SettingsForm> = async (data) => {
    await updateSettings(data);
  };

  if (isFetching) return <div>Loading...</div>;

  if (isError)
    return (
      <div className="text-red-500">
        Error loading settings.
        <Button name="Retry" onClick={() => trigger()} />
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-rows-2 gap-y-10 h-[40vh]"
    >
      <div className="flex space-x-10 items-center">
        <h1 className="text-gray-800 dark:text-gray-100 text-5xl">Settings</h1>
        <Submit />
        <Button type="button" name="Fetch" onClick={() => trigger()} />
      </div>

      <div className="flex items-center gap-x-5">
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-2xl">
          Theme
        </span>
        <Controller
          name="theme"
          control={control}
          rules={{ required: "Theme is required" }}
          render={({ field, fieldState }) => (
            <ValidatedSelect
              {...field}
              options={THEMES}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div className="flex items-center gap-x-5">
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-2xl">
          Text default category
        </span>
        <Controller
          name="textCategory"
          control={control}
          rules={{ required: "Text category is required" }}
          render={({ field, fieldState }) => (
            <ValidatedSelect
              {...field}
              options={TEXT_CATEGORIES}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
    </form>
  );
}
