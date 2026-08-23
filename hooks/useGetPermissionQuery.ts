'use client';

import { getPermission } from '@/lib/services/authService';
import { handleAPICall } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { boolean, string } from 'zod';
import useAuthQuery from './useAuthQuery';

type Options = {
  [key: string]: string | boolean | number | any;
};

const useGetPermissionQuery = (options?: Options) => {
  const { user } = useAuthQuery();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user-permission'],
    queryFn: () => handleAPICall('', getPermission),
    staleTime: Infinity,
    gcTime: Infinity, // keep it in memory while the app is open
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // refetchOnMount: false,
    enabled: !user,
    ...options,
  });

  return {
    permissions: data?.data,
    isPending,
    isError,
    totalPermission:
      Object.entries(data?.data?.policy_document?.permissions || {}).length ??
      0,
  };
};

export default useGetPermissionQuery;
