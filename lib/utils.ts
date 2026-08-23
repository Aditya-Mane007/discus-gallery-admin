import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js';
import useAuthQuery from '@/hooks/useAuthQuery';
import useGetPermissionQuery from '@/hooks/useGetPermissionQuery';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const encryptPayload = (payload: any) => {
  try {
    const encryptPayload = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY!,
    ).toString();

    return encryptPayload;
  } catch (error) {
    throw new Error('Facing issue while encrypting response');
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
    throw new Error('Facing issue while decrypting response');
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
    // const encryptedData = formData
    //   ? { request: encryptPayload(formData) }
    //   : undefined;

    const encryptedData = formData;

    console.log('FORM DATA : ', formData);

    const res = encryptedData
      ? await callback(encryptedData)
      : await callback();

    // const decryptedData: TResponse = decryptPayload(res.data?.response);

    // console.log("Decrypted API Response:", decryptedData);

    // if (!decryptedData) {
    //   throw new Error("Invalid response from server");
    // }

    // return decryptedData;

    console.log('RES DATA : ', res);

    // return res.data.response as unknown as TResponse;

    return res.data as unknown as TResponse;
  } catch (error: any) {
    let errorData: any = null;

    // if (error?.response?.data?.response) {
    //   try {
    //     errorData = decryptPayload(error.response.data.response);
    //   } catch (decryptErr) {
    //     console.error("Failed to decrypt error response", decryptErr);
    //   }
    // }

    console.log('ERROR : ', errorData || error.message);

    const message: string =
      errorData?.message ||
      error?.response?.data?.message ||
      error.message ||
      'Something went wrong';

    console.log('MESSAGE : ', message);

    const customError: any = new Error(message);
    customError.data = errorData;

    console.log('customError , ', customError);
    throw customError;
  }
};

export const consoleLog = (title: string, value: string) => {
  if (process?.env?.NODE_ENV !== 'development')
    console.log(
      `${title.toUpperCase()}`,
      `${typeof value === 'string' ? value : JSON.stringify(value, null, 2)}`,
    );
};

export const _ = false;

export const timer = (expiryTime: string | Date | number) => {
  if (!expiryTime) return [0, 0];

  let expiry: number;
  if (typeof expiryTime === 'number') {
    expiry = expiryTime;
  } else if (expiryTime instanceof Date) {
    expiry = expiryTime.getTime();
  } else {
    // Ensure the date string is correctly parsed as UTC if no timezone offset is provided
    let formatted = expiryTime.trim();
    if (
      !formatted.includes('Z') &&
      !formatted.includes('+') &&
      !formatted.includes('-')
    ) {
      formatted = formatted.replace(' ', 'T');
      if (!formatted.endsWith('Z')) {
        formatted += 'Z';
      }
    }
    expiry = new Date(formatted).getTime();
  }

  const currentTime = Date.now();

  const diff = expiry - currentTime;

  if (isNaN(diff) || diff <= 0) {
    return [0, 0];
  }

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds];
};

export const leftFillNum = (
  num: number | null | undefined,
  targetLength: number,
) => {
  return String(num ?? 0).padStart(targetLength, '0');
};

export const getCookie = (name: string) => {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
};

export const getLocalStoageIeem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }

  return null;
};

type Permission = {
  [key: string]: boolean;
};

export const useRequiredPermission = (permission: string) => {
  const { user, isPending: authIsPending } = useAuthQuery();

  const {
    permissions,
    isPending: permissionIsPending,
    totalPermission,
  } = useGetPermissionQuery({
    enabled: !!user,
  });

  const permissionDoc = permissions?.policy_document?.permissions;

  const isLoading = authIsPending || permissionIsPending;

  if (isLoading) {
    return {
      isLoading: true,
      isAllowed: false,
    };
  }

  return {
    isLoading: false,
    isAllowed: permissionDoc?.[permission] === true,
    permissionDoc,
    noAccess: totalPermission < 1,
    user,
  };
};
