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

import { features } from './data-table-features';

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

const columnHelper = createColumnHelper<typeof features, Module>();

export const columns = [
  columnHelper.display({
    id: 'Sr',
    cell: (props) => '1',
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => (
      <span className="text-muted-foreground">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('is_system', {
    header: 'System',
    cell: (info) => (
      <Badge variant={info.getValue() ? 'secondary' : 'outline'}>
        {info.getValue() ? 'System' : 'Custom'}
      </Badge>
    ),
  }),
  columnHelper.accessor('is_active', {
    header: 'Status',
    cell: (info) => (
      <Badge variant={info.getValue() ? 'default' : 'destructive'}>
        {info.getValue() ? 'Active' : 'Inactive'}
      </Badge>
    ),
  }),
];
