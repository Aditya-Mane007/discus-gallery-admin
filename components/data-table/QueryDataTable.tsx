'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';
import type { QueryKey } from '@tanstack/react-query';
import {
  TableQueryParams,
  TableQueryResult,
  useServerTableQuery,
} from '@/hooks/use-server-table-query';
import { createContext } from 'react';

export const TableContext = createContext({
  title: '',
  rowCount: null,
  rowSelect: false,
});

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
    <TableContext
      value={{ title: title ?? '', rowCount, rowSelect: rowSelect ?? false }}
    >
      <DataTable
        columns={columns}
        data={rows}
        isLoading={isPending}
        isRefetching={isFetching && !isPending}
      />
    </TableContext>
  );
}
