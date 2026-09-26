'use client';

import { QueryDataTable } from '@/components/data-table/QueryDataTable';
import { getModuleListController } from '@/lib/services/moduleService';
import { handleAPICall } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { features } from '../data-table/data-table-features';
import { Badge } from '../ui/badge';

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
    header: 'Origin',
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

export function ModuleListTableSection() {
  return (
    <QueryDataTable
      title="User Table"
      columns={columns}
      queryKey={['module-list']}
      queryFn={(params) => handleAPICall(params, getModuleListController)}
      rowSelect={false}
    />
  );
}
