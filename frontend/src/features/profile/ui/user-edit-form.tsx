"use client";

import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@features/profile/model/api";
import { EXPOSURES } from "@shared/constants/input-fields";
import type { Exposure } from "@shared/types";
import ValidatedInput from "@shared/ui/user-input/input/validated-input";
import ValidatedSelect from "@shared/ui/user-input/select/validated-select";
import Submit from "@shared/ui/user-input/submit";
import { User } from "@features/profile/types";
import { UserSkeleton } from "@features/profile/ui/user-skeleton";
import { responseIsError } from "@shared/lib/type-guards";
import toaster from "react-hot-toast";

interface ProfileEditFields {
  username: string;
  email: string;
  exposure: Exposure;
  password: string;
}

type UpdateUserFields = Partial<Omit<User, "id"> & { password: string }>;

export default function UserEditForm() {
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading, isError } = useGetUserQuery(undefined);
  const { control, handleSubmit, setValue } = useForm<ProfileEditFields>();
  const userData = data?.data;

  useEffect(() => {
    if (!userData) return;

    setValue("username", userData.username);
    setValue("email", userData.email);
    setValue("exposure", userData.exposure);
  }, [userData, setValue]);

  if (isLoading) return <UserSkeleton />;
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

    try {
      await updateUser(filteredUser);
    } catch (e) {
      if (responseIsError(e)) {
        toaster.error(e.data.message);
      }
    }
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
