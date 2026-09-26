'use client';
import { useState, useEffect, useMemo, useContext } from 'react';

import {
  ColumnDef,
  columnVisibilityFeature,
  ColumnVisibilityState,
  flexRender,
  RowData,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import { useCreateAtom, useSelector } from '@tanstack/react-store';

import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { DataTablePagination } from './DataTablePagination';
import { DataTableViewOptions } from './DataTableViewOptions';
import { useDataTableUrlState } from './use-data-table-url-state';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { TableContext } from './QueryDataTable';

const features = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
});

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<any, TData>[];
  data: TData[]; // just the current page's rows
  rowCount: number; // TOTAL rows across all pages, from the server
  rowSelect?: boolean;
  isLoading?: boolean;
  isRefetching?: boolean;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  rowCount,
  rowSelect = false,
  isLoading,
  isRefetching,
}: DataTableProps<TData>) {
  const { title } = useContext(TableContext);
  const {
    pagination,
    sorting,
    search,
    onPaginationChange,
    onSortingChange,
    onSearchChange,
    isPending,
  } = useDataTableUrlState();

  const [searchValue, setSearchValue] = useState(search);
  const columnVisibilityAtom = useCreateAtom<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const resolvedColumns = useMemo(() => {
    if (rowSelect) return columns;
    return columns.filter((col) => col.id !== 'select');
  }, [columns, rowSelect]);

  const table = useTable(
    {
      features,
      columns: resolvedColumns,
      data,
      manualPagination: true,
      manualSorting: true,
      rowCount: rowCount,
      state: { pagination, sorting, rowSelection },
      atoms: {
        columnVisibility: columnVisibilityAtom,
      },
      onPaginationChange,
      onSortingChange,
      onRowSelectionChange: setRowSelection,
    },
    (state) => state,
  );

  console.log('TABLE : ', table?.getRowModel().rows);

  return (
    <div
      className="min-h-0 min-w-0 flex-1 flex flex-col border w-full"
      aria-busy={isLoading || isRefetching}
    >
      <div className="flex items-center p-4">
        {title && <h2 className="text-lg font-medium">{title}</h2>}
        <div className="w-auto flex items-center space-x-2 ml-auto">
          <Input
            placeholder="Filter emails..."
            value={searchValue ?? ''}
            onChange={(event) => {
              setSearchValue(event.target.value);
              onSearchChange(event.target.value);
            }}
            autoComplete="off"
            className="max-w-md"
          />

          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="min-w-0 min-h-0 flex-1 overflow-auto rounded-md border-y">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const Icon =
                    sorted === 'asc'
                      ? ArrowUp
                      : sorted === 'desc'
                        ? ArrowDown
                        : ArrowUpDown;

                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-3 h-8 data-[state=open]:bg-accent"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <table.FlexRender header={header} />
                          <Icon className="ml-2" />
                        </Button>
                      ) : (
                        <span className="text-sm font-medium">
                          <table.FlexRender header={header} />
                        </span>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* BODY */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id}>
                  {row?.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className=" h-96 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className="my-2 px-4" />
    </div>
  );
}
