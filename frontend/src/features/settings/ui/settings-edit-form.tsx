"use client";

import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  useLazyGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@entities/settings/model/api";
import { TEXT_CATEGORIES, THEMES } from "@shared/constants/input-fields";
import { setLocalSettings } from "@shared/lib/local-storage";
import { TextCategory, Theme } from "@shared/types";
import Button from "@shared/ui/user-input/button";
import ValidatedSelect from "@shared/ui/user-input/select/validated-select";
import Submit from "@shared/ui/user-input/submit";
import { setSettings } from "@entities/settings/model/slice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { responseIsError } from "@shared/lib/type-guards";
import toaster from "react-hot-toast";

interface SettingsForm {
  textCategory: TextCategory;
  theme: Theme;
}

export function SettingsEditForm() {
  const dispatch = useAppDispatch();
  const { settings, isLoaded } = useAppSelector(
    (state) => state.settingsReducer,
  );

  const { control, handleSubmit, reset } = useForm<SettingsForm>({
    defaultValues: settings,
  });

  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const [trigger, { data, isError }] = useLazyGetSettingsQuery();
  const settingsData = data?.data;
  const [updateSettings] = useUpdateSettingsMutation();

  useEffect(() => {
    if (!settingsData) return;
    dispatch(setSettings(settingsData));
  }, [settingsData, dispatch]);

  useEffect(() => {
    if (isLoaded) setLocalSettings(settings);
  }, [settings, isLoaded]);

  const onSubmit: SubmitHandler<SettingsForm> = async (formData) => {
    try {
      dispatch(setSettings(formData));
      await updateSettings(formData);
    } catch (e) {
      if (responseIsError(e)) {
        toaster.error(e.data.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-rows-2 gap-y-10 h-[40vh]"
    >
      <div className="flex space-x-10 items-center">
        <h1 className="text-gray-800 dark:text-gray-100 text-5xl">Settings</h1>
        <Submit />
        <Button
          type="button"
          name="Fetch"
          onClick={() => trigger()}
        />
      </div>

      {isError && (
        <div className="text-red-500">
          Error loading settings.
          <Button
            name="Retry"
            onClick={() => trigger()}
          />
        </div>
      )}

      <Controller
        name="theme"
        control={control}
        rules={{ required: "Theme is required" }}
        render={({ field, fieldState }) => (
          <ValidatedSelect
            {...field}
            options={THEMES}
            label={"Theme"}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="textCategory"
        control={control}
        rules={{ required: "Text category is required" }}
        render={({ field, fieldState }) => (
          <ValidatedSelect
            {...field}
            options={TEXT_CATEGORIES}
            label={"Text category"}
            error={fieldState.error?.message}
          />
        )}
      />
    </form>
  );
}
