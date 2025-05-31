"use client";

import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "@features/profile/model/api";
import { User } from "@entities/user/types";
import { EXPOSURES } from "@shared/constants/input-fields";
import { useAppSelector } from "@shared/hooks/redux";
import type { Exposure } from "@shared/types";
import ValidatedSelect from "@shared/ui/user-input/select";
import Submit from "@shared/ui/user-input/submit";
import ValidatedInput from "@shared/ui/user-input/validated-input.tsx";

interface ProfileEditFields {
  username: string;
  email: string;
  exposure: Exposure;
  password: string;
}

type UpdateUserFields = Partial<Omit<User, "id"> & { password: string }>;

export default function EditForm() {
  const [updateUser] = useUpdateUserMutation();
  const { control, handleSubmit, setValue } = useForm<ProfileEditFields>();
  const {
    user: data,
    isError,
    isLoading,
  } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (!data) return;

    setValue("username", data.username);
    setValue("email", data.email);
    setValue("exposure", data.exposure);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading profile</div>;

  const onSubmit: SubmitHandler<ProfileEditFields> = async (data) => {
    const updatedUser: UpdateUserFields = {
      username: data.username,
      email: data.email,
      exposure: data.exposure,
      password: data.password,
    };

    const filteredUser = Object.entries(updatedUser)
      .filter(([_, value]) => value != "" || value != undefined)
      .map(([key, value]) => ({ [key]: value })) as UpdateUserFields;

    await updateUser(filteredUser);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-20 h-[25vh] flex flex-col gap-y-10"
    >
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Username is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            error={error ? error.message : undefined}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            error={error ? error.message : undefined}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "Password is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            error={error ? error.message : undefined}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <ValidatedSelect
            options={EXPOSURES}
            {...field}
            error={error ? error.message : undefined}
          />
        )}
        name="exposure"
      />
      <Submit />
    </form>
  );
}
