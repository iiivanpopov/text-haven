"use client";

import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "@features/auth/model/api";
import { setAccessToken } from "@shared/lib/local-storage";
import ValidatedInput from "@shared/ui/user-input/input";
import Submit from "@shared/ui/user-input/submit";

type LoginFormFields = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const response = await login(data).unwrap();
    setAccessToken(response);
    router.push("/");
  };

  return (
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
