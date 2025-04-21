"use client";

import React from "react";
import { useAppDispatch } from "@hooks/redux";
import { login } from "@store/actions/authActions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidatedInput from "@components/shared/ValidatedInput";
import Submit from "@components/shared/Submit";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(login(data));
    router.back();
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-950 p-10 rounded-md w-[30wv] h-[30vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"grid grid-rows-3 h-full"}
      >
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
            <ValidatedInput {...field} errors={errors} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
          }}
          render={({ field, formState: { errors } }) => (
            <ValidatedInput {...field} type={"password"} errors={errors} />
          )}
        />
        <Submit />
      </form>
    </div>
  );
}
