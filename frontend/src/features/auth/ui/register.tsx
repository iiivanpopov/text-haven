"use client";

import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "@features/auth/model/api";
import { setAccessToken } from "@shared/lib/local-storage";
import ValidatedInput from "@shared/ui/user-input/input";
import Submit from "@shared/ui/user-input/submit";

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
      className={"grid grid-rows-4 h-full w-50"}
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
            error={error ? error.message : undefined}
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
            error={error ? error.message : undefined}
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
            type={"password"}
            error={error ? error.message : undefined}
          />
        )}
      />
      <Submit />
    </form>
  );
}
