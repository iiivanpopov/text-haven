"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidatedSelect from "@shared/ui/user-input/select";
import Submit from "@shared/ui/user-input/submit";
import Button from "@shared/ui/user-input/button";
import {
  useLazyGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@entities/settings/model/api";
import type { TextCategory, Theme } from "@shared/types";
import { useEffect, useRef } from "react";
import { setLocalSettings } from "@shared/lib/local-storage";
import type { Settings } from "@entities/settings/types";
import { TEXT_CATEGORIES, THEMES } from "@shared/constants/input-fields";
import { useAppSelector } from "@shared/hooks/redux";
import { applyTheme } from "@shared/lib/theme";

interface SettingsForm {
  textCategory: TextCategory;
  theme: Theme;
}

export default function EditForm() {
  const { control, handleSubmit, watch, reset } = useForm<SettingsForm>({
    defaultValues: {
      theme: "light",
      textCategory: "NOTE",
    },
  });

  const watchedValues = watch();

  const [trigger, { data, isError }] = useLazyGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  const { settings } = useAppSelector((state) => state.settingsReducer);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!settings) return;
    reset({
      theme: settings.theme,
      textCategory: settings.textCategory,
    });
  }, [settings, reset]);

  useEffect(() => {
    if (!data) return;
    reset({
      theme: data.theme,
      textCategory: data.textCategory,
    });
    setLocalSettings(data);
  }, [data, reset]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    applyTheme(watchedValues.theme);
    setLocalSettings(watchedValues as Settings);
  }, [watchedValues]);

  const onSubmit: SubmitHandler<SettingsForm> = async (formData) => {
    await updateSettings(formData);
  };

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

      {isError && (
        <div className="text-red-500">
          Error loading settings.
          <Button name="Retry" onClick={() => trigger()} />
        </div>
      )}

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
