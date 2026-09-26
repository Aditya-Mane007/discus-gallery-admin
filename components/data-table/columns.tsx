'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { type DataTableFeatures } from './data-table-features';
import { DataTableColumnHeader } from './data-table-column-header';

import { Badge } from '@/components/ui/badge';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Module {
  module_id: string;
  name: string;
  portal_id: string;
  description: string;
  is_system: boolean;
  is_active: boolean;
  total_records: string; // comes back as a string from the API, cast when sorting/displaying as a number
}

const columnHelper = createColumnHelper<Module>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => (
      <span className="text-muted-foreground">{info.getValue()}</span>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('total_records', {
    header: 'Records',
    cell: (info) => Number(info.getValue()).toLocaleString(),
    enableSorting: true,
  }),
  columnHelper.accessor('is_system', {
    header: 'System',
    cell: (info) => (
      <Badge variant={info.getValue() ? 'secondary' : 'outline'}>
        {info.getValue() ? 'System' : 'Custom'}
      </Badge>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('is_active', {
    header: 'Status',
    cell: (info) => (
      <Badge variant={info.getValue() ? 'default' : 'destructive'}>
        {info.getValue() ? 'Active' : 'Inactive'}
      </Badge>
    ),
    enableSorting: true,
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (info) => (
      // wire up your row menu / edit-link here, using info.row.original.module_id
      <span className="text-sm text-muted-foreground">•••</span>
    ),
  }),
];
