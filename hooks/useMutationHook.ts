'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';
import { handleAPICall } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function useMutationHook(
  mutationFunction: (formData: any) => Promise<AxiosResponse<any, any, {}>>,
  queryKeys: string | any[],
  customFunction?: (response: any) => void,
  errorFunction?: (error: any) => void,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: any) => handleAPICall(formData, mutationFunction),
    onSuccess: async (response) => {
      console.log('org switched, invalidating');
      if (response?.message) {
        toast.success(response?.message);
      }

      console.log(
        'BEFORE INVALIDATE',
        queryClient.getQueryState(['user-permission']),
      );

      const keysToInvalidate = Array.isArray(queryKeys)
        ? queryKeys
        : [queryKeys];

      await Promise.all(
        keysToInvalidate.map((key) =>
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          }),
        ),
      );
      console.log(
        'AFTER INVALIDATE',
        queryClient.getQueryState(['user-permission']),
      );

      if (customFunction) {
        customFunction(response);
      }
    },
    onError: (error) => {
      console.log('QUERY ERROR : ', error);
      if (error?.message) {
        toast.error(error?.message);
      }
      if (errorFunction) {
        errorFunction(error);
      }
    },
  });

  return mutation;
}

export default useMutationHook;
