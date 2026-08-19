'use client';
import React, { useContext } from 'react';
import { PermissionContext } from './PrivateRouteAuthGuard';

function PermissionAllowed({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: string;
}) {
  const permissionDoc = useContext(PermissionContext) as
    | Record<string, boolean>
    | undefined;

  if (!permissionDoc?.[permission]) {
    return null;
  }

  return <>{children}</>;
}

export default PermissionAllowed;
