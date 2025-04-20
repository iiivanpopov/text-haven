"use client";

import Button from "@components/shared/Button";
import Input from "@components/shared/Input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import axios from "axios";
import type { AuthResponse, ValidationError } from "@api";
import Errors from "@components/Errors";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ValidationError | string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async () => {
    try {
      const response = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          username,
          email,
          password,
        },
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      router.push(pathname);
    } catch (e) {
      if ("errors" in e.response.data) {
        setError(e.response.data);
      } else {
        setError("Unknown error.");
      }
    }
  };

  return (
    <ModalWrapper
      onClose={() => {
        router.push(pathname);
      }}
    >
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-950 p-10 rounded-md w-[400px] h-[600px]">
        <div className="grid grid-rows-5 gap-y-5 h-full">
          <div className="flex flex-col">
            <span className="dark:text-gray-200 text-gray-700 text-md">
              Username
            </span>
            <Input
              name={"username"}
              value={username}
              className="w-64"
              ariaLabel="Username input field"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <span className="dark:text-gray-200 text-gray-700 text-md">
              Email
            </span>
            <Input
              name={"email"}
              value={email}
              className="w-64"
              ariaLabel="Email input field"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <span className="dark:text-gray-200 text-gray-700 text-md">
              Password
            </span>
            <Input
              name={"password"}
              value={password}
              className="w-64"
              ariaLabel="Password input field"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            name={"Register"}
            className="self-end bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600"
            ariaLabel="Register button"
            onClick={handleSubmit}
          />
          {error && <Errors error={error} />}
        </div>
      </div>
    </ModalWrapper>
  );
}
