"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
// import useAuthQuery from "@/lib/queries/auth/useAuthQuery";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OTP_TYPE } from "@/lib/constant";
import {
  _,
  getLocalStoageIeem,
  handleAPICall,
  leftFillNum,
  timer,
} from "@/lib/utils";
import {
  getOtpStatus,
  getUserController,
  otpVerification,
  sendEmailVerifictionOtp,
} from "@/lib/services/authService";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useAuthQuery from "@/hooks/useAuthQuery";
import useMutationHook from "@/hooks/useMutationHook";
import useQueryHook from "@/hooks/useQueryHook";
import { time } from "console";
import { toast } from "sonner";
// import toast from "react-hot-toast";
// import { DialogDescription, DialogTitle } from "../ui/dialog";

function OTPVerification() {
  console.log("USER EMAIL : ", getLocalStoageIeem("user-email"));
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();
  const [screen, setScreen] = useState("email");

  const router = useRouter();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["otp-info"],
    queryFn: () => handleAPICall(undefined, getOtpStatus),
    retry: false,
    gcTime: 0,
  });

  useEffect(() => {
    // ✅ ERROR CASE
    if (isError && error) {
      const err: any = error;

      // 🔥 Handle redirect from error response
      if (err?.data?.redirectTo) {
        router.push(err.data.redirectTo);
        return;
      }

      if (err?.message) {
        toast.error(err.message);
        console.log("STATUS QUERY:", err);
      }
    }

    // ✅ SUCCESS CASE
    if (isSuccess && data) {
      // 🔥 Handle redirect from success response
      if (data?.redirectTo) {
        router.push(data.redirectTo);
        return;
      }

      if (data?.message) {
        toast.success(data.message);
      }
    }
  }, [isError, isSuccess, data, error]);

  useEffect(() => {
    if (data?.data?.screen) {
      setScreen(data?.data?.screen);
      console.log("DATA : ", data?.data);
      route.replace(
        `${pathname}?verify-email=true&verify=${data?.data?.screen.trim()}`,
      );
    }
  }, [data]);

  // useEffect(() => {
  //   if (searchParams.get("verify") === "email") {
  //     setScreen("email");
  //   }

  //   if (searchParams.get("verify") === "otp") {
  //     setScreen("otp");
  //   }

  //   if (searchParams.get("verify") === "verified") {
  //     setScreen("verified");
  //   }
  // }, [searchParams.get("verify")]);

  return (
    // <div className="w-full max-w-[90%] sm:max-w-md">
    //   {screen === "email" ? (
    //     <EmailVerify />
    //   ) : screen === "otp" ? (
    // <OtpVerify />
    //   ) : (
    //     "Failed"
    //   )}
    // </div>
    <div className="w-full max-w-[90%] sm:max-w-md">
      <OtpVerify />
    </div>
  );
}

export default OTPVerification;

// const EmailVerify = () => {
//   const { user } = useAuthQuery();

//   const route = useRouter();
//   const pathname = usePathname();

//   const { mutate, isPending, data } = useMutation({
//     mutationFn: () => handleAPICall(null, sendEmailVerifictionOtp),
//     onSuccess: async (response) => {
//       route.replace(
//         `${pathname}?verify-email=true&verify=${response?.data?.screen.trim()}`,
//       );
//       // toast.success(response?.message);
//     },
//     onError: (error) => {
//       // toast.error(error.message);
//     },
//   });

//   return (
//     <div>
//       <Input
//         placeholder="e.g harrypotter@hogwarts.com"
//         value={user?.data?.email}
//         type="email"
//         readOnly
//         className="border border-black/50"
//         disabled
//       />
//       <div className="flex justify-end mt-4">
//         <Button className="cursor-pointer" onClick={() => mutate()}>
//           {isPending ? "Sending..." : "Send OTP"}
//         </Button>
//       </div>
//     </div>
//   );
// };

const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "OTP must be of 6 numbers",
    })
    .max(6, {
      message: "OTP must be of 6 numbers",
    }),
});

