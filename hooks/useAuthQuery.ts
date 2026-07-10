"use client";
import { getUserController } from "@/lib/services/authService";
import { _, handleAPICall } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useAuthQuery() {
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => handleAPICall("", getUserController),
    staleTime: Infinity,
    gcTime: Infinity, // keep it in memory while the app is open
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isError) {
      router.replace("/login");
    }
  }, [isError, router]);

  return { user: data?.data, isPending, isError };
}

export default useAuthQuery;
