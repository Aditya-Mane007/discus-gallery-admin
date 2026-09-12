import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { DataTableFeatures } from '@/components/data-table/data-table-features';
import { DataTable, Payment } from '@/components/data-table/DataTable';
import { makeData } from '@/components/data-table/makeData';
import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.accessor('firstName', {
    header: 'First Name',
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
]);

function page() {
  const data = React.useMemo(() => makeData(100), []);
  console.log('data : ', data);
  return (
    <PrivatePageLayout breadCrumbLinks={[{ title: 'Home', link: '/' }]}>
      {/* Home Page
      <PermissionAllowed permission="user:create">
        <Button>Create user</Button>
      </PermissionAllowed> */}
      <DataTable data={data} columns={columns} />
    </PrivatePageLayout>
  );
}

export default page;
