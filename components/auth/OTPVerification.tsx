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

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["otp-info"],
    queryFn: () => handleAPICall("", getOtpStatus),
    retry: false,
    gcTime: 0,
  });

  console.log("DATA : ", data);

  useEffect(() => {
    if (isError) {
      if (error?.message) {
        toast.error(error?.message);
      }
    }

    if (isSuccess) {
      if (data?.message) {
        toast.success(data?.message);
      }
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (data?.data?.screen) {
      setScreen(data?.data?.screen);
      route.replace(
        `${pathname}?verify-email=true&verify=${data?.data?.screen.trim()}`,
      );
    }
  }, [data]);

  useEffect(() => {
    if (searchParams.get("verify") === "email") {
      setScreen("email");
    }

    if (searchParams.get("verify") === "otp") {
      setScreen("otp");
    }

    if (searchParams.get("verify") === "verified") {
      setScreen("verified");
    }
  }, [searchParams.get("verify")]);

  return (
    <div className="w-full max-w-[90%] sm:max-w-md">
      {screen === "email" ? (
        <EmailVerify />
      ) : screen === "otp" ? (
        <OtpVerify data={data?.data} />
      ) : (
        "Failed"
      )}
    </div>
  );
}

export default OTPVerification;

const EmailVerify = () => {
  const { user } = useAuthQuery();

  const route = useRouter();
  const pathname = usePathname();

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => handleAPICall(null, sendEmailVerifictionOtp),
    onSuccess: async (response) => {
      route.replace(
        `${pathname}?verify-email=true&verify=${response?.data?.screen.trim()}`,
      );
      // toast.success(response?.message);
    },
    onError: (error) => {
      // toast.error(error.message);
    },
  });

  return (
    <div>
      <Input
        placeholder="e.g harrypotter@hogwarts.com"
        value={user?.data?.email}
        type="email"
        readOnly
        className="border border-black/50"
        disabled
      />
      <div className="flex justify-end mt-4">
        <Button className="cursor-pointer" onClick={() => mutate()}>
          {isPending ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    </div>
  );
};

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
  const route = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState({
    minutes: null,
    seconds: null,
  });

  const [otpAttempts, setOtpAttempts] = useState(0);
  const [expirationTime, setExpirationTime] = useState(null);
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
  } = useQuery({
    queryKey: ["otp-info"],
    queryFn: () => handleAPICall("", getOtpStatus),
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
      queryClient.invalidateQueries({ queryKey: ["otp-info"] });
      setTimeLeft({
        minutes: null,
        seconds: null,
      });
      //   toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong, please try again later",
      );
    },
  });

  useEffect(() => {
    setOtpAttempts(otpData?.data?.otp_attempts);
    setExpirationTime(otpData?.data?.expires_at);
    setIsOtpActive(otpData?.data?.is_otp_active);
  }, [otpData]);

  useEffect(() => {
    if (!expirationTime) return;
    if (timeLeft?.minutes === 0 && timeLeft?.seconds === 0) {
      return;
    }
    const interval = setInterval(() => {
      const timeLeft = timer(expirationTime);

      setTimeLeft({
        minutes: timeLeft[0],
        seconds: timeLeft[1],
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime, timeLeft?.minutes, timeLeft?.seconds]);

  const { mutate, isPending, data } = useMutationHook(
    otpVerification,
    ["otp-info"],
    (response) => {
      console.log("RESPONSE : ", response);
      if (response?.data !== undefined) {
        setIsOtpActive(response?.data?.is_otp_active);
      }
      if (response?.data?.screen) {
        route.replace(
          `${pathname}?verify-email=true&verify=${response?.data?.screen}`,
        );
      }
    },
    (error) => {
      console.log("ERROR PAYLOAD : ", error?.data);
      if (error?.data?.is_otp_active !== undefined) {
        setIsOtpActive(error.data.is_otp_active);
      }
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
            We’ve sent an OTP to{" "}
            {getLocalStoageIeem("user-email") ??
              "having some issue fetching email"}
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
                      <span>Remainig Attempts : {otpAttempts ?? 0}</span>
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

            {otpPending ? (
              <div>Loading..</div>
            ) : (
              <>
                {isOtpActive == false ||
                (timeLeft?.minutes == 0 && timeLeft?.seconds == 0) ? (
                  <div className="text-sm flex justify-end itmes-center">
                    Didn't Recieve ?{" "}
                    <span
                      className="underline cursor-pointer mx-1"
                      onClick={() => resendMutate()}
                    >
                      Resend OTP
                    </span>
                  </div>
                ) : (
                  <div className="text-sm flex justify-end itmes-center ">
                    <span className="mx-2">Resed OTP in</span>
                    <span className="flex items-center justify-between ">
                      <span>{leftFillNum(timeLeft?.minutes, 2)} </span>
                      <span className="mx-1">:</span>
                      <span className="tracking-wide ">
                        {leftFillNum(timeLeft?.seconds, 2)}
                      </span>
                    </span>
                  </div>
                )}
              </>
            )}
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
