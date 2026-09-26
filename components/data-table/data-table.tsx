'use client';
import { useState, useEffect, useMemo } from 'react';

import {
  ColumnDef,
  columnVisibilityFeature,
  flexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';

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

const features = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
});

interface DataTableProps<TData> {
  title?: string;
  columns: ColumnDef<any, TData>[];
  data: TData[]; // just the current page's rows
  rowCount: number; // TOTAL rows across all pages, from the server
  rowSelect?: boolean;
  isLoading?: boolean;
  isRefetching?: boolean;
}

export function DataTable<TData extends DataTableProps>({
  title,
  columns,
  data,
  rowCount,
  rowSelect = false,
  isLoading,
  isRefetching,
}: DataTableProps<TData>) {
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
  const [columnVisibility, setColumnVisibility] = useState({});
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
      rowCount,
      state: { pagination, sorting, columnVisibility, rowSelection },
      onPaginationChange,
      onSortingChange,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
    },
    (state) => state,
  );

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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row?.getAllCells().map((cell) => (
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
      {/* <div className="w-full flex items-center justify-between space-x-2 my-4"> */}
      {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
      {/* <div className="flex items-center justify-end space-x-2 ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
      <DataTablePagination
        table={table}
        rowCount={rowCount}
        className="my-2 px-4"
      />
      {/* </div> */}
    </div>
  );
}
