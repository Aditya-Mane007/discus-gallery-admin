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
    staleTime: 5 * 60 * 1000, // 5 minutes - refetch after this
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache
    retry: false,
    refetchOnWindowFocus: true, // refetch when user returns to tab
    refetchOnReconnect: true, // refetch on reconnect
    refetchOnMount: true, // refetch when component mounts (back navigation)
    enabled: !!user,
    ...options,
  });

  console.log(
    Object.entries(data?.data?.policy_document?.permissions || {}).filter(
      ([key, value]) => !key.startsWith('public-page'),
    ),
  );
  return {
    permissions: data?.data,
    isPending,
    isError,
    totalPermission:
      Object.entries(data?.data?.policy_document?.permissions || {}).filter(
        ([key]) => !key.startsWith('public-page'),
      ).length ?? 0,
  };
};

export default useGetPermissionQuery;
