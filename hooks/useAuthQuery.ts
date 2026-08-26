'use client';
import { getUserController } from '@/lib/services/authService';
import { _, handleAPICall } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useAuthQuery() {
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user-info'],
    queryFn: () => handleAPICall('', getUserController),
    staleTime: 5 * 60 * 1000, // 5 minutes - refetch after this
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache
    retry: false,
    refetchOnWindowFocus: true, // refetch when user returns to tab
    refetchOnReconnect: true, // refetch on reconnect
    refetchOnMount: true, // refetch when component mounts (back navigation)
  });

  useEffect(() => {
    if (isError) {
      router.replace('/login');
    }
  }, [isError, router]);

  return { user: data?.data, isPending, isError };
}

export default useAuthQuery;
