'use client';

import { ReactNode } from 'react';
import useAuthQuery from '@/hooks/useAuthQuery';
import useGetPermissionQuery from '@/hooks/useGetPermissionQuery';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isPending } = useAuthQuery();

  return <>{children}</>;
}
