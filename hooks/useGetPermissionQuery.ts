'use client';

import { getPermission } from '@/lib/services/authService';
import { handleAPICall } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { boolean, string } from 'zod';

type Options = {
  [key: string]: string | boolean | number | any;
};

const useGetPermissionQuery = (options?: Options) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user-permission'],
    queryFn: () => handleAPICall('', getPermission),
    staleTime: Infinity,
    gcTime: Infinity, // keep it in memory while the app is open
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...options,
  });

  return { permissions: data?.data, isPending, isError };
};

export default useGetPermissionQuery;
