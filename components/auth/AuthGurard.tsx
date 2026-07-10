"use client";

import { ReactNode } from "react";
import useAuthQuery from "@/hooks/useAuthQuery";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isPending } = useAuthQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
