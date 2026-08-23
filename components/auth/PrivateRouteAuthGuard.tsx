'use client';

import { createContext, ReactNode, useEffect } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { routePermissions } from '@/lib/constant';
import { useRequiredPermission } from '@/lib/utils';
import { NavMainSkeleton } from '../app-sidebar';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { BreadcrumbSeparator } from '../ui/breadcrumb';
export const PermissionContext = createContext({});

const LoadingScreenSkeleton = () => {
  return (
    <div className="flex w-screen h-screen">
      <NavMainSkeleton />
      <div className="w-full h-screen flex flex-col gap-3 py-3 p-4">
        <div className="flex gap-3">
          <Skeleton className="h-6 w-6 " />
          <Separator orientation="vertical" />
          <div className="flex justify-center items-center">
            <Skeleton className="h-6 w-22" />
            <BreadcrumbSeparator className="hidden md:flex mx-2 items-center" />
            <Skeleton className="h-6 w-22" />
          </div>
        </div>
        <Skeleton className="flex-1 w-f h-full " />
      </div>
    </div>
  );
};

export default function PrivateRouteAuthGuard({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const route = routePermissions.find((route) => route.url === pathname);

  const permission = route?.permission ?? '';

  console.log('Permission : ', routePermissions);

  const { isLoading, isAllowed, permissionDoc, user, noAccess } =
    useRequiredPermission(permission);

  console.log('no-access : ', noAccess);

  useEffect(() => {
    if (noAccess) {
      router.push('/no-access');
      return undefined;
    }
    if (!isLoading && !isAllowed) {
      router.push('/403');
    }
  }, [isLoading, isAllowed, router, noAccess]);

  if (isLoading) {
    return <LoadingScreenSkeleton />;
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <PermissionContext.Provider value={{ permissionDoc, user, isLoading }}>
      {children}
    </PermissionContext.Provider>
  );
}
