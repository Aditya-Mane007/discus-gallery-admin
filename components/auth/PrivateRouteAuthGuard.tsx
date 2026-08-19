'use client';

import { createContext, ReactNode } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { routePermissions } from '@/lib/constant';
import { useRequiredPermission } from '@/lib/utils';

export const PermissionContext = createContext({});

export default function PrivateRouteAuthGuard({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const route = routePermissions.find((route) => route.url === pathname);

  const permission = route?.permission ?? '';

  const { isLoading, isAllowed, permissionDoc } =
    useRequiredPermission(permission);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isAllowed) {
    router.push('/403');
  }

  return (
    <PermissionContext.Provider value={permissionDoc}>
      {children}
    </PermissionContext.Provider>
  );
}
