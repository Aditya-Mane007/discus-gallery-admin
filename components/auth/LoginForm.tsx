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
// import { _, cn, handleAPICall } from "@/lib/utils";
import { cn } from "@/lib/utils";

import Link from "next/link";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
// import LoadingScreen from "../../Utils/LoadingScreen";
// import {
//   getUserController,
//   loginController,
// } from "@/lib/Services/AuthServices";
// import useMutationHook from "@/lib/queries/useMutationHook";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email address cannot be empty" })
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

  console.log("SHOW PASSWORD : ", showPassword);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const { mutate, isPending } = useMutationHook(
  //     form.getValues(),
  //     loginController,
  //     ["user-info"],
  //     () => router.push("/"),
  //   );

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("VALUES : ", data);
    //   mutate(values);
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    // <Field data-invalid={fieldState.invalid}>
                    //   <FieldLabel htmlFor="form-rhf-demo-password">
                    //     Password
                    //   </FieldLabel>
                    //   <Input
                    //     {...field}
                    //     id="form-rhf-demo-password"
                    //     aria-invalid={fieldState.invalid}
                    //     placeholder="e.g Caput Draconis"
                    //     autoComplete="off"
                    //   />
                    //   {fieldState.invalid && (
                    //     <FieldError errors={[fieldState.error]} />
                    //   )}
                    // </Field>
                    <Field className="max-w-sm">
                      <FieldLabel htmlFor="inline-start-password">
                        Password
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          name="password"
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
                    </Field>
                  )}
                />
              </FieldGroup>
              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g harrypotter@hogwarts.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputGroup
                        aria-invalid={!!fieldState.error}
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          fieldState.error &&
                            "has-[[data-slot=input-group-control]:focus-visible]:border-red has-[[data-slot=input-group-control]:focus-visible]:ring-red/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        )}
                      >
                        <InputGroupInput
                          {...field}
                          placeholder="e.g. Caput Draconis"
                          className="p-0"
                          type={showPassword ? "text" : "password"}
                        />
                        <InputGroupAddon align="inline-end" className="p-0">
                          <InputGroupButton
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                            {field.error}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
