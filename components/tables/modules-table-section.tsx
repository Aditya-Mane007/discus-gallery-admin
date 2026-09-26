'use client';

import { columns } from '@/components/data-table/columns';
import { QueryDataTable } from '@/components/data-table/QueryDataTable';
import { getModuleListController } from '@/lib/services/moduleService';
import { handleAPICall } from '@/lib/utils';

export function ModuleListTableSection() {
  return (
    <QueryDataTable
      title="User Table"
      columns={columns}
      queryKey={['module-list']}
      queryFn={(params) => handleAPICall(params, getModuleListController)}
    />
  );
}
