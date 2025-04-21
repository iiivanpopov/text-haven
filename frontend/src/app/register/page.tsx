"use client";

import React from "react";
import { useAppDispatch } from "@hooks/redux";
import { registration } from "@store/actions/authActions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidatedInput from "@components/shared/ValidatedInput";
import Submit from "@components/shared/Submit";
import { useRouter } from "next/navigation";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { email: "", username: "", password: "" },
  });

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    dispatch(registration(data));
    router.back();
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-950 p-10 rounded-md w-[30wv] h-[35vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"grid grid-rows-4 h-full"}
      >
        <Controller
          name="username"
          control={control}
          rules={{
            required: { value: true, message: "Username is required" },
          }}
          render={({ field, formState: { errors } }) => (
            <ValidatedInput<RegisterForm> {...field} errors={errors} />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field, formState: { errors } }) => (
            <ValidatedInput<RegisterForm> {...field} errors={errors} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
          }}
          render={({ field, formState: { errors } }) => (
            <ValidatedInput<RegisterForm>
              {...field}
              type={"password"}
              errors={errors}
            />
          )}
        />
        <Submit />
      </form>
    </div>
  );
}
