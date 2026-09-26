'use client';

import {
  keepPreviousData,
  useQuery,
  type QueryKey,
} from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export interface TableQueryParams {
  page: string;
  pageSize: string;
  sortBy?: string;
  sortDir?: string;
  q?: string;
}

export interface TableQueryResult<T> {
  rows: T[];
  rowCount: number;
}

interface UseServerTableQueryOptions<T> {
  queryKey: QueryKey; // e.g. ['module-list'] or ['orders', tenantId] if you need extra scoping
  queryFn: (params: TableQueryParams) => Promise<TableQueryResult<T>>;
  enabled?: boolean;
}

export function useServerTableQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseServerTableQueryOptions<T>) {
  const searchParams = useSearchParams();

  const params: TableQueryParams = {
    page: searchParams.get('page') ?? '1',
    pageSize: searchParams.get('pageSize') ?? '10',
    sortBy: searchParams.get('sortBy') ?? undefined,
    sortDir: searchParams.get('sortDir') ?? undefined,
    q: searchParams.get('q') ?? undefined,
  };

  return useQuery({
    // spreading params into the key means ANY table using this hook
    // automatically refetches on page/sort/search change — no per-table bug to repeat
    queryKey: [
      ...queryKey,
      params.page,
      params.pageSize,
      params.sortBy,
      params.sortDir,
      params.q,
    ],
    queryFn: () => queryFn(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}
