import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encryptPayload = (payload: any) => {
  try {
    const encryptPayload = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY!,
    ).toString();

    return encryptPayload;
  } catch (error) {
    throw new Error("Facing issue while encrypting response");
  }
};

export const decryptPayload = (payload: any) => {
  try {
    const decreptedData = CryptoJS.AES.decrypt(
      payload,
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY!,
    ).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decreptedData);
  } catch (error) {
    throw new Error("Facing issue while decrypting response");
  }
};

type ApiCallback<TRequest, TResponse> = (
  data?: TRequest,
) => Promise<{ data: { response: string } }>;

export const handleAPICall = async <TRequest = any, TResponse = any>(
  formData: TRequest | undefined,
  callback: ApiCallback<any, TResponse>,
): Promise<TResponse> => {
  try {
    const encryptedData = formData
      ? { request: encryptPayload(formData) }
      : undefined;

    console.log("FORM DATA : ", formData);

    const res = encryptedData
      ? await callback(encryptedData)
      : await callback();

    const decryptedData: TResponse = decryptPayload(res.data?.response);

    console.log("Decrypted API Response:", decryptedData);

    if (!decryptedData) {
      throw new Error("Invalid response from server");
    }

    return decryptedData;
  } catch (error: any) {
    const errorData = decryptPayload(error?.response?.data?.response);

    console.log("ERROR : ", error?.response?.status);

    const message: string = errorData?.message || "Something went wrong";

    console.log("MESSAGE : ", message);

    throw new Error(message);
  }
};

export const consoleLog = (title: string, value: string) => {
  if (process?.env?.NODE_ENV !== "development")
    console.log(
      `${title.toUpperCase()}`,
      `${typeof value === "string" ? value : JSON.stringify(value, null, 2)}`,
    );
};

export const _ = false;

export const timer = (expiryTime: Date) => {
  const expiry = new Date(expiryTime).getTime();

  const currentTime = Date.now();

  const diff = expiry - currentTime;

  if (diff <= 0) {
    return [0, 0];
  }

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds];
};

export function leftFillNum(num: number, targetLength: number) {
  return String(num ?? 0).padStart(targetLength, "0");
}

export function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export function getLocalStoageIeem(key: string) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }

  return null;
}
