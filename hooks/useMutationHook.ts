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
) {
  const router = useRouter();
  // console.log("MUTATION FORM DATA : ", formData);
  const queryClient = useQueryClient();

  const { mutate, isPending, data } = useMutation({
    mutationFn: (formData) => handleAPICall(formData, mutationFunction),
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
    },
  });

  return { mutate, isPending, data };
}

export default useMutationHook;
