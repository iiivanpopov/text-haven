"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ModalWrapper from "../ModalWrapper";
import { useAppDispatch } from "@hooks/redux";
import { registration } from "@store/actions/authActions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ValidatedInput from "@components/shared/ValidatedInput";
import Submit from "@components/shared/Submit";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { email: "", username: "", password: "" },
  });

  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    dispatch(registration({ ...data }));
    router.push(pathname);
  };

  return (
    <ModalWrapper
      onClose={() => {
        router.push(pathname);
      }}
    >
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
              <ValidatedInput
                {...field}
                error={
                  errors.username?.message ? errors.username.message : null
                }
              />
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
              <ValidatedInput
                {...field}
                error={errors.email?.message ? errors.email.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required" },
            }}
            render={({ field, formState: { errors } }) => (
              <ValidatedInput
                {...field}
                type={"password"}
                error={
                  errors.password?.message ? errors.password.message : null
                }
              />
            )}
          />
          <Submit />
        </form>
      </div>
    </ModalWrapper>
  );
}
