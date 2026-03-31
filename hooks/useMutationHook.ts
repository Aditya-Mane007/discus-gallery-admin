"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import { handleAPICall } from "@/lib/utils";
import { toast } from "sonner";

function useMutationHook(
  formData: any,
  mutationFunction: (formData: any) => Promise<AxiosResponse<any, any, {}>>,
  queryKeys: string | any[],
  customFunction: { (): void; (): void },
) {
  console.log("MUTATION FORM DATA : ", formData);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => handleAPICall(formData, mutationFunction),
    onSuccess: async (response) => {
      toast.success(response?.message);
      const queryKeyArray = Array.isArray(queryKeys) ? queryKeys : [queryKeys];
      if (queryKeyArray.length > 0) {
        await queryClient.invalidateQueries({ queryKey: queryKeyArray });
      }

      if (customFunction) {
        customFunction();
      }
    },
    onError: (error) => {
      if (error?.message) {
        toast.error(error?.message);
      }
    },
  });

  return { mutate, isPending };
}

export default useMutationHook;
