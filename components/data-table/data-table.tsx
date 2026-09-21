'use client';
import * as React from 'react';
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  flexRender,
} from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

import { features, type DataTableFeatures } from './data-table-features';
import { DataTablePagination } from './DataTablePagination';
import { DataTableViewOptions } from './DataTableViewOptions';
import { usePathname, useRouter } from 'next/navigation';

interface DataTableProps<TData extends RowData> {
  title?: string;
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  rowSelect?: boolean;
}

export function DataTable<TData extends RowData>({
  title,
  columns,
  data,
  rowSelect = false,
}: DataTableProps<TData>) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});

  const resolvedColumns = React.useMemo(() => {
    if (rowSelect) return columns;
    return columns.filter((col) => col.id !== 'select');
  }, [columns, rowSelect]);

  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`${pathname}?${searchQuery?.toString()}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const table = useTable({
    features,
    enableRowSelection: rowSelect,
    data,
    columns: resolvedColumns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="min-h-0 flex-1 flex flex-col border">
      <div className="flex items-center p-4">
        {title && <h2 className="text-lg font-medium">{title}</h2>}
        <div className="w-auto flex items-center space-x-2 ml-auto">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              table.getColumn('email')?.setFilterValue(event.target.value);
            }}
            autoComplete="off"
            className="max-w-md"
          />

          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto rounded-md border-y">
        <Table>
          {/* HEADER */}
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
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
      <DataTablePagination table={table} className="my-2 px-4" />
      {/* </div> */}
    </div>
  );
}
