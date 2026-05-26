"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { handleAPICall } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

type QueryFunction<TParams = any, TResponse = any> = (
  params?: TParams,
) => Promise<AxiosResponse<TResponse>>;

interface UseQueryHookProps<TParams, TResponse> {
  queryKey: string | any[];
  queryFunction: QueryFunction<TParams, TResponse>;
  params?: TParams;
  enabled?: boolean;
  customFunction?: (data: TResponse) => void;
  errorFunction?: (error: any) => void;
  staleTime?: number;
  retry?: boolean | number;
  gcTime?: number;
}

function useQueryHook<TParams = any, TResponse = any>({
  queryKey,
  queryFunction,
  params,
  enabled = true,
  customFunction,
  errorFunction,
  staleTime = 0,
  retry = 1,
  gcTime,
}: UseQueryHookProps<TParams, TResponse>) {
  const hasShownSuccess = useRef(false);

  const queryKeyArray = Array.isArray(queryKey)
    ? [...queryKey, params]
    : [queryKey, params];

  const query = useQuery({
    queryKey: queryKeyArray,
    queryFn: () => handleAPICall(params, queryFunction as any),
    enabled,
    staleTime,
    retry,
    gcTime,
  });

  useEffect(() => {
    if (query.isSuccess && query.data && !hasShownSuccess.current) {
      hasShownSuccess.current = true;

      if ((query.data as any)?.message) {
        toast.success((query.data as any).message);
      }

      customFunction?.(query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError && query.error) {
      const errorData = query.error as { message?: string };

      if (errorData?.message) {
        toast.error(errorData.message);
      }

      errorFunction?.(query.error);
    }
  }, [query.isError, query.error]);

  return query;
}

export default useQueryHook;
