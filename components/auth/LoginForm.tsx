"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { EyeClosedIcon, EyeIcon, Loader } from "lucide-react";

import { useRouter } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import Link from "next/link";
import useMutationHook from "@/hooks/useMutationHook";
import { loginController } from "@/lib/services/authService";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address cannot be empty" })
    .email({ message: "Enter valid email address" }),

  password: z
    .string()
    .nonempty({ message: "Password cannot be empty" })
    .min(5, { message: "A password must be at least 5 characters long" })
    .max(15, { message: "A password must be at most 15 characters" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must contain at least one number and one special character",
    ),
});

function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, data } = useMutationHook(
    form.getValues(),
    loginController,
    ["user-info"],
    (response: any) => {
      const email = response?.user?.email;

      if (email) {
        localStorage.setItem("user-email", email); // no need JSON.stringify
      }

      router.push("/verify");
    },
  );

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center max-md:landscape:pt-24 max-md:landscape:pb-4">
        <Card className="w-full max-w-[90%] sm:max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">
              Login to Discus Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-email">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g harrypotter@hogwarts.com"
                        autoComplete="off"
                      />
                      {(fieldState?.error || fieldState.invalid) && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="w-full flex ">
                      <FieldLabel
                        htmlFor="inline-start-password"
                        className="flex justify-between items-center"
                      >
                        Password
                        <Link
                          href="/forget-password"
                          className="text-[0.80rem] underline"
                        >
                          Forget Password ?
                        </Link>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          type={showPassword ? "text" : "password"}
                          id="form-rhf-demo-password"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g Caput Draconis"
                          autoComplete="off"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => {
                              setShowPassword((prev) => !prev);
                            }}
                          >
                            {showPassword ? (
                              <EyeIcon className="cursor-pointer" />
                            ) : (
                              <EyeClosedIcon className="cursor-pointer" />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {(fieldState?.error || fieldState.invalid) && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button type="submit" className="w-full cursor-pointer ">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* {isPending && <LoadingScreen message={"Logging you in"} />} */}
    </>
  );
}

export default LoginForm;
