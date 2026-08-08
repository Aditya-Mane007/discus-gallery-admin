'use client';

import { ReactNode } from 'react';
import useAuthQuery from '@/hooks/useAuthQuery';
import useGetPermissionQuery from '@/hooks/useGetPermissionQuery';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isPending } = useAuthQuery();
  const { permissions, isPending: permissionIsPending } =
    useGetPermissionQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
