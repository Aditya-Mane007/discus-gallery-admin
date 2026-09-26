'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';
import type { QueryKey } from '@tanstack/react-query';
import {
  TableQueryParams,
  TableQueryResult,
  useServerTableQuery,
} from '@/hooks/use-server-table-query';

interface QueryDataTableProps<T> {
  title?: string;
  columns: ColumnDef<any, T>[];
  queryKey: QueryKey;
  queryFn: (params: TableQueryParams) => Promise<TableQueryResult<T>>;
  rowSelect?: boolean;
}

export function QueryDataTable<T>({
  title,
  columns,
  queryKey,
  queryFn,
  rowSelect,
}: QueryDataTableProps<T>) {
  const { data, isPending, isFetching, isError, error } = useServerTableQuery({
    queryKey,
    queryFn,
  });

  console.log('DATA : ', data);

  if (isError) {
    return (
      <div className="p-4 text-sm text-destructive">
        Failed to load {title?.toLowerCase() ?? 'data'}:{' '}
        {(error as Error).message}
      </div>
    );
  }

  const rows = data?.data ?? [];
  const rowCount = data?.meta?.total_records ?? 0;
  return (
    <DataTable
      title={title}
      columns={columns}
      data={rows ?? []}
      rowCount={rowCount ?? 0}
      rowSelect={rowSelect}
      isLoading={isPending}
      isRefetching={isFetching && !isPending}
    />
  );
}
