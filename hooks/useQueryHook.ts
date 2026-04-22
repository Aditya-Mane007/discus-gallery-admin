"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { handleAPICall } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

type QueryFunction<TParams = any> = (
  params?: TParams
) => Promise<AxiosResponse<any, any>>;

interface UseQueryHookProps<TParams> {
  queryKey: string | any[];
  queryFunction: QueryFunction<TParams>;
  params?: TParams;
  enabled?: boolean;
  customFunction?: (data: any) => void;
  errorFunction?: (error: any) => void;
  staleTime?: number;
  retry?: boolean | number;
  gcTime?: number;
}

function useQueryHook<TParams = any>({
  queryKey,
  queryFunction,
  params,
  enabled = true,
  customFunction,
  errorFunction,
  staleTime = 0,
  retry,
  gcTime,
}: UseQueryHookProps<TParams>) {
  const queryKeyArray = Array.isArray(queryKey)
    ? [...queryKey, params]
    : [queryKey, params];

  const query = useQuery({
    queryKey: queryKeyArray,
    queryFn: () => handleAPICall(params, queryFunction),
    enabled,
    staleTime,
    retry,
    gcTime,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      if (query.data?.message) {
        toast.success(query.data.message);
      }
      if (customFunction) {
        customFunction(query.data);
      }
    }
  }, [query.isSuccess, query.data]); // exclude customFunction to prevent re-rendering loops

  useEffect(() => {
    if (query.isError && query.error) {
      const errorData = query.error as any;
      if (errorData?.message) {
        toast.error(errorData.message);
      }
      if (errorFunction) {
        errorFunction(query.error);
      }
    }
  }, [query.isError, query.error]);

  return query;
}

export default useQueryHook;