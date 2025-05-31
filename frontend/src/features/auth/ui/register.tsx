"use client";

import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "@features/auth/model/api";
import { setAccessToken } from "@shared/lib/local-storage";
import Submit from "@shared/ui/user-input/submit";
import ValidatedInput from "@shared/ui/user-input/validated-input";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export default function RegisterForm() {
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const [register] = useRegisterMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const response = await register(data).unwrap();
    setAccessToken(response);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"grid grid-rows-4 w-50"}
    >
      <Controller
        name="username"
        control={control}
        rules={{
          required: { value: true, message: "Username is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            placeholder={"user123"}
            label={"Username"}
            error={error?.message}
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
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            label={"Email"}
            placeholder={"example@email.com"}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "Password is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            label={"Password"}
            placeholder={"********"}
            type={"password"}
            error={error?.message}
          />
        )}
      />
      <Submit />
    </form>
  );
}