const OtpVerify = () => {
  // User Info
  const { user } = useAuthQuery();

  console.log("USER INFO CACHED : ", user);

  const route = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState<{
    minutes: number | null;
    seconds: number | null;
  }>({
    minutes: null,
    seconds: null,
  });

  const [otpAttempts, setOtpAttempts] = useState(0);
  const [expirationTime, setExpirationTime] = useState<string | null>(null);
  const [isOtpActive, setIsOtpActive] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const {
    data: otpData,
    isPending: otpPending,
    isError,
    error,
  } = useQueryHook({
    queryKey: ["otp-info"],
    queryFunction: getOtpStatus,
    params: "",
    retry: false,
    gcTime: 0,
  });

  console.log("OTP STATUS DATA : ", otpData);

  const {
    mutate: resendMutate,
    isPending: resendPending,
    data: resendData,
  } = useMutation({
    mutationFn: () => handleAPICall(null, sendEmailVerifictionOtp),
    onSuccess: async (response) => {
      console.log("RESPONSE : ", response);
      queryClient.invalidateQueries({ queryKey: ["otp-info"] });
      setTimeLeft({
        minutes: null,
        seconds: null,
      });
      setExpirationTime(response?.data?.expires_at);
      //   toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong, please try again later",
      );
    },
  });

  // console.log("otpData : ", otpData, otpData?.data?.is_otp_active);

  useEffect(() => {
    console.log("OTPDATA : ", otpData?.data?.can_resend_in);
    setOtpAttempts(otpData?.data?.otp_attempts);
    // setExpirationTime(
    //   otpData?.data?.is_otp_active ? otpData?.data?.expires_at : null,
    // );
    setExpirationTime(
      otpData?.data?.can_resend_in == true
        ? null
        : otpData?.data?.can_resend_in,
    );

    if (otpData?.data?.can_resend_in == true) {
      setTimeLeft({
        minutes: 0,
        seconds: 0,
      });
    }
  }, [otpData]);

  useEffect(() => {
    if (!expirationTime) return;

    // Calculate time remaining immediately to prevent 1-second delay
    const updateTimer = () => {
      const timeRemaining = timer(expirationTime);
      setTimeLeft({
        minutes: timeRemaining[0],
        seconds: timeRemaining[1],
      });
      return timeRemaining;
    };

    const initialTimeRemaining = updateTimer();
    if (initialTimeRemaining[0] === 0 && initialTimeRemaining[1] === 0) {
      return;
    }

    const interval = setInterval(() => {
      const timeRemaining = updateTimer();
      if (timeRemaining[0] === 0 && timeRemaining[1] === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  console.log("TIME : ", timeLeft);

  const { mutate, isPending, data } = useMutationHook(
    otpVerification,
    [],
    (response) => {
      console.log("RESPONSE : ", response);
      // queryClient.invalidateQueries({ queryKey: ["otp-info"] });

      const redirectTo = response?.data?.redirectTo ?? response?.redirectTo;
      if (redirectTo) {
        route.push(redirectTo);
      }
    },
    (error) => {
      console.log("ERROR PAYLOAD : ", error?.data);
      queryClient.invalidateQueries({ queryKey: ["otp-info"] });
    },
  );

  console.log("VERIFICATION DATA : ", data);

  function onSubmit(formData: z.infer<typeof formSchema>) {
    console.log("✅ SUBMIT TRIGGERED", formData);
    mutate(formData);
  }

  console.log(form.getValues());
  return (
    <div className="w-full">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="font-extrabold">Enter OTP</CardTitle>
          <CardDescription>
            We’ve sent an OTP to {user?.email ?? "Error Fetching User Info"}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className=" flex ">
                    <FieldLabel
                      htmlFor="otp"
                      className="flex justify-between items-center"
                    >
                      Verification code{" "}
                      {otpPending ? (
                        <div>Loading..</div>
                      ) : (
                        <>
                          {timeLeft?.minutes == 0 && timeLeft?.seconds == 0 ? (
                            <Button
                              type="button"
                              variant="link"
                              className="underline cursor-pointer px-0 mx-0"
                              onClick={() => resendMutate()}
                            >
                              Resend OTP
                            </Button>
                          ) : (
                            <div className="text-sm flex justify-end itmes-center ">
                              <span className="mx-2">Try again in</span>
                              <span className="flex items-center justify-between ">
                                <span className="tracking-wide ">
                                  {leftFillNum(timeLeft?.seconds, 2)} seconds
                                </span>
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </FieldLabel>

                    <InputOTP
                      maxLength={6}
                      id="otp"
                      required
                      {...field}
                      className="w-full"
                    >
                      <InputOTPGroup className="w-full gap-1 sm:gap-2 md:gap-3 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border-2 flex justify-between">
                        <InputOTPSlot
                          index={0}
                          className="flex-1 h-10 sm:h-12 md:h-14 text-base md:text-lg"
                        />
                        <InputOTPSlot
                          index={1}
                          className="flex-1 h-10 sm:h-12 md:h-14 text-base md:text-lg"
                        />
                        <InputOTPSlot
                          index={2}
                          className="flex-1 h-10 sm:h-12 md:h-14 text-base md:text-lg"
                        />
                        <InputOTPSlot
                          index={3}
                          className="flex-1 h-10 sm:h-12 md:h-14 text-base md:text-lg"
                        />
                        <InputOTPSlot
                          index={4}
                          className="flex-1 h-10 sm:h-12 md:h-14 text-base md:text-lg"
                        />
                        <InputOTPSlot
                          index={5}
                          className="flex-1 h-10 sm:h-12 md:h-14 text-base md:text-lg"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    {(fieldState?.error || fieldState.invalid) && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end items-center">
              <Button
                type="submit"
                disabled={isPending || form.watch("otp")?.length !== 6}
              >
                {isPending ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
