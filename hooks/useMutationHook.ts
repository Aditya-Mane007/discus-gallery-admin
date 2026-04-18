"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import { handleAPICall } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function useMutationHook(
  mutationFunction: (formData: any) => Promise<AxiosResponse<any, any, {}>>,
  queryKeys: string | any[],
  customFunction?: (response: any) => void,
  errorFunction?: (error: any) => void,
) {
  const router = useRouter();
  // console.log("MUTATION FORM DATA : ", formData);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: any) => handleAPICall(formData, mutationFunction),
    onSuccess: async (response) => {
      if (response?.message) {
        toast.success(response?.message);
      }
      const queryKeyArray = Array.isArray(queryKeys) ? queryKeys : [queryKeys];
      if (queryKeyArray.length > 0) {
        await queryClient.invalidateQueries({ queryKey: queryKeyArray });
      }

      if (customFunction) {
        customFunction(response);
      }
    },
    onError: (error) => {
      if (error?.message) {
        toast.error(error?.message);
      }
      if (errorFunction) {
        errorFunction(error);
      }
    },
  });

  console.log("OTP MUTATUIN DATA : ", mutation.data);

  return mutation;
}

export default useMutationHook;
