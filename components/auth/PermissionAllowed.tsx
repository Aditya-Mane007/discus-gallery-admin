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
  const context = useContext(PermissionContext) as
    | { permissionDoc?: Record<string, boolean> | any }
    | undefined;
  const permissionDoc = context?.permissionDoc;

  if (!permissionDoc?.[permission]) {
    return null;
  }

  return <>{children}</>;
}

export default PermissionAllowed;
